import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function CoordinatorSidebar() {
    const [isProposalMenuVisible, setProposalMenuVisible] = useState(false);
    const [isUserMenuVisible, setUserMenuVisible] = useState(false);
    const [isStatusMenuVisible, setStatusMenuVisible] = useState(false); // New state for status menu
    const navigate = useNavigate(); // Hook to navigate programmatically

    const toggleProposalMenu = () => {
        setProposalMenuVisible(!isProposalMenuVisible);
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(!isUserMenuVisible);
    };

    const toggleStatusMenu = () => {
        setStatusMenuVisible(!isStatusMenuVisible); // Toggle visibility of status menu
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('https://web-production-4b16.up.railway.app/auth/token/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="w-1/5 bg-vlu text-white h-screen fixed z-50">
            <div className="flex justify-center">
                <img src="/images/logo2.png" alt="DocQuestLogo" className="w-52" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink 
                            to="/coordinatordashboard" 
                            className={({ isActive }) => 
                                `text-lg font-bold block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                            Dashboard
                        </NavLink>
                    </li>

                    {/* Status Section (Approved, Disapproved, Pending) */}
                    <li>
                        <button 
                            onClick={toggleStatusMenu} 
                            className="text-lg w-full text-left block px-6 py-3 hover:text-yellow-500 focus:outline-none">
                            Status
                        </button>
                        <ul className={`${isStatusMenuVisible ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink 
                                    to="/projects/approved" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                                    Approved
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/projects/rejected" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                                    Rejected
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/projects/pending" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                                    Pending
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* Accounts Section */}
                    <li>
                        <button onClick={toggleUserMenu} className="text-lg w-full text-left block px-6 py-3 hover:text-yellow-500 focus:outline-none">
                            Accounts
                        </button>
                        <ul className={`${isUserMenuVisible ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink 
                                    to="/coordusers" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                                    User List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/createuser:id" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                                    Create User
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* <li>
                        <NavLink 
                            to="/documents-coord" 
                            className={({ isActive }) => 
                                `text-lg block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                            Documents
                        </NavLink>
                    </li> */}
                    {/* Log out item */}
                    
                    <li>
                        <button 
                            onClick={handleLogout} 
                            className="text-lg block px-6 py-3 hover:text-yellow-500 focus:outline-none">
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default CoordinatorSidebar;
