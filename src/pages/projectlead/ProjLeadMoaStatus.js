import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";

const ProjLeadMoaStatus = () => {
  const [moas, setMoas] = useState([]);
  const [filteredMoas, setFilteredMoas] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const { statusFilterParam } = useParams();
  const [characterLimit, setCharacterLimit] = useState(42);

  // Fetch MOA data
  useEffect(() => {
    axios.get(`https://web-production-4b16.up.railway.app/get_moa_status/${userID}/`)
      .then(response => {
        const sortedProjects = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

        // Apply the "all" filter to show all projects if statusFilterParam is "all" or not defined
        const initialFilteredMoa = (!statusFilterParam || statusFilterParam.toLowerCase() === 'all')
          ? sortedProjects
          : sortedProjects.filter(project => project.status.toLowerCase() === statusFilterParam.toLowerCase());

        setMoas(sortedProjects);
        setFilteredMoas(initialFilteredMoa);
        setMoas(response.data);
        setFilteredMoas(response.data);
      })
      .catch(error => {
        console.error('Error fetching MOA data:', error);
      });
  }, [userID]);

  // Apply filters
  useEffect(() => {
    let filtered = [...moas];

    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(moa => moa.status.toLowerCase() === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        moa =>
          `${moa.moaUser.firstname} ${moa.moaUser.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          moa.projectTitles.some(project => 
            project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredMoas(filtered);
    setCurrentPage(1);
  }, [moas, statusFilter, searchTerm]);

  // Pagination
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

  // Character limit for responsive design
  useEffect(() => {
    const updateCharacterLimit = () => {
      if (window.innerWidth < 640) {
        setCharacterLimit(20);
      } else if (window.innerWidth < 1024) {
        setCharacterLimit(30);
      } else {
        setCharacterLimit(42);
      }
    };

    updateCharacterLimit();
    window.addEventListener('resize', updateCharacterLimit);
    return () => window.removeEventListener('resize', updateCharacterLimit);
  }, []);

  // Handlers
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewPDF = (moaID) => {
    // Assuming you have a URL to the PDF that includes the project ID
    const pdfUrl = `/moa-pdf-viewer/${moaID}`;
  
    // Open the PDF URL in a new tab
    window.open(pdfUrl, '_blank');
  };

  const handleEditMoa = (moaID) => {
    navigate(`/edit-moa/${moaID}`);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-16 px-4 md:px-10">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold w-full sm:w-auto">MEMORANDUM OF AGREEMENT LIST</h2>
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Leader</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Title</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Submitted</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMoas.length > 0 ? (
                    currentMoas.map((moa) => (
                      <tr key={moa.moaID}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {`${moa.moaUser.firstname} ${moa.moaUser.lastname}`}
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          {moa.projectTitles.map((project, index) => (
                            <div 
                              key={index} 
                              className="mb-2 text-sm"
                            >
                              {project.projectTitle.length > characterLimit
                                ? `${project.projectTitle.substring(0, characterLimit)}...`
                                : project.projectTitle}
                            </div>
                          ))}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {new Date(moa.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap justify-items-center">
                          <span
                            className={`px-2 py-1 rounded-md text-white w-24 text-center block${
                              moa.status.toLowerCase() === 'approved'
                                ? 'bg-green-500'
                                : moa.status.toLowerCase() === 'rejected'
                                ? 'bg-red-400'
                                : 'bg-amber-300'
                            }`}
                          >
                            {moa.status}
                          </span>
                        </td>
                        <td className="px-3 sm: py-4 whitespace-nowrap text-center space-x-10">
                          <button 
                            onClick={() => handleViewPDF(moa.moaID)} 
                            className="underline text-blue-900"
                          >
                            View PDF
                          </button>
                          <button 
                            onClick={() => handleEditMoa(moa.moaID)} 
                            className="underline text-blue-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No MOAs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-2 flex justify-center items-center space-x-2">
            {renderPageNumbers()}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjLeadMoaStatus;