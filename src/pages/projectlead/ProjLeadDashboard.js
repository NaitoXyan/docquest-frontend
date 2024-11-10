import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import { useNavigate } from 'react-router-dom';

const ProjLeadDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ approved: 0, pending: 0, rejected: 0 });
    const userID = localStorage.getItem('userid');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/get_project_status/${userID}/`);
                const data = await response.json();
                setProjects(data);

                // Calculate status counts
                const counts = data.reduce((acc, project) => {
                    acc[project.status] = (acc[project.status] || 0) + 1;
                    return acc;
                }, { approved: 0, pending: 0, rejected: 0 });

                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleNavigate = (statusFilter) => {
        navigate(`/project-status/${statusFilter}`);
      };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <ProjLeadSidebar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14 px-10">
                    <h1 className="text-2xl font-semibold mb-5">Projects Overview</h1>
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Approved</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.approved}</h2>
                            <button className="mt-2 underline" 
                            onClick={() => handleNavigate("approved")}>
                                View
                            </button>
                        </div>
                        <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Pending</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.pending}</h2>
                            <button className="mt-2 underline" 
                            onClick={() => handleNavigate("pending")}>
                                View
                            </button>
                        </div>
                        <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Rejected</h2>
                            <h2 className="text-4xl font-bold">{statusCounts.rejected}</h2>
                            <button className="mt-2 underline" 
                            onClick={() => handleNavigate("denied")}>
                                View
                            </button>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-5">Projects</h1>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date Created</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {projects.map((project, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">{project.uniqueCode}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{project.projectTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{new Date(project.dateCreated).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{project.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div>Showing 1 to {projects.length} of {projects.length} entries</div>
                            <div className="flex space-x-2">
                                {/* Pagination buttons can be implemented here */}
                                <button className="px-3 py-1 bg-gray-300 rounded-lg">1</button>
                                <button className="px-3 py-1 bg-gray-100 rounded-lg">2</button>
                                <button className="px-3 py-1 bg-gray-100 rounded-lg">...</button>
                                <button className="px-3 py-1 bg-gray-100 rounded-lg">11</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjLeadDashboard;
