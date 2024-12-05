import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import { SearchIcon } from '@heroicons/react/solid';
import EstaffSideBar from '../../components/EstaffSideBar';

const EstaffReviewList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('approved');
  const [searchTerm, setSearchTerm] = useState('');
  const [characterLimit, setCharacterLimit] = useState(42);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // Check if token is present
    if (!token) {
      localStorage.clear();
      navigate('/login', { replace: true });
      return;
    }

    // Retrieve roles from localStorage
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    
    // Redirect if "estf" role is not found
    if (!roles.includes("estf")) {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  // Fetch initial data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://web-production-4b16.up.railway.app/estaff_get_all_projects',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        // Log the entire response to see its structure
        console.log('Full API Response:', response.data);
  
        // Add a check to ensure data is an array
        const projectsData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.projects || []);
  
        const sortedProjects = projectsData.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );
  
        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally set an error state to show to the user
        // setError('Failed to load projects');
      }
    };
  
    fetchProjects();
  }, [token]);

  // Apply filters whenever projects, status filter, or search term changes
  useEffect(() => {
    let filtered = [...projects];
  
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(project => 
        project.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
  
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        project =>
          `${project.projectUser.firstname} ${project.projectUser.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  }, [projects, statusFilter, searchTerm]);  

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewPDF = (projectID) => {
    const pdfUrl = `/pdf-viewer/${projectID}`;
    window.open(pdfUrl, '_blank');
  };

  const handleNavigateScannedCopy = (content_type_name, source_id) => {
    navigate(`/estaff-submit-scanned-copy/${content_type_name}/${source_id}`);
  };

  const handleNavigateSubmittedScannedCopy = (documentID) => {
    navigate(`/estaff-view-scanned-copy/${documentID}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
            <h2 className="text-xl sm:text-2xl font-bold w-full sm:w-auto">PROJECT LIST</h2>
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
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Date Submitted</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Submit Scanned Copy</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View Scanned Copy</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.length > 0 ? (
                    currentProjects.map((project) => (
                      <tr key={project.projectID}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {`${project.projectUser?.firstname || 'N/A'} ${project.projectUser?.lastname || ''}`}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {project.projectTitle && project.projectTitle.length > characterLimit
                            ? `${project.projectTitle.substring(0, characterLimit)}...`
                            : project.projectTitle || 'N/A'}
                        </td>
                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          {new Date(project.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-3 sm:px-3 whitespace-nowrap text-center">
                          {(() => {
                            const statusClass = 
                              project.status === 'approved'
                                ? 'bg-green-400 text-white'
                                : project.status === 'rejected'
                                ? 'bg-red-400 text-white'
                                : project.status === 'pending'
                                ? 'bg-yellow-400 text-white'
                                : 'bg-gray-100 text-gray-700';
                            
                            return (
                              <span className={`px-4 py-1.5 text-m rounded-md ${statusClass}`}>
                                {project.status}
                              </span>
                            );
                          })()}
                        </td>
                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          <button 
                            onClick={() => handleViewPDF(project.projectID)}
                            className="bg-blue-500 text-white hover:bg-blue-600 w-36 px-4 py-1.5 rounded-md"
                          >
                            View PDF
                          </button>
                        </td>

                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          <button
                            onClick={() => 
                              project.haveScannedCopy 
                                ? handleNavigateSubmittedScannedCopy(project.documentID) 
                                : handleNavigateScannedCopy('project', project.projectID)
                            }
                            className={`w-36 px-4 py-1.5 rounded-md ${
                              project.haveScannedCopy
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : project.status === "approved"
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={project.haveScannedCopy || project.status !== "approved"}
                          >
                            {project.haveScannedCopy ? "Submitted" : "Submit"}
                          </button>
                        </td>
                        
                        <td className="px-3 sm:px-6 whitespace-nowrap text-center">
                          <button 
                            onClick={() => handleViewScannedCopy(project.documentID, project.haveScannedCopy, project.fileName)}
                            className={`bg-blue-500 text-white hover:bg-blue-600 w-45 px-3 py-1.5 rounded-md ${
                              !project.haveScannedCopy ? 'cursor-not-allowed bg-gray-300 text-gray-500' : ''
                            }`}
                            disabled={!project.haveScannedCopy}  // Disable button if haveScannedCopy is false
                          >
                            View Scanned Copy
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                        No projects found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center items-center mt-4">{renderPageNumbers()}</div>
        </div>
      </div>
    </div>
  );
};

export default EstaffReviewList;