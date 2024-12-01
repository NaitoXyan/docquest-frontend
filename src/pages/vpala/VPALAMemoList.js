import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VPALASideBar from '../../components/VPALASideBar';
import Topbar from "../../components/Topbar";

const VPALAMemoList = () => {
    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({
        moa: { approved: 0, pending: 0, rejected: 0 }
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [selectedReviewID, setSelectedReviewID] = useState(null);
    const [selectedFormat, setSelectedFormat] = useState('pdf');
    
    // State for filter selection
    const [reviewFilter, setReviewFilter] = useState('all');

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

    const handleDownload = () => {
        // Request download in the selected format
        axios.get(`http://127.0.0.1:8000/download_document/${selectedReviewID}?format=${selectedFormat}`, {
            responseType: 'blob', // Set responseType to 'blob' for binary data
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document_${selectedReviewID}.${selectedFormat}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setShowDownloadModal(false); // Close the modal after download
        })
        .catch(error => {
            console.error("Error downloading document:", error);
            alert("Failed to download document.");
            setShowDownloadModal(false); // Close the modal on error
        });
    };

    const handleView = (reviewID) => {
        // Implement logic to view the document (you can show a modal or open in a new tab)
        window.open(`http://127.0.0.1:8000/view_document/${reviewID}`, '_blank');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    // Filter projects based on the review status
    const filteredProjects = reviewFilter === 'all' ? projects : projects.filter(proj => proj.reviewStatus.toLowerCase() === reviewFilter.toLowerCase());
    
    const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

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
                        className={`px-3 py-1 rounded-md ${i === currentPage ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}
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
                <div className="flex flex-col mt-16 px-10">
                    <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-8">
                        <h1 className="text-2xl font-semibold mb-4">Recent Documents</h1>
                        <div className="mb-4">
                            {/* Review Status Filter */}
                            <label htmlFor="reviewFilter" className="mr-2 text-gray-600">Filter by Review Status:</label>
                            <select
                                id="reviewFilter"
                                value={reviewFilter}
                                onChange={(e) => setReviewFilter(e.target.value)}
                                className="px-4 py-2 border rounded-md"
                            >
                                <option value="all">All</option>
                                <option value="approved">Approved</option>
                                <option value="pending">Pending</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        {error ? (
                            <div className="text-red-500 p-4 text-center">{error}</div>
                        ) : filteredProjects.length === 0 ? (
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
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
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
                                                    <td className={`px-6 py-3 text-center 
                                                        ${doc.reviewStatus === 'approved' 
                                                        ? 'text-green-500' : doc.reviewStatus === 'pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`} >
                                                        {doc.reviewStatus}
                                                    </td>
                                                    <td className="px-6 py-3 ">{doc.reviewDate ? new Date(doc.reviewDate).toLocaleDateString() : "N/A"}</td>
                                                    <td className={`px-6 py-3 text-center 
                                                        ${doc.status === 'approved' 
                                                        ? 'text-green-500' : doc.status === 'pending' 
                                                        ? 'text-yellow-500' : 'text-red-500'}`} >
                                                        {doc.status}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button 
                                                            onClick={() => handleView(doc.reviewID)} 
                                                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                                                            View
                                                        </button>
                                                        <button 
                                                            onClick={() => {
                                                                setSelectedReviewID(doc.reviewID);
                                                                setShowDownloadModal(true);
                                                            }} 
                                                            className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition ml-2">
                                                            Download
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 flex justify-center items-center space-x-2">
                                    {renderPageNumbers()}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Download Options */}
            {showDownloadModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-72">
                        <h3 className="text-xl font-semibold mb-4">Select Download Format</h3>
                        <div className="flex justify-between space-x-4">
                            <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full"
                                onClick={() => {
                                    setSelectedFormat('pdf');
                                    handleDownload();
                                }}
                            >
                                PDF
                            </button>
                            <button 
                                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition w-full"
                                onClick={() => {
                                    setSelectedFormat('word');
                                    handleDownload();
                                }}
                            >
                                MS Word
                            </button>
                        </div>
                        <button 
                            className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md w-full hover:bg-gray-600 transition"
                            onClick={() => setShowDownloadModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VPALAMemoList;
