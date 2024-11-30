import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../components/Topbar";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import axios from "axios";

const CoordinatorDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
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
    
    // Redirect if coordinator role is not found
    if (!roles.includes("coord")) {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'http://127.0.0.1:8000/get_all_projects_of_program',
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Process projects
        const formattedProjects = response.data.map((project) => ({
          uniqueCode: project.uniqueCode || 'N/A',
          projectTitle: project.projectTitle || 'Untitled Project',
          dateCreated: project.dateCreated 
            ? new Date(project.dateCreated).toISOString() 
            : new Date().toISOString(),
          status: project.status === "approved"
            ? "Approved"
            : project.status === "pending"
            ? "Pending"
            : "Rejected",
          program: project.program || []
        }));

        // Sort by dateCreated in descending order
        const sortedProjects = formattedProjects.sort((a, b) =>
          new Date(b.dateCreated) - new Date(a.dateCreated)
        );

        setProjects(sortedProjects);
        setError(null);

        // Calculate status counts
        const counts = sortedProjects.reduce(
          (acc, project) => {
            const status = project.status.toLowerCase();
            if (['approved', 'pending', 'rejected'].includes(status)) {
              acc[status] = (acc[status] || 0) + 1;
            }
            return acc;
          },
          { approved: 0, pending: 0, rejected: 0 }
        );

        setStatusCounts(counts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.message || "Failed to fetch projects");
        setProjects([]);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleNavigate = (statusFilter) => {
    navigate(`/projects/${statusFilter.toLowerCase()}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {i}
          </button>
        );
      }
    } else {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pageNumbers.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar with fixed width */}
      <div className="w-1/5 fixed h-full">
        <CoordinatorSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14 px-10">
          <h1 className="text-2xl font-bold mb-5 mt-5">PROJECTS OVERVIEW</h1>

          {/* Approved, Pending, Rejected UI */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {/* Approved */}
            <div
              className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleNavigate("approved")}
            >
              <h2 className="text-lg font-semibold">Approved</h2>
              <h2 className="text-4xl font-bold">{statusCounts.approved}</h2>
              <button className="mt-2 underline">View</button>
            </div>

            {/* Pending */}
            <div
              className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleNavigate("pending")}
            >
              <h2 className="text-lg font-semibold">Pending</h2>
              <h2 className="text-4xl font-bold">{statusCounts.pending}</h2>
              <button className="mt-2 underline">View</button>
            </div>

            {/* Rejected */}
            <div
              className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => handleNavigate("rejected")}
            >
              <h2 className="text-lg font-semibold">Rejected</h2>
              <h2 className="text-4xl font-bold">{statusCounts.rejected}</h2>
              <button className="mt-2 underline">View</button>
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-5">Projects</h1>

          {/* Projects table */}
          <div className="bg-white shadow-lg rounded-lg py-4 px-4">
            {error ? (
              <div className="text-red-500 p-4 text-center">
                {error}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-gray-500 p-4 text-center">
                No projects found
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500">Project ID</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500">Project Title</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500">Date Created</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProjects.map((project) => (
                        <tr key={project.uniqueCode} className="border-t border-gray-200">
                          <td className="px-6 py-3">{project.uniqueCode}</td>
                          <td className="px-6 py-3">{project.projectTitle}</td>
                          <td className="px-6 py-3">{new Date(project.dateCreated).toLocaleDateString()}</td>
                          <td className={`px-6 py-3 
                            ${project.status === 'Approved' 
                              ? 'text-green-500' 
                              : project.status === 'Pending' 
                              ? 'text-yellow-500' 
                              : 'text-red-500'}`}>
                            {project.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <div className="text-gray-500">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, projects.length)} of {projects.length} entries
                  </div>
                  <div className="flex space-x-2">
                    {renderPageNumbers()}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;