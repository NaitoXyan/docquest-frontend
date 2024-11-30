import React, { useState, useEffect } from 'react';
import EstaffSideBar from "../../components/EstaffSideBar";
import Topbar from "../../components/Topbar";
import { NavLink } from 'react-router-dom';

const SharedProposal = () => {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, [currentPage, search, documentType]);

    // Example documents with status
    const mockDocuments = [
        { id: 1, projectLeader: "Alice Johnson", documentType: "Project Proposal", date: "2024-11-01", status: "Approved" },
        { id: 2, projectLeader: "Bob Smith", documentType: "Load Trainers", date: "2024-11-15", status: "Pending" },
        { id: 3, projectLeader: "Cathy Lee", documentType: "Project Proposal", date: "2024-11-20", status: "Rejected" },
        { id: 4, projectLeader: "David Brown", documentType: "Load Trainers", date: "2024-11-22", status: "Approved" },
    ];

    const fetchDocuments = () => {
        const filteredDocs = mockDocuments.filter(
            (doc) =>
                (!search || doc.projectLeader.toLowerCase().includes(search.toLowerCase())) &&
                (!documentType || doc.documentType === documentType)
        );

        const pageSize = 2;
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
        setCurrentPage(1);
    };

    const handleDocumentTypeFilter = (e) => {
        setDocumentType(e.target.value);
        setCurrentPage(1);
    };

    const handleDownload = (format) => {
        if (currentDocument) {
            const downloadLink = `/files/${currentDocument.projectLeader}-${currentDocument.documentType.toLowerCase().replace(' ', '-')}.${format.toLowerCase()}`;
            alert(`Downloading ${currentDocument.projectLeader}'s document as ${format}: ${downloadLink}`);
            setShowDownloadModal(false); // Close the modal after selection
        }
    };

    // Helper function to get the appropriate class for the status
    const getStatusClass = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-green-500 text-white';
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Rejected':
                return 'bg-red-500 text-white';
            default:
                return '';
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <EstaffSideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14 px-10 pt-5">
                    <div className="flex justify-between mb-5">
                        <h1 className="text-2xl font-semibold">Documents</h1>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search by Project Leader"
                                className="p-2 border"
                                value={search}
                                onChange={handleSearch}
                            />
                            <select
                                className="ml-3 p-2 border"
                                value={documentType}
                                onChange={handleDocumentTypeFilter}
                            >
                                <option value="">All Document Types</option>
                                <option value="Project Proposal">Project Proposal</option>
                                <option value="Load Trainers">Load Trainers</option>
                            </select>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-vlu text-white">
                                <th className="py-2 px-4">Project Leader</th>
                                <th className="py-2 px-4">Document Type</th>
                                <th className="py-2 px-4">Date</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="py-2 px-4">{doc.projectLeader}</td>
                                    <td className="py-2 px-4">{doc.documentType}</td>
                                    <td className="py-2 px-4">{doc.date}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-3 py-1 rounded-full ${getStatusClass(doc.status)}`}>
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <div className="flex space-x-4">
                                            <NavLink
                                                to={`/view-download/${doc.id}`}
                                                className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                                            >
                                                View
                                            </NavLink>

                                            <button
                                                onClick={() => {
                                                    setCurrentDocument(doc); 
                                                    setShowDownloadModal(true); 
                                                }}
                                                className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                                            >
                                                Download
                                            </button>

                                            {/* Only show "Upload Copy" button if the document is approved */}
                                            {doc.status === 'Approved' && (
                                                <NavLink
                                                    to="/scan-copy" 
                                                    className="bg-yellow-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition duration-300"
                                                >
                                                    Upload Copy
                                                </NavLink>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-5">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 disabled:opacity-50 rounded-lg"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 disabled:opacity-50 rounded-lg"
                        >
                            Next
                        </button>
                    </div>
                    <p className="mt-3">Page {currentPage} of {totalPages}</p>
                </div>
            </div>

            {/* Download Modal */}
            {showDownloadModal && currentDocument && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Choose File Format</h2>
                        <div className="flex justify-between">
                            <button
                                onClick={() => handleDownload('PDF')}
                                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                            >
                                PDF
                            </button>
                            <button
                                onClick={() => handleDownload('MS Word')}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                MS Word
                            </button>
                        </div>
                        <button
                            onClick={() => setShowDownloadModal(false)}
                            className="mt-4 px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedProposal;
