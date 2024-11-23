import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const DocumentsListCoord = () => {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [documentType, setDocumentType] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, [currentPage, search, documentType]);

    const mockDocuments = [
        { id: 1, projectLeader: "Alice Johnson", documentType: "Project Proposal", date: "2024-11-01" },
        { id: 2, projectLeader: "Bob Smith", documentType: "Load Trainers", date: "2024-11-15" },
        { id: 3, projectLeader: "Cathy Lee", documentType: "Project Proposal", date: "2024-11-20" },
        { id: 4, projectLeader: "David Brown", documentType: "Load Trainers", date: "2024-11-22" },
    ];

    const fetchDocuments = () => {
        const filteredDocs = mockDocuments.filter(
            (doc) =>
                (!search || doc.projectLeader.toLowerCase().includes(search.toLowerCase())) &&
                (!documentType || doc.documentType === documentType)
        );

        const pageSize = 2; // Example: 2 items per page
        const paginatedDocs = filteredDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

        setDocuments(paginatedDocs);
        setTotalPages(Math.ceil(filteredDocs.length / pageSize));
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Reset to first page
    };

    const handleDocumentTypeFilter = (e) => {
        setDocumentType(e.target.value);
        setCurrentPage(1); // Reset to first page
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                {/* Sidebar */}
            </div>

            <div className="flex-1 ml-[20%] p-6">
                <div className="flex flex-col mt-14 space-y-8">
                    <h1 className="text-2xl font-semibold mb-4">Documents</h1>

                    {/* Search and Filter Section */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-4 items-center">
                            <span className="text-gray-500">Search by: </span>
                            <select
                                className="border border-gray-300 rounded-lg p-3"
                                value={documentType}
                                onChange={handleDocumentTypeFilter}
                            >
                                <option value="">All Document Types</option>
                                <option value="Project Proposal">Project Proposal</option>
                                <option value="Load Trainers">Load Trainers</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by Project Leader"
                            value={search}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded-lg p-3 w-1/3"
                        />
                    </div>

                    {/* Table for Documents */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                            <thead className="bg-vlu text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left font-medium">Project Leader</th>
                                    <th className="py-4 px-6 text-left font-medium">Document Type</th>
                                    <th className="py-4 px-6 text-left font-medium">Date</th>
                                    <th className="py-4 px-6 text-left font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((doc, index) => (
                                    <tr key={doc.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                        <td className="py-4 px-6">{doc.projectLeader}</td>
                                        <td className="py-4 px-6">{doc.documentType}</td>
                                        <td className="py-4 px-6">{doc.date}</td>
                                        <td className="py-4 px-6 flex items-center space-x-4">
                                            <NavLink
                                                to={`/view-download/${doc.id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View
                                            </NavLink>
                                            <button className="text-green-600 hover:text-green-800 font-medium">
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <p className="text-gray-500">Page {currentPage} of {totalPages}</p>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentsListCoord;
