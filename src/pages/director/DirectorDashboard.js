import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorSidebar from "../../components/DirectorSidebar";
import { BarChart } from '@mui/x-charts/BarChart';
import Button from '@mui/material/Button';

const DirectorDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ 
        project: { approved: 0, pending: 0, rejected: 0 },
        moa: { approved: 0, pending: 0, rejected: 0 }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            localStorage.clear();
            navigate('/login', { replace: true });
            return;
        }
    
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        
        if (!roles.includes("ecrd")) {
            localStorage.clear();
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    const determineStatus = (document) => {
        const { approvalCounter, reviewStatus, content_type_name } = document;
        
        if (content_type_name === 'project') {
            if (approvalCounter >= 3) return "Approved";
            if (reviewStatus === "pending" && approvalCounter === 2) return "Pending";
            if (reviewStatus === "rejected") return "Rejected";
        } else if (content_type_name === 'moa') {
            if (approvalCounter >= 2) return "Approved";
            if (reviewStatus === "pending" && approvalCounter === 1) return "Pending";
            if (reviewStatus === "rejected") return "Rejected";
        }
        return "Unknown";
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/get_review',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.data || !Array.isArray(response.data.reviews)) {
                    console.error("Invalid data structure received:", response.data);
                    setError("Invalid data format received from server");
                    setDocuments([]);
                    return;
                }
    
                const formattedDocuments = response.data.reviews
                    .filter(doc => doc !== null)
                    .map((doc) => ({
                        fullname: doc.firstname && doc.lastname 
                            ? `${doc.firstname} ${doc.lastname}`
                            : "N/A",
                        documentType: doc.content_type_name || "N/A",
                        projectTitle: doc.projectTitle || "Untitled Document",
                        dateCreated: doc.dateCreated 
                            ? new Date(doc.dateCreated).toISOString()
                            : new Date().toISOString(),
                        status: determineStatus(doc),
                        reviewDate: doc.reviewDate 
                            ? new Date(doc.reviewDate).toISOString()
                            : null,
                        comment: doc.comment || "",
                        reviewID: doc.reviewID,
                        content_type_name: doc.content_type_name
                    }));

                const sortedDocuments = formattedDocuments.sort((a, b) =>
                    new Date(b.dateCreated) - new Date(a.dateCreated)
                );

                setDocuments(sortedDocuments);
                setError(null);

                // Calculate separate counts for projects and MOAs
                const counts = {
                    project: { approved: 0, pending: 0, rejected: 0 },
                    moa: { approved: 0, pending: 0, rejected: 0 }
                };

                sortedDocuments.forEach(doc => {
                    const type = doc.content_type_name;
                    const status = doc.status.toLowerCase();
                    if (type && ['approved', 'pending', 'rejected'].includes(status)) {
                        counts[type][status]++;
                    }
                });

                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching documents:", error);
                setError(error.message || "Failed to fetch documents");
                setDocuments([]);
            }
        };
    
        fetchDocuments();
    }, [token]);    

    const handleNavigate = (statusFilter, documentType) => {
        navigate(`/review-list/${statusFilter.toLowerCase()}/${documentType}`);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDocuments = documents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(documents.length / itemsPerPage);

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
            // ... [Pagination logic remains the same]
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

    const legendItems = [
        { label: 'Approved', color: '#4CAF50' }, // Example color
        { label: 'Pending', color: '#FFC107' }, // Example color
        { label: 'Rejected', color: '#F44336' }, // Example color
      ];

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <DirectorSidebar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10">
                    <div className="flex">
                        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 mr-2 flex-1">
                            <h1 className="text-2xl font-semibold mb-4">Projects Overview</h1>
                            <div className="grid grid-cols-3 gap-4 mb-1">
                                <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Approved</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.project.approved}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("approved", "project")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Pending</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.project.pending}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("pending", "project")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Rejected</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.project.rejected}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("rejected", "project")}>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 ml-2 flex-1">
                            <h1 className="text-2xl font-semibold mb-4">MOA Overview</h1>
                            <div className="grid grid-cols-3 gap-4 mb-1">
                                <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Approved</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.approved}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("approved", "moa")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Pending</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.pending}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("pending", "moa")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Rejected</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.rejected}</h2>
                                    <button className="mt-2 underline" onClick={() => handleNavigate("rejected", "moa")}>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 w-full">
                        <div className="flex flex-row">
                            <h1 className="text-2xl font-semibold mb-4">Project Proposals by Campus</h1>
                            <div className="w-full sm:w-auto px-5">
                            <label htmlFor="documentFilter" className="mr-2">Filter by Year:</label>
                            <select
                                id="documentFilter"
                                className="w-full sm:w-auto px-3 py-2 border rounded-md"
                            >
                                {/* Add year options */}
                            </select>
                            </div>

                            <div className="w-full sm:w-auto">
                            <label htmlFor="documentFilter" className="mr-2">Filter by Month:</label>
                            <select
                                id="documentFilter"
                                className="w-full sm:w-auto px-3 py-2 border rounded-md"
                            >
                                {/* Add month options */}
                            </select>
                            </div>
                        </div>

                        <div className="flex justify-center items-center h-full">
                            <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Campus A', 'Campus B', 'Campus C'] }]}
                            series={[
                                { data: [4, 3, 5], color: '#4CAF50' }, // Approved
                                { data: [1, 6, 3], color: '#FFC107' }, // Pending
                                { data: [2, 5, 6], color: '#F44336' }, // Rejected
                            ]}
                            width={500}
                            height={300}
                            />
                        </div>

                        {/* Custom Legend */}
                        <div className="flex justify-center mt-4">
                            {legendItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center mx-2"
                            >
                                <span
                                className="w-4 h-4"
                                style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="ml-2 text-sm">{item.label}</span>
                            </div>
                            ))}
                        </div>

                        <div className='flex flex-row justify-center'>
                            <div className="flex mt-4 mx-2">
                            <Button variant="contained">
                                View Project Proposals per College
                            </Button>
                            </div>

                            <div className="flex mt-4 mx-2">
                            <Button variant="contained">
                                View Project Proposals per Program
                            </Button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-8">
                    <h1 className="text-2xl font-semibold mb-4">Recent Documents</h1>
                        {error ? (
                            <div className="text-red-500 p-4 text-center">{error}</div>
                        ) : documents.length === 0 ? (
                            <div className="text-gray-500 p-4 text-center">No documents found</div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Document Owner</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Document Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Document Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Created</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentDocuments.map((doc, index) => (
                                                <tr key={doc.reviewID || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{doc.documentType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.projectTitle}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(doc.dateCreated).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span
                                                            className={`px-2 py-1 rounded-md text-white w-24 text-center block ${
                                                                doc.status.toLowerCase() === "approved"
                                                                    ? "bg-green-500"
                                                                    : doc.status.toLowerCase() === "pending"
                                                                    ? "bg-yellow-500"
                                                                    : "bg-red-500"
                                                            }`}
                                                        >
                                                            {doc.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-1 flex justify-center items-center space-x-2">
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

export default DirectorDashboard;