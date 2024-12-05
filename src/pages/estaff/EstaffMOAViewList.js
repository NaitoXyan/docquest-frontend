import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { SearchIcon } from '@heroicons/react/solid';
import EstaffSideBar from '../../components/EstaffSideBar';

const EstaffMOAViewList = () => {
  const [moas, setMoas] = useState([]);
  const [filteredMoas, setFilteredMoas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { status: statusFilterParam } = useParams();

  useEffect(() => {
    // Check if token is present
    if (!token) {
      localStorage.clear();
      navigate('/login', { replace: true });
      return;
    }

    // Retrieve roles from localStorage
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    
    // Redirect if "ecrd" role is not found
    if (!roles.includes("estf")) {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchMoas = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://web-production-4b16.up.railway.app/estaff_get_all_moas',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        const moas = response.data; 
        const sortedMoas = moas.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
  
        setMoas(sortedMoas);
  
        // Set the initial status filter based on the URL param
        const initialStatusFilter = statusFilterParam?.toLowerCase() || 'all';
        setStatusFilter(initialStatusFilter);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchMoas();
  }, [token, statusFilterParam]);

  // Apply filters whenever MOAs, status filter, or search term changes
  useEffect(() => {
    let filtered = [...moas];
  
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(moa => moa.status === statusFilter);
    }
  
    // Apply search filter for user name
    if (searchTerm) {
      filtered = filtered.filter(
        moa =>
          `${moa.moaUser.firstname} ${moa.moaUser.lastname}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredMoas(filtered);
  }, [moas, statusFilter, searchTerm]);
  
  const handleStatusFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    navigate(`/estaff-moa-view-list/${status}/moa`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const reviewMoa = (moaID) => {
    navigate(`/review-moa/${moaID}`);
  };

  const MOAPDFviewer = (moaID) => {
    const url = `${window.location.origin}/moa-pdf-viewer/${moaID}`;
    window.open(url, '_blank'); // Opens the URL in a new tab
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMoas = filteredMoas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMoas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-lg ${i === currentPage ? 'bg-vlu text-white' : 'bg-gray-100'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredMoas]);

  const handleNavigateSubmittedScannedCopy = (documentID) => {
    navigate(`/estaff-view-scanned-copy/${documentID}`);
  };

  const handleNavigateScannedCopy = (content_type_name, source_id) => {
    navigate(`/estaff-submit-scanned-copy/${content_type_name}/${source_id}`);
  };

  const handleViewScannedCopy = async (documentID) => {
    try {
      // Fetch document from the server
      const response = await axios.get(`https://web-production-4b16.up.railway.app/estaff_get_document/${documentID}/`, {
        headers: { 'Authorization': `Token ${token}` },
      });
  
      const document = response.data;
  
      // Check if the document has a scanned copy
      if (!document.haveScannedCopy) {
        alert('Scanned copy is not available.');
        return;
      }
  
      // Get the file extension or assume it's PDF
      const fileExtension = document.fileName.split('.').pop().toLowerCase() || 'pdf';
      const fileData = document.fileData;  // This is the Base64 encoded data
  
      if (fileExtension === 'pdf') {
        // If PDF, open in a new browser tab
        const fileBlob = new Blob([new Uint8Array(atob(fileData).split('').map(char => char.charCodeAt(0)))], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(fileBlob);
        window.open(fileURL, '_blank');
      } else if (fileExtension === 'docx') {
        // If DOCX, trigger a direct file download
        const fileBlob = new Blob([new Uint8Array(atob(fileData).split('').map(char => char.charCodeAt(0)))], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        const fileURL = URL.createObjectURL(fileBlob);
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = document.fileName;
        link.click();
      } else {
        alert('Unsupported document type.');
      }
  
    } catch (error) {
      console.error('Error retrieving document:', error);
      alert('Failed to fetch document.');
    }
  };  

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <EstaffSideBar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-16 px-4 md:px-10">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-semibold w-full sm:w-auto">MOA LIST</h2>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
              <div className="relative w-full sm:w-48">
                <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-3 py-1.5 border rounded-md"
                />
              </div>
              <div className="w-full sm:w-auto">
                <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                <select
                  id="statusFilter"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="w-full sm:w-auto px-3 py-2 border rounded-md"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg py-4 px-2 sm:px-4">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Content Owner</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Title</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Created</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Submit Scanned Copy</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View Scanned Copy</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMoas.length > 0 ? (
                    currentMoas.map((moa) => (
                      <tr key={moa.moaID}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {`${moa.moaUser.firstname} ${moa.moaUser.lastname}`}
                        </td>

                        <td className="px-3 sm:px-6 py-2 text-sm text-gray-700 truncate max-w-xs">
                          {moa.projectTitles?.[0]?.projectTitle ?? 'No Title'}
                        </td>

                        <td
                          className={`px-3 sm:px-6 py-4 text-sm ${
                            moa.status === "approved"
                              ? "text-green-500"
                              : moa.status === "rejected"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {moa.status}
                        </td>

                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-700">
                          {new Date(moa.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>

                        <td className="px-3 sm:px-6 py-4 text-center text-gray-700">
                          <button
                            onClick={() => MOAPDFviewer(moa.moaID)}
                            className={`px-4 py-1.5 text-white rounded-md text-sm bg-blue-500`}
                          >
                            View
                          </button>
                        </td>

                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          <button
                            onClick={() => 
                              moa.haveScannedCopy 
                                ? handleNavigateSubmittedScannedCopy(moa.documentID) 
                                : handleNavigateScannedCopy('moa', moa.moaID)
                            }
                            className={`w-36 px-4 py-1.5 rounded-md ${
                              moa.haveScannedCopy
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : moa.status === "approved"
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={moa.haveScannedCopy || moa.status !== "approved"}
                          >
                            {moa.haveScannedCopy ? "Submitted" : "Submit"}
                          </button>
                        </td>

                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          <button 
                            onClick={() => handleViewScannedCopy(moa.documentID, moa.haveScannedCopy, moa.fileName)}
                            className={`bg-blue-500 text-white hover:bg-blue-600 w-45 px-3 py-1.5 rounded-md ${
                              !moa.haveScannedCopy ? 'cursor-not-allowed bg-gray-300 text-gray-500' : ''
                            }`}
                            disabled={!moa.haveScannedCopy}  // Disable button if haveScannedCopy is false
                          >
                            View Scanned Copy
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-sm text-gray-600">
                        No MOAs available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 flex justify-center space-x-2">
            {renderPageNumbers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstaffMOAViewList;