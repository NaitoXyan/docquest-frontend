import React, { useState, useEffect } from "react";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";
import axios from 'axios';

const CoordGenerateDoc = () => {

    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
          localStorage.clear();
          navigate('/login', { replace: true });
          return;
      }
    }, [token]);

    // Mock data for documents
    const mockDocuments = [
        {
            projectLeader: "John Doe",
            documentType: "Project Proposal",
            date: "2023-09-15",
        },
        {
            projectLeader: "Jane Smith",
            documentType: "Report",
            date: "2023-08-20",
        },
        {
            projectLeader: "Alice Johnson",
            documentType: "Presentation",
            date: "2023-07-10",
        },
    ];

    const [documents, setDocuments] = useState(mockDocuments);  // Initializing with mock data
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        // fetchDocuments would go here if using an API
        setDocuments(mockDocuments);  // Using mock data instead
    }, [currentPage, search, filterType]);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterTypeChange = (e) => {
        setFilterType(e.target.value);
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <CoordinatorSidebar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14 px-10 pt-5">
                    {/* Header and Search Bar */}
                    <div className="flex justify-between mb-5">
                        <h1 className="text-2xl font-semibold">Documents</h1>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search by Project Leader"
                                className="p-2 border rounded-lg"
                                value={search}
                                onChange={handleSearch}
                            />
                            <select
                                className="ml-3 p-2 border rounded-lg"
                                value={filterType}
                                onChange={handleFilterTypeChange}
                            >
                                <option value="">All Document Types</option>
                                <option value="Project Proposal">Project Proposal</option>
                                <option value="Report">Report</option>
                                <option value="Presentation">Presentation</option>
                            </select>
                        </div>
                    </div>
                    {/* Table */}
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead className="bg-vlu text-white"> {/* Custom dark blue header */}
                            <tr>
                                <th className="py-2 px-4">Project Leader</th>
                                <th className="py-2 px-4">Document Type</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}> {/* Alternating row colors */}
                                    <td className="py-2 px-4">{doc.projectLeader}</td>
                                    <td className="py-2 px-4">{doc.documentType}</td>
                                    <td className="py-2 px-4">{doc.date}</td>
                                    <td className="py-2 px-4">
                                        <a href="#" className="text-blue-500">View</a> | <a href="#" className="text-green-500">Download</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="flex justify-between mt-5">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                    <p className="mt-3">Page {currentPage} of {totalPages}</p>
                </div>
            </div>
        </div>
    );
};

export default CoordGenerateDoc;
