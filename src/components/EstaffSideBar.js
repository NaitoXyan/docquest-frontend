import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function EstaffSideBar({ onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if the pathname is related to a specific section
    const isPathActive = (path) => location.pathname.startsWith(path);

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

    const toggleDropdown = (dropdown) => {
        // Toggle the dropdown and close others
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
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
                            to="/estaff"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/estaff-project-statistics"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Project Statistics
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/estaff-project-view-list/approved/project"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Project List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/estaff-moa-view-list/all/moa"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            MOA List
                        </NavLink>
                    </li>
                   
                    {/* Accounts Dropdown */}
                    <li>
                        <button
                            onClick={() => toggleDropdown('accounts')}
                            className={`text-lg block px-6 py-3 w-full text-left ${activeDropdown === 'accounts' ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}`}
                        >
                            Accounts
                        </button>
                        {activeDropdown === 'accounts' && (
                            <ul className="pl-6">
                                <li>
                                    <NavLink
                                        to="/estaff-userlist"
                                        className={({ isActive }) =>
                                            `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                                    >
                                        User List
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink
                                        to="/create-user"
                                        className={({ isActive }) =>
                                            `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                                    >
                                        Create User
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-lg text-white block px-6 py-3 hover:text-red-600 w-full text-left"
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default EstaffSideBar;
