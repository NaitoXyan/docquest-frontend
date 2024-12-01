import React, { useState, useEffect } from 'react';
import Topbar from "../../components/Topbar";
import VPALASideBar from '../../components/VPALASideBar';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";

const VPALADashboard = () => {
    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ 
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
        
        if (!roles.includes("vpala")) {
            localStorage.clear();
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
    
                if (!response.data || !Array.isArray(response.data.reviews)) {
                    console.error("Invalid data structure received:", response.data);
                    setError("Invalid data format received from server");
                    setProjects([]);
                    return;
                }
    
                const formattedProjects = response.data.reviews
                    .filter(proj => proj !== null)
                    .map((proj) => ({
                        fullname: proj.firstname && proj.lastname 
                            ? `${proj.firstname} ${proj.lastname}`
                            : "N/A",
                        documentType: proj.content_type_name || "N/A",
                        projectTitle: proj.projectTitle || "Untitled Document",
                        dateCreated: proj.dateCreated 
                            ? new Date(proj.dateCreated).toISOString()
                            : new Date().toISOString(),
                        reviewStatus: proj.reviewStatus,
                        reviewDate: proj.reviewDate 
                            ? new Date(proj.reviewDate).toISOString()
                            : null,
                        comment: proj.comment || "",
                        reviewID: proj.reviewID,
                        content_type_name: proj.content_type_name,
                        status: proj.status
                    }));

                const sortedProjects = formattedProjects.sort((a, b) =>
                    new Date(b.dateCreated) - new Date(a.dateCreated)
                );

                setProjects(sortedProjects);
                setError(null);

                const counts = {
                    project: { approved: 0, pending: 0, rejected: 0 },
                    moa: { approved: 0, pending: 0, rejected: 0 }
                };

                sortedProjects.forEach(proj => {
                    const type = proj.content_type_name;
                    const status = proj.status.toLowerCase();
                    if (type && ['approved', 'pending', 'rejected'].includes(status)) {
                        counts[type][status]++;
                    }
                });

                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching projects:", error);
                setError(error.message || "Failed to fetch projects");
                setProjects([]);
            }
        };
    
        fetchProjects();
    }, [token]);    

    const handleNavigate = (statusFilter, documentType) => {
        navigate(`/review-list/${statusFilter.toLowerCase()}/${documentType}`);
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
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Ellipsis logic remains the same
        }

        return pageNumbers;
    };

    const legendItems = [
        { label: 'Approved', color: '#4CAF50' },
        { label: 'Pending', color: '#FFC107' },
        { label: 'Rejected', color: '#F44336' },
    ];

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <VPALASideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10">
                    <div className="flex">
                        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 ml-2 flex-1">
                            <h1 className="text-2xl font-bold mb-4">MOA OVERVIEW</h1>
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

                    <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-8">
                    <h1 className="text-1xl font-semibold mb-4">RECENT DOCUMENTS</h1>
                        {error ? (
                            <div className="text-red-500 p-4 text-center">{error}</div>
                        ) : projects.length === 0 ? (
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
                                                <th className="px- py-3 text-center text-xs font-bold text-gray-600 uppercase">Date Created</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Your Review</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Review Date</th>
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Project Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentProjects.map((doc, index) => (
                                                <tr key={doc.reviewID || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{doc.documentType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.projectTitle}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center justify-items-center">
                                                        {new Date(doc.dateCreated).toLocaleDateString()}
                                                    </td>
                                                    <td className={`px-6 py-3 text-center text-center justify-items-center 
                                                        ${doc.reviewStatus === 'approved' 
                                                        ? 'text-green-500' : doc.reviewStatus === 'pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {doc.reviewStatus}
                                                    </td>
                                                    <td className="px-6 py-3 text-center justify-items-center">{doc.reviewDate ? new Date(doc.reviewDate).toLocaleDateString() : "N/A"}</td>
                                                    <td className={`px-6 py-3 text-center text-center justify-items-center 
                                                        ${doc.status === 'approved' 
                                                        ? 'text-green-500' : doc.status === 'pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {doc.status}
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

export default VPALADashboard;
