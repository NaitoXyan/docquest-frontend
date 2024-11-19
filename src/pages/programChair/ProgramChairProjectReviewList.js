import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import DirectorSidebar from '../../components/DirectorSidebar';
import { SearchIcon } from '@heroicons/react/solid';

const ProgramChairReviewList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [documentFilter, setDocumentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [characterLimit, setCharacterLimit] = useState(42);
  const itemsPerPage = 8;
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const { status: statusFilterParam, document: documentFilterParam } = useParams(); // Fixed: Destructure with proper parameter names
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/get_review',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const sortedReview = response.data.sort(
          (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        setProjects(sortedReview);
        
        // Apply both status and document filters from URL parameters
        let filtered = sortedReview;
        
        if (statusFilterParam && statusFilterParam.toLowerCase() !== 'all') {
          filtered = filtered.filter(
            project => project.reviewStatus.toLowerCase() === statusFilterParam.toLowerCase()
          );
          setStatusFilter(statusFilterParam.toLowerCase());
        }
        
        if (documentFilterParam && documentFilterParam.toLowerCase() !== 'all') {
          filtered = filtered.filter(
            project => project.content_type_name.toLowerCase() === documentFilterParam.toLowerCase()
          );
          setDocumentFilter(documentFilterParam.toLowerCase());
        }
        
        setFilteredProjects(filtered);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReviews();
  }, [userID, statusFilterParam, documentFilterParam, token]);

  useEffect(() => {
    if (statusFilterParam) {
      setStatusFilter(statusFilterParam.toLowerCase());
      filterProjects(statusFilterParam.toLowerCase());
    }
  }, [statusFilterParam]);

  const filterProjects = (status = statusFilter, documentType = documentFilter) => {
    let filtered = projects;

    if (status && status !== 'all') {
      filtered = filtered.filter(
        project => project.reviewStatus.toLowerCase() === status
      );
    }

    if (documentType && documentType !== 'all') {
      filtered = filtered.filter(
        project => project.content_type_name.toLowerCase() === documentType
      );
    }

    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (event) => {
    const status = event.target.value;
    setStatusFilter(status);
    filterProjects(status, documentFilter);
    // Update URL to reflect new filters
    navigate(`/review-list/${status}/${documentFilter || 'all'}`);
  };

  const handleDocumentFilterChange = (event) => {
    const documentType = event.target.value.toLowerCase();
    setDocumentFilter(documentType);
    filterProjects(statusFilter, documentType);
    // Update URL to reflect new filters
    navigate(`/review-list/${statusFilter || 'all'}/${documentType}`);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredProjects(
      projects.filter(
        (project) =>
          `${project.firstname} ${project.lastname}`.toLowerCase().includes(term) ||
          project.projectTitle.toLowerCase().includes(term)
      )
    );
    setCurrentPage(1);
  };

  const reviewDocument = (reviewID) => {
    navigate(`/review-project/${reviewID}`);
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
          className={`px-3 py-1 rounded-lg ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
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

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <DirectorSidebar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-16 px-4 md:px-10">
          <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center mb-4 space-y-4 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-semibold w-full sm:w-auto">Project List</h2>
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
              <div className="w-full sm:w-auto">
                <label htmlFor="documentFilter" className="mr-2">Filter by Document:</label>
                <select
                  id="documentFilter"
                  value={documentFilter}
                  onChange={handleDocumentFilterChange}
                  className="w-full sm:w-auto px-3 py-2 border rounded-md"
                >
                  <option value="all">All</option>
                  <option value="project">Project</option>
                  <option value="moa">MOA</option>
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
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Document Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Title</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Submitted</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Review</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentProjects.length > 0 ? (
                    currentProjects.map((project) => (
                      <tr key={project.reviewID}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{`${project.firstname} ${project.lastname}`}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{project.content_type_name}</td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {project.projectTitle.length > characterLimit
                            ? `${project.projectTitle.substring(0, characterLimit)}...`
                            : project.projectTitle}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {new Date(project.dateCreated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-3 sm:px-3 py-4 whitespace-nowrap">
                          <span
                            className={`px-4 py-2 text-m rounded-full ${
                              project.reviewStatus === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : project.reviewStatus === 'approved'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {project.reviewStatus}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center">
                          <button
                            onClick={() => reviewDocument(project.reviewID)}
                            disabled={project.reviewStatus === 'approved' || project.reviewStatus === 'rejected'}
                            className={`px-4 py-2 rounded-md ${
                                project.reviewStatus === 'approved' || project.reviewStatus === 'rejected'
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                              }`}
                          >
                            Review
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

export default ProgramChairReviewList;