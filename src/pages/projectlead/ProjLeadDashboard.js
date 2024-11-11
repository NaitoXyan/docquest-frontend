import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";

const ProjLeadDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ approved: 0, pending: 0, rejected: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const userID = localStorage.getItem('userid');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/get_project_status/${userID}/`);
                const data = await response.json();
                setProjects(data);

                const counts = data.reduce((acc, project) => {
                    acc[project.status] = (acc[project.status] || 0) + 1;
                    return acc;
                }, { approved: 0, pending: 0, rejected: 0 });

                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

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

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <ProjLeadSidebar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10">
                    <h1 className="text-2xl font-semibold mb-2">Projects Overview</h1>
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Approved</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.approved}</h2>
                        </div>
                        <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Pending</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.pending}</h2>
                        </div>
                        <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Rejected</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.rejected}</h2>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-2">Projects</h1>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th style={{ width: "15%" }} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project ID</th>
                                        <th style={{ width: "40%" }} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Name</th>
                                        <th style={{ width: "20%" }} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Created</th>
                                        <th style={{ width: "25%" }} className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentProjects.map((project, index) => (
                                        <tr key={index}>
                                            <td style={{ width: "15%" }} className="px-6 py-4 whitespace-nowrap">{project.uniqueCode}</td>
                                            <td
                                                style={{ width: "40%" }}
                                                className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"
                                            >
                                                <span
                                                    title={project.projectTitle} // Tooltip with full name on hover
                                                >
                                                    {project.projectTitle.length > 42
                                                        ? `${project.projectTitle.slice(0, 42)}...`
                                                        : project.projectTitle}
                                                </span>
                                            </td>
                                            <td style={{ width: "20%" }} className="px-6 py-4 whitespace-nowrap">{new Date(project.dateCreated).toLocaleDateString()}</td>
                                            <td style={{ width: "25%" }} className="px-6 py-4 whitespace-nowrap">{project.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-center items-center space-x-2">
                            {renderPageNumbers()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjLeadDashboard;
