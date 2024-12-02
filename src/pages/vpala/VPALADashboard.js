import React, { useState, useEffect } from 'react';
import Topbar from "../../components/Topbar";
import VPALASideBar from '../../components/VPALASideBar';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from "axios";

const VPALADashboard = () => {
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

        if (!roles.includes("vpala")) {
            localStorage.clear();
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchMoaReviews = async () => {
            try {
                // Fetch MOA reviews data from the API
                const response = await axios({
                    method: 'get',
                    url: 'http://127.0.0.1:8000/get_moa_reviews',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.data) {
                    console.error("Invalid data structure received:", response.data);
                    setError("Invalid data format received from server");
                    return;
                }

                // Sort MOAs by `dateCreated` in descending order
                const sortedMOAs = response.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
                setProjects(sortedMOAs);
    
                // Initialize counts for each MOA status
                const counts = { approved: 0, pending: 0, rejected: 0 };
    
                // Iterate through the response and count statuses
                response.data.forEach((moa) => {
                    if (moa.reviewStatus && ['approved', 'pending', 'rejected'].includes(moa.reviewStatus.toLowerCase())) {
                        counts[moa.reviewStatus.toLowerCase()]++;
                    }
                });
    
                // Update the status counts in the state
                setStatusCounts(prevState => ({
                    ...prevState,
                    moa: counts,
                }));
    
            } catch (error) {
                console.error("Error fetching MOA reviews:", error);
                setError(error.message || "Failed to fetch MOA reviews");
            }
        };
    
        // Fetch MOA reviews on component mount
        fetchMoaReviews();
    
    }, [token]); // Depend on token, or set to an empty array if you don't need it to run more than once    

    const handleNavigate = (statusFilter, documentType) => {
        navigate(`/vpala-review-list/${statusFilter.toLowerCase()}/${documentType}`);
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
            // Ellipsis logic remains the same
        }

        return pageNumbers;
    };


    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <VPALASideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10 w-full">
                    <div className="flex">
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
                                                
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Project Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {projects.map((doc, index) => (
                                                <tr key={doc.moaID || index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {`${doc.contentOwner.firstname} ${doc.contentOwner.lastname}`}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{doc.contentType}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.project?.projectTitle ?? 'No Title'}</td> {/* Placeholder for 'Document Title' */}
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(doc.dateCreated).toLocaleDateString()}
                                                    </td>
                                                    <td className={`px-6 py-3 text-center 
                                                        ${doc.reviewStatus === 'approved'
                                                            ? 'text-green-500' : doc.reviewStatus === 'pending'
                                                                ? 'text-yellow-500' : 'text-red-500'}`}>
                                                        {doc.reviewStatus}
                                                    </td>
                                                    
                                                    <td className={`px-6 py-3 text-center 
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