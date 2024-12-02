import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import { SearchIcon } from '@heroicons/react/solid';

const PickProjCreateMoa = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [characterLimit, setCharacterLimit] = useState(42);
  const itemsPerPage = 8;
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();

  // Fetch data with GET request
  useEffect(() => {
    axios.get(`https://web-production-4b16.up.railway.app/get_project_status/${userID}/`)
      .then(response => {
        // Filter projects with status 'approved' (case-insensitive)
        const approvedProjects = response.data
          .filter(project => project.status.toLowerCase() === 'approved')
          .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

        setProjects(approvedProjects);
        setFilteredProjects(approvedProjects);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userID]);

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

  const handleStatusFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    const filtered = status
      ? projects.filter(project => project.status.toLowerCase() === status)
      : projects;
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  // Handler for creating MOA
  const handleCreateMOA = (projectID) => {
    navigate(`/create_moa/${projectID}`);
  };

  // Pagination logic
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
            <h2 className="text-xl sm:text-2xl font-bold w-full sm:w-auto">APPROVED PROJECTS</h2>
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
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Create MOA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.length > 0 ? (
                    currentProjects.map((project, index) => (
                      <tr key={index}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-left">{`${project.projectUser.firstname} ${project.projectUser.lastname}`}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                          <span title={project.projectTitle}>
                            {project.projectTitle.length > characterLimit 
                              ? `${project.projectTitle.slice(0, characterLimit)}...` 
                              : project.projectTitle}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center justify-items-center">
                          {new Date(project.dateCreated).toLocaleDateString()}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-center justify-items-end">
                          <span className="px-2 py-1 rounded-md text-white bg-green-500">
                            {project.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => handleCreateMOA(project.projectID)}
                            className="text-blue-900 underline"
                          >
                            Create MOA
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No approved projects available</td>
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

export default PickProjCreateMoa;