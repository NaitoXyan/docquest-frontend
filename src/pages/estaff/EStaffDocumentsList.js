import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import SearchBar from "../../components/SearchBar";

const EstaffDocumentsList = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar with fixed width */}
            <div className="w-1/5 fixed h-full">
                <Sidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-[20%]"> {/* 20% left margin to match Sidebar width */}
                <Topbar />
                <div className="flex flex-col mt-14">
                    <h1 className="text-2xl font-semibold m-7">Documents</h1>
                    <div className="mx-7 bg-white rounded-lg shadow-xl p-6">
                        <div className=" flex justify-end">
                            <a className="mr-5">Search by:</a>
                            <a className="mr-5">Seach Box</a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Project Leader</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Document Type</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Date</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <td className="px-6 py-4 border-b border-gray-200 text-sm">Valueno, Rabosa A.</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-sm">Project Proposal</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-sm">03/31/2019</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                                        <a href="#" className="flex items-center text-blue-900 hover:text-blue-900">
                                            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 6.5a1.5 1.5 0 1 1 3 0v3a1.5 1.5 0 0 1-3 0v-3z" />
                                                <path fill-rule="evenodd" d="M10 2a7.5 7.5 0 1 0 0 15h.75V15H10a6.5 6.5 0 1 1 0-13h3.5A6.5 6.5 0 1 1 10 15h.75V17H10a7.5 7.5 0 1 0 0-15z" clip-rule="evenodd" />
                                            </svg>
                                            View
                                        </a>
                                    </td>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EstaffDocumentsList;