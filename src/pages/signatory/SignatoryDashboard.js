import React from "react";
import Topbar from "../../components/Topbar";
import SignatorySidebar from "../../components/SignatorySideBar";

const ProjLeadDashboard = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar with fixed width */}
            <div className="w-1/5 fixed h-full">
                <SignatorySidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-[20%]"> {/* 20% left margin to match Sidebar width */}
                <Topbar />
                <div className="flex flex-col mt-14 px-10">
                    <h1 className="text-2xl font-semibold mb-5">Projects Overview</h1>

                    {/* Approved, Pending, Rejected UI */}
                    <div className="grid grid-cols-3 gap-4 mb-10">
                        {/* Approved */}
                        <div className="bg-green-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Approved</h2>
                            <h2 className="text-4xl font-bold">2</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                        {/* Pending */}
                        <div className="bg-yellow-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Pending</h2>
                            <h2 className="text-4xl font-bold">10</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                        {/* Rejected */}
                        <div className="bg-red-400 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold">Rejected</h2>
                            <h2 className="text-4xl font-bold">3</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-5">Projects</h1>

                    {/* Projects table */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Project Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">1021210010</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Scalability Enhancements</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Project proposal</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Approved</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">1021210011</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Encryption Upgrades</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Project proposal</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Approved</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">1021210012</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Chatbot Implementation</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Project proposal</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Pending</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap">1021210013</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Multi-Language Support</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Project proposal</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Rejected</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div>Showing 1 to 4 of 11 entries</div>
                            <div className="flex space-x-2">
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
