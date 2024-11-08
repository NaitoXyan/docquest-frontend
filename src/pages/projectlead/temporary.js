import React, { useState, useEffect } from "react";
import { SomeIcon } from '@heroicons/react/outline';
import Sidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import axios from 'axios';

const mockData = [
    { projectLeader: 'Valdueno, Jero A.', projectTitle: 'Tesda Vocational', proposedDate: 'May 6, 2024 1:30pm', documentStatus: 'Approved', officeStatus: 'Submitted' },
    { projectLeader: 'Valdueno, Jero A.', projectTitle: 'Tesda Vocational', proposedDate: 'May 6, 2024 1:30pm', documentStatus: 'Ongoing', officeStatus: 'Submitted' },
    { projectLeader: 'Valdueno, Jero A.', projectTitle: 'Tesda Vocational', proposedDate: 'May 6, 2024 1:30pm', documentStatus: 'Disapproved', officeStatus: 'Submitted' }
];

const ProjLeadProjectStatus = () => {
    const [filter, setFilter] = useState('Approved'); // Default filter
    const [filteredDocs, setFilteredDocs] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // For search input

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                // Replace mockData with actual API call when ready
                // const response = await axios.get('/api/documents');
                // const documents = response.data;
                const documents = mockData;

                // Apply filter based on documentStatus
                const filtered = documents.filter(doc => doc.documentStatus === filter);

                // Apply search filter based on search query (matching project leader or project title)
                const searchFiltered = filtered.filter(doc =>
                    doc.projectLeader.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    doc.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setFilteredDocs(searchFiltered);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, [filter, searchQuery]); // Refetch when filter or search query changes

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                {/* Pass the filter change handler to Sidebar */}
                <Sidebar onFilterChange={setFilter} />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex justify-between mb-5">
                    <h1 className="text-2xl font-semibold">Extension Monitoring</h1>
                </div>
                {/* Search bar */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by Project Leader or Title"
                        className="border p-2 w-full rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Document Table */}
                <div className="bg-white p-5 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium mb-4">Activities {filter}</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="py-2 px-4 border-b text-lg">
                                <th className="py-2 px-4 border-b">Project Leader</th>
                                <th className="py-2 px-4 border-b">Project Title</th>
                                <th className="py-2 px-4 border-b">Proposed Date of Implementation</th>
                                <th className="py-2 px-4 border-b">Document Status</th>
                                <th className="py-2 px-4 border-b">Office Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocs.length > 0 ? (
                                filteredDocs.map((doc, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border-b">{doc.projectLeader}</td>
                                        <td className="py-2 px-4 border-b">{doc.projectTitle}</td>
                                        <td className="py-2 px-4 border-b">{doc.proposedDate}</td>
                                        <td className="py-2 px-4 border-b">
                                            <span className={`py-1 px-3 rounded-full text-white ${doc.documentStatus === 'Approved' ? 'bg-green-500' : doc.documentStatus === 'Ongoing' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                                                {doc.documentStatus}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border-b">{doc.officeStatus}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No documents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjLeadProjectStatus;
