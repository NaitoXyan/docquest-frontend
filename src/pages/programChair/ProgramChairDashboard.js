import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProgramChairSidebar from "../../components/ProgramChairSideBar";

const ProgramChairDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ approved: 0, pending: 0, rejected: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if token is present
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }
    
        // Retrieve roles from localStorage
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        
        // Redirect if "ecrd" role is not found
        if (!roles.includes("prch")) {
          navigate('/login', { replace: true });
        }
      }, [token, navigate]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/get_review',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                // Check if response.data has the expected structure
                if (!response.data || !Array.isArray(response.data.reviews)) {
                    console.error("Invalid data structure received:", response.data);
                    setError("Invalid data format received from server");
                    setProjects([]);
                    return;
                }
    
                // Process the reviews array
                const formattedProjects = response.data.reviews.map((project) => {
                    if (!project) return null;
    
                    return {
                        fullname: project.firstname && project.lastname 
                            ? `${project.firstname} ${project.lastname}`
                            : "N/A",
                        documentType: project.content_type_name || "N/A",
                        projectTitle: project.projectTitle || "Untitled Project",
                        dateCreated: project.dateCreated 
                            ? new Date(project.dateCreated).toISOString()
                            : new Date().toISOString(),
                        reviewStatus: project.reviewStatus === "approved"
                            ? "Approved"
                            : project.reviewStatus === "pending"
                            ? "Pending"
                            : "Rejected",
                        status: project.status === "approved"
                            ? "Approved"
                            : project.status === "pending"
                            ? "Pending"
                            : "Rejected",
                        reviewDate: project.reviewDate 
                            ? new Date(project.reviewDate).toISOString()
                            : null,
                        comment: project.comment || "",
                        reviewID: project.reviewID,
                    };
                }).filter(Boolean); // Remove any null entries
    
                // Sort by dateCreated in descending order
                const sortedProjects = formattedProjects.sort((a, b) =>
                    new Date(b.dateCreated) - new Date(a.dateCreated)
                );
    
                setProjects(sortedProjects);
                setError(null);
    
                // Calculate status counts with updated logic
                const counts = sortedProjects.reduce(
                    (acc, project) => {
                        const status = project.reviewStatus.toLowerCase();
                        if (['approved', 'pending', 'rejected'].includes(status)) {
                            acc[status] = (acc[status] || 0) + 1;
                        }
                        return acc;
                    },
                    { approved: 0, pending: 0, rejected: 0 }
                );
    
                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError(error.message || "Failed to fetch projects");
                setProjects([]);
            }
        };
    
        fetchProjects();
    }, [token]);

    const handleNavigate = (statusFilter) => {
        navigate(`/program-chair-review-list/${statusFilter.toLowerCase()}/all`);
    };

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
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-vlu text-white" : "bg-gray-100"}`}
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
                    className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "bg-vlu text-white" : "bg-gray-100"}`}
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
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-vlu text-white" : "bg-gray-100"}`}
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
                    className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "bg-vlu text-white" : "bg-gray-100"}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <ProgramChairSidebar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10">
                    <h1 className="text-2xl font-bold mb-2">DOCUMENTS OVERVIEW</h1>
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Approved</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.approved}</h2>
                            <button className="mt-2 underline" onClick={() => handleNavigate("approved")}>
                                View
                            </button>
                        </div>
                        <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Pending</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.pending}</h2>
                            <button className="mt-2 underline" onClick={() => handleNavigate("pending")}>
                                View
                            </button>
                        </div>
                        <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Rejected</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.rejected}</h2>
                            <button className="mt-2 underline" onClick={() => handleNavigate("rejected")}>
                                View
                            </button>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-2">DOCUMENTS</h1>
                    <div className="bg-white rounded-lg py-4 px-4">
                        {error ? (
                            <div className="text-red-500 p-4 text-center">
                                {error}
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="text-gray-500 p-4 text-center">
                                No documents found
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-100">
                                        <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">FULL NAME</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">DOCUMENT TYPE</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600">PROJECT TITLE</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600">DATE CREATED</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600">YOUR REVIEW</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600">REVIEW DATE</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600">PROJECT STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentProjects.map((project) => (
                                                <tr key={project.reviewID} className="border-t border-gray-200">
                                                    <td className="px-6 py-5">{project.fullname}</td>
                                                    <td className="px-6 py-3">{project.documentType}</td>
                                                    <td className="px-6 py-3">{project.projectTitle}</td>
                                                    <td className="px-6 py-3">{new Date(project.dateCreated).toLocaleDateString()}</td>
                                                    <td className={`px-6 py-3 text-center justify-items-center
                                                        ${project.reviewStatus === 'Approved' 
                                                        ? 'text-green-500' : project.reviewStatus === 'Pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {project.reviewStatus}
                                                    </td>
                                                    <td className="px-6 py-3 text-center justify-items-center ">{project.reviewDate ? new Date(project.reviewDate).toLocaleDateString() : "N/A"}</td>
                                                    <td className={`px-6 py-3 text-center justify-items-center 
                                                        ${project.status === 'Approved' 
                                                        ? 'text-green-500' : project.status === 'Pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {project.status}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-center mt-4">
                                    {renderPageNumbers()}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramChairDashboard;
