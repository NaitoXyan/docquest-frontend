import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DirectorSidebar from "../../components/DirectorSidebar";
import { BarChart } from '@mui/x-charts/BarChart';
import Button from '@mui/material/Button';

const DirectorDashboard = () => {
    const [projects, setProjects] = useState([]);
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
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Your Review</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Review Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Project Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentProjects.map((doc, index) => (
                                                <tr key={doc.reviewID || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{doc.documentType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.projectTitle}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(doc.dateCreated).toLocaleDateString()}
                                                    </td>
                                                    <td className={`px-6 py-3 
                                                        ${doc.reviewStatus === 'approved' 
                                                        ? 'text-green-500' : doc.reviewStatus === 'pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {doc.reviewStatus}
                                                    </td>
                                                    <td className="px-6 py-3 ">{doc.reviewDate ? new Date(doc.reviewDate).toLocaleDateString() : "N/A"}</td>
                                                    <td className={`px-6 py-3 
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

export default DirectorDashboard;