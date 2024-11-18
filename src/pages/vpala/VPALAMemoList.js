import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import axios from "axios";
import VPALASideBar from "../../components/VPALASideBar";

const VPALAMemoList = () => {
    const [documents, setDocuments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [documentType, setDocumentType] = useState("");
    const [totalPages, setTotalPages] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(null); // State for dropdown visibility
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = documents.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        fetchDocuments();
    }, [currentPage, search, documentType]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/documents", {
                params: { page: currentPage, search, type: documentType },
            });
            setDocuments(response.data.documents);
            setTotalPages(response.data.totalPages);
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

    const toggleDropdown = (index) => {
        setDropdownVisible(dropdownVisible === index ? null : index); // Toggle dropdown for the specific row
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
                        <h1 className="text-2xl font-bold">MEMORANDUM LIST</h1>
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search by Project Title"
                                className="p-2 border"
                                value={search}
                                onChange={handleSearch}
                            />
                            <select
                                className="ml-3 p-2 border"
                                value={documentType}
                                onChange={handleDocumentTypeFilter}
                            >
                                <option value="">All</option>
                                <option value="Project Proposal">Pending</option>
                                <option value="Load Trainers">Approved</option>
                            </select>
                        </div>
                    </div>
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-vlu text-white">
                                <th className="py-2 px-4 text-left">PROJECT TITLE</th>
                                <th className="py-2 px-4 text-center">COLLEGE</th>
                                <th className="py-2 px-4 text-center">DATE SUBMITTED</th>
                                <th className="py-2 px-4 text-center">STATUS</th>
                                <th className="py-2 px-4 text-center">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProjects.map((doc, index) => (
                                <tr key={index} className="even:bg-gray-200">
                                    <td className="py-2 px-4">{doc.projectLeader}</td>
                                    <td className="py-2 px-4">{doc.college}</td>
                                    <td className="py-2 px-4">{doc.date}</td>
                                    <td className="py-2 px-4">
                                        <a href="#" className="text-blue-500">View</a> | 
                                        <div className="relative inline-block">
                                            <a
                                                href="#"
                                                className="text-green-500"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleDropdown(index);
                                                }}
                                            >
                                                Download
                                            </a>
                                            {dropdownVisible === index && (
                                                <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                                    <ul className="py-1">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Download as PDF
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Download as DOCX
                                                            </a>
                                                        </li>
                                                        {/* <li>
                                                            <a
                                                                href="#"
                                                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                                            >
                                                                Download as CSV
                                                            </a>
                                                        </li> */}
                                                    </ul>
                                                </div>
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
