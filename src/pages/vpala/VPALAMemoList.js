import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import axios from "axios";
import VPALASideBar from "../../components/VPALASideBar";

const VPALAMemoList = () => {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [totalPages, setTotalPages] = useState(1); // Initialize setTotalPages
    const itemsPerPage = 5; // Ensure itemsPerPage is defined

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = documents.slice(indexOfFirstItem, indexOfLastItem); // Use `documents` instead of `projects`

    useEffect(() => {
        fetchDocuments();
    }, [currentPage, search, documentType]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/documents", {
                params: { page: currentPage, search, type: documentType },
            });
            setDocuments(response.data.documents); // Update documents state
            setTotalPages(response.data.totalPages); // Update totalPages state
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleDocumentTypeFilter = (e) => {
        setDocumentType(e.target.value);
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <VPALASideBar />
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
                            <tr className="bg-vlu text-white"> {/* Blue background, white text */}
                                <th className="py-2 px-4 text-left">Project Title</th>
                                <th className="py-2 px-4 text-center">College</th>
                                <th className="py-2 px-4 text-center">Date Submitted</th>
                                <th className="py-2 px-4 text-center">Status</th>
                                <th className="py-2 px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProjects.map((doc, index) => (
                                <tr key={index} className="even:bg-gray-200">
                                    <td className="py-2 px-4">{doc.projectLeader}</td>
                                    <td className="py-2 px-4">{doc.college}</td>
                                    <td className="py-2 px-4">{doc.date}</td>
                                    <td className="py-2 px-4">
                                        <a href="#" className="text-blue-500">View</a> | <a href="#" className="text-green-500">Download</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-5">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-300 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-300 disabled:opacity-50"
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

export default VPALAMemoList;
