import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const UserList = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/5 fixed h-full">
                <Sidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-64"> {/* Updated margin to fit Sidebar */}
                <Topbar />
                <div className="flex flex-col mt-14">
                    <h1 className="text-2xl font-semibold m-7">Registered Account Users</h1>
                    <div className="mx-7 bg-white rounded-lg shadow-lg p-6">
                        {/* Search input */}
                        <div className="relative mb-4">
                            <input 
                                type="text" 
                                className="w-full p-2 pl-10 border border-gray-300 rounded-md" 
                                placeholder="Search by name, email..."
                            />
                            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.9 14.32a7.5 7.5 0 1 1 1.42-1.42l4.25 4.26a1 1 0 0 1-1.42 1.42l-4.25-4.26zM10 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z" clipRule="evenodd"></path>
                            </svg>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Full Name</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Email</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Position</th>
                                        <th className="px-6 py-3 text-left text-sm leading-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* User 1 */}
                                    <tr>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm">John Doe</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm">johndoe@example.com</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm">Manager</td>
                                        <td className="px-6 py-4 border-b border-gray-200 text-sm flex justify-end items-center space-x-2">
                                            <a href="#" className="flex items-center text-blue-900 hover:text-blue-700">
                                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 6.5a1.5 1.5 0 1 1 3 0v3a1.5 1.5 0 0 1-3 0v-3z" />
                                                    <path fillRule="evenodd" d="M10 2a7.5 7.5 0 1 0 0 15h.75V15H10a6.5 6.5 0 1 1 0-13h3.5A6.5 6.5 0 1 1 10 15h.75V17H10a7.5 7.5 0 1 0 0-15z" clipRule="evenodd" />
                                                </svg>
                                                View
                                            </a>
                                            <a href="#" className="flex items-center text-green-500 hover:text-green-700">
                                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M7.5 5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 17.5 5v10a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7.5 15V5zm1 0V15h7V5h-7z" clipRule="evenodd" />
                                                    <path fillRule="evenodd" d="M4.5 6a1.5 1.5 0 0 1 1.5-1.5h1.75v1.5H6v9h2.25V17H6a2.5 2.5 0 0 1-2.5-2.5v-9A1.5 1.5 0 0 1 4.5 6zm0-1.5A2.5 2.5 0 0 0 2 7v9a2.5 2.5 0 0 0 2.5 2.5h2.25v1.5h1.75v-1.5h7v-1.5H6v-9h9v9H6V7H5.25v1.5H4.5V7a1.5 1.5 0 0 1 1.5-1.5zm4.25 2.5H13.5V7h-3.5V6z" clipRule="evenodd" />
                                                </svg>
                                                Edit
                                            </a>
                                            <a href="#" className="flex items-center text-red-500 hover:text-red-700">
                                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M6.5 4.5A1.5 1.5 0 0 1 8 3h4a1.5 1.5 0 0 1 1.5 1.5V4h4v1.5H16V15.5a3.5 3.5 0 0 1-3.5 3.5h-5A3.5 3.5 0 0 1 4 15.5V6h-2V4.5h4v-1zm2 0h4v-1h-4v1z" clipRule="evenodd" />
                                                </svg>
                                                Delete
                                            </a>
                                        </td>
                                    </tr>

                                    {/* Add more user rows as needed */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;
