import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import ProjLeadSidebar from '../../components/ProjLeadSideBar';
import { SearchIcon } from '@heroicons/react/solid';

const ProjLeadProjectStatus = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [characterLimit, setCharacterLimit] = useState(42); // Default limit
  const itemsPerPage = 8;
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const { statusFilterParam } = useParams();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
        localStorage.clear();
        navigate('/login', { replace: true });
        return;
    }
  }, [token]);

  useEffect(() => {
    axios.get(`https://web-production-4b16.up.railway.app/get_project_status/${userID}/`)
      .then(response => {
        const sortedProjects = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

        // Apply the "all" filter to show all projects if statusFilterParam is "all" or not defined
        const initialFilteredProjects = (!statusFilterParam || statusFilterParam.toLowerCase() === 'all')
          ? sortedProjects
          : sortedProjects.filter(project => project.status.toLowerCase() === statusFilterParam.toLowerCase());

        setProjects(sortedProjects);
        setFilteredProjects(initialFilteredProjects);
        setStatusFilter(statusFilterParam ? statusFilterParam.toLowerCase() : 'all');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userID, statusFilterParam]);

  useEffect(() => {
    if (statusFilterParam) {
      setStatusFilter(statusFilterParam.toLowerCase());
      filterProjects(statusFilterParam.toLowerCase());
    }
  }, [statusFilterParam]);

  const filterProjects = (status) => {
    const filtered = status
      ? projects.filter(project => project.status.toLowerCase() === status)
      : projects;
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    filterProjects(status);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProjects(
      projects.filter(project =>
        `${project.projectUser.firstname} ${project.projectUser.lastname}`.toLowerCase().includes(term) ||
        project.projectTitle.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  };

  const handleViewPDF = (projectID) => {
    // Assuming you have a URL to the PDF that includes the project ID
    const pdfUrl = `/pdf-viewer/${projectID}`;
  
    // Open the PDF URL in a new tab
    window.open(pdfUrl, '_blank');
  };

  const handleEditProject = (projectID) => {
    navigate(`/edit-project/${projectID}`);
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
          className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-vlu text-white" : "bg-gray-100"}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleViewProjectProgress = (projectID) => {
    navigate(`/view-project-progress/${projectID}`);
  }

  // Adjust character limit based on window width
  useEffect(() => {
    const updateCharacterLimit = () => {
      if (window.innerWidth < 640) {
        setCharacterLimit(20); // Small screens
      } else if (window.innerWidth < 1024) {
        setCharacterLimit(30); // Medium screens
      } else {
        setCharacterLimit(42); // Large screens
      }
    };

    updateCharacterLimit();
    window.addEventListener('resize', updateCharacterLimit);
    return () => window.removeEventListener('resize', updateCharacterLimit);
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-16 px-4 md:px-10">
          {/* Title, Filter, and Search Row */}
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
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Project List Table */}
          <div className="bg-white shadow-lg rounded-lg py-4 px-2 sm:px-4">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Leader</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Title</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Date Submitted</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View Document</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">View Progress</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.length > 0 ? (
                    currentProjects.map((project, index) => (
                      <tr key={index}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-left">{`${project.projectUser.firstname} ${project.projectUser.lastname}`}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                          <span title={project.projectTitle}>
                            {project.projectTitle.length > characterLimit ? `${project.projectTitle.slice(0, characterLimit)}...` : project.projectTitle}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center justify-items-center">
                          {new Date(project.dateCreated).toLocaleDateString()}
                        </td>
                        <td className="px-3 sm:px-4 py-3 justify-items-center">
                          <span
                            className={`px-2 py-1 rounded-md text-white w-24 text-center block ${project.status.toLowerCase() === 'approved' ? 'bg-green-500' :
                                project.status.toLowerCase() === 'pending' ? 'bg-amber-300' :
                                  'bg-red-400'
                              }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                          <button
                            className="text-blue-900 underline"
                            onClick={() => handleViewPDF(project.projectID)}
                          >
                            View PDF
                          </button>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                          <button className="text-blue-900 underline" onClick={() => handleViewProjectProgress(project.projectID)}>View</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">No projects available</td>
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

export default ProjLeadProjectStatus;