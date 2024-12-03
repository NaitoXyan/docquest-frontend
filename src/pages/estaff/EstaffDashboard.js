import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EstaffSideBar from "../../components/EstaffSideBar";

const EstaffDashboard = () => {
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

        if (!roles.includes("estf")) {
            localStorage.clear();
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                // Fetch Projects
                const projectsResponse = await axios({
                    method: 'get',
                    url: 'https://web-production-4b16.up.railway.app/get_all_projects',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Fetch MOAs
                const moasResponse = await axios({
                    method: 'get',
                    url: 'https://web-production-4b16.up.railway.app/estaff_get_all_moas',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('project response: ', projectsResponse.data);
                console.log('moa response: ', moasResponse.data);

                const formattedProjects = (projectsResponse.data || [])
                    .filter(proj => proj !== null && proj !== undefined)
                    .map((proj) => ({
                        id: proj.projectID,  // You might need to add an index if projectID is missing
                        fullname: proj.program && proj.program[0]?.projectUser 
                            ? `${proj.program[0].projectUser.firstname} ${proj.program[0].projectUser.lastname}`
                            : "N/A",
                        documentType: "Project",
                        projectTitle: proj.program && proj.program[0]?.projectTitle 
                            ? proj.program[0].projectTitle 
                            : "Untitled Document",
                        dateCreated: proj.dateCreated
                            ? new Date(proj.dateCreated).toISOString()
                            : new Date().toISOString(),
                        status: proj.status || 'pending',
                        uniqueCode: proj.program && proj.program[0]?.uniqueCode 
                            ? proj.program[0].uniqueCode 
                            : 'N/A'
                    }));

                const formattedMoas = (moasResponse.data || [])
                    .filter(moa => moa !== null && moa !== undefined)
                    .map((moa) => ({
                        id: moa.moaID,
                        fullname: moa.moaUser?.firstname && moa.moaUser?.lastname
                            ? `${moa.moaUser.firstname} ${moa.moaUser.lastname}`
                            : "N/A",
                        documentType: "MOA",
                        projectTitle: moa.projectTitles && moa.projectTitles.length > 0 
                            ? moa.projectTitles.map(pt => pt.projectTitle).join(', ') 
                            : "Untitled MOA",
                        dateCreated: moa.dateCreated
                            ? new Date(moa.dateCreated).toISOString()
                            : new Date().toISOString(),
                        status: moa.status || 'pending',
                        uniqueCode: moa.uniqueCode || 'N/A'
                    }));

                // Combine and sort documents
                const combinedDocuments = [...formattedProjects, ...formattedMoas]
                    .sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setDocuments(combinedDocuments);

                // Calculate status counts
                const counts = {
                    project: { approved: 0, pending: 0, rejected: 0 },
                    moa: { approved: 0, pending: 0, rejected: 0 }
                };

                formattedProjects.forEach(proj => {
                    const status = proj.status.toLowerCase();
                    if (['approved', 'pending', 'rejected'].includes(status)) {
                        counts.project[status]++;
                    }
                });

                formattedMoas.forEach(moa => {
                    const status = moa.status.toLowerCase();
                    if (['approved', 'pending', 'rejected'].includes(status)) {
                        counts.moa[status]++;
                    }
                });

                setStatusCounts(counts);
                setError(null);

            } catch (error) {
                console.error("Error fetching documents:", error);
                setError(error.message || "Failed to fetch documents");
                setDocuments([]);
            }
        };

        fetchDocuments();
    }, [token]);

    const handleNavigate = (statusFilter, documentType) => {
        navigate(`/estaff-project-view-list/${statusFilter.toLowerCase()}/${documentType}`);
    };

    const handleMOANavigate = (statusFilter, documentType) => {
        navigate(`/estaff-moa-view-list/${statusFilter.toLowerCase()}/${documentType}`);
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
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-vlu text-white" : "bg-gray-100"}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Existing ellipsis logic
        }

        return pageNumbers;
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <EstaffSideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-16 px-10 w-full">
                    {/* Projects Overview Section */}
                    <div className="flex">
                        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 mr-2 flex-1">
                            <h1 className="text-2xl font-bold mb-4">PROJECTS OVERVIEW</h1>
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

                        {/* MOA Overview Section */}
                        <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-2 ml-2 flex-1">
                            <h1 className="text-2xl font-bold mb-4">MOA OVERVIEW</h1>
                            <div className="grid grid-cols-3 gap-4 mb-1">
                                <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Approved</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.approved}</h2>
                                    <button className="mt-2 underline" onClick={() => handleMOANavigate("approved", "moa")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Pending</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.pending}</h2>
                                    <button className="mt-2 underline" onClick={() => handleMOANavigate("pending", "moa")}>
                                        View
                                    </button>
                                </div>
                                <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                                    <h2 className="text-lg font-semibold">Rejected</h2>
                                    <h2 className="text-4xl font-bold">{statusCounts.moa.rejected}</h2>
                                    <button className="mt-2 underline" onClick={() => handleMOANavigate("rejected", "moa")}>
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Documents Section */}
                    <div className="bg-white shadow-lg rounded-lg py-4 px-4 mt-4 mb-8">
                        <h1 className="text-1xl font-semibold mb-4">RECENT DOCUMENTS</h1>
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
                                                <th className="px-6 py-3 text-center text-xs font-bold text-gray-600 uppercase">Date Created</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Unique Code</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentDocuments.map((doc, index) => (
                                                <tr key={`${doc.documentType}-${doc.id}`} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.fullname}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{doc.documentType}</td>
                                                    <td
                                                        className="px-6 py-4 whitespace-nowrap"
                                                        title={doc.projectTitle}
                                                    >
                                                        {doc.projectTitle.length > 20
                                                            ? `${doc.projectTitle.slice(0, 20)}...`
                                                            : doc.projectTitle}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        {new Date(doc.dateCreated).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{doc.uniqueCode}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap 
                                                        ${doc.status === 'approved'
                                                            ? 'text-green-500' 
                                                            : doc.status === 'pending'
                                                                ? 'text-yellow-500' 
                                                                : 'text-red-500'}`}>
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

export default EstaffDashboard;