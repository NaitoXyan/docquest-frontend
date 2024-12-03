import React, { useEffect, useState } from "react";
import Topbar from "../../components/Topbar";
import EstaffSideBar from "../../components/EstaffSideBar";
import { NavLink, useNavigate } from "react-router-dom";

const EstaffDashboard = () => {
    const [users, setUsers] = useState([]);
    const [campusProposalCount, setCampusProposalCount] = useState(0);
    const [sharedProposalCount, setSharedProposalCount] = useState(0);
    const [loadTrainersCount, setLoadTrainersCount] = useState(0);
    const [moaMouCount, setMoaMouCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
          localStorage.clear();
          navigate('/login', { replace: true });
          return;
      }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users');
                const usersData = await response.json();
                setUsers(usersData);

                const proposalResponse = await fetch('/api/proposals/counts');
                const proposalData = await proposalResponse.json();

                setCampusProposalCount(proposalData.campusProposals || 0);
                setSharedProposalCount(proposalData.sharedProposals || 0);
                setLoadTrainersCount(proposalData.loadTrainers || 0);
                setMoaMouCount(proposalData.moaMou || 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const totalPages = Math.ceil(users.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <EstaffSideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14 px-10">
                    <h1 className="text-2xl font-bold mb-5">DOCUMENTS OVERVIEW</h1>

                    <div className="grid grid-cols-4 gap-4 mb-10">
                        <div className="bg-blue-300 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold text-black">Campus Proposal</h2>
                            <h2 className="text-7xl">{campusProposalCount}</h2>
                            <NavLink
                                to="/campus-proposal"
                                className="mt-2 underline text-black hover:text-blue-600"
                            >
                                View
                            </NavLink>
                        </div>
                        <div className="bg-green-300 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold text-black">Shared Proposal</h2>
                            <h2 className="text-7xl">{sharedProposalCount}</h2>
                            <NavLink
                                to="/shared-proposal"
                                className="mt-2 underline text-black hover:text-blue-600"
                            >
                                View
                            </NavLink>
                        </div>
                        <div className="bg-orange-300 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold text-black">Load Trainers</h2>
                            <h2 className="text-7xl">{loadTrainersCount}</h2>
                            <NavLink
                                to="/load-trainers"
                                className="mt-2 underline text-black hover:text-blue-600"
                            >
                                View
                            </NavLink>
                        </div>
                        <div className="bg-purple-300 rounded-lg text-white p-6 flex flex-col items-center justify-center">
                            <h2 className="text-lg font-semibold text-black">MOA/MOU</h2>
                            <h2 className="text-7xl">{moaMouCount}</h2>
                            <NavLink
                                to="/moa-mou"
                                className="mt-2 underline text-black hover:text-blue-600"
                            >
                                View
                            </NavLink>
                        </div>
                    </div>

                    <h1 className="text-2xl font-semibold mb-5">USERS</h1>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Position</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.position}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div>
                                Showing {indexOfFirstUser + 1} to{" "}
                                {Math.min(indexOfLastUser, users.length)} of {users.length} entries
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded-lg ${
                                        currentPage === 1 ? "bg-gray-300" : "bg-gray-100"
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1">{currentPage}</span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded-lg ${
                                        currentPage === totalPages ? "bg-gray-300" : "bg-gray-100"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstaffDashboard;
