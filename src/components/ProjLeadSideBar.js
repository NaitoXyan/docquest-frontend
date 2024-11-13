import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function ProjLeadSidebar({ onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if the pathname is related to a specific section
    const isPathActive = (path) => location.pathname.startsWith(path);

    const handleNavigate = (statusFilter = 'all') => {
        console.log("Navigating to:", `/project-status/${statusFilter}`);
        navigate(`/project-status/${statusFilter.toLowerCase()}`);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('https://docquest-production.up.railway.app/auth/token/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
        } catch (error) {
            console.error("Logout failed:", error);
        }
        localStorage.removeItem('token');
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
                            to="/user"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={() => toggleDropdown('projectMonitoring')}
                            className={`text-lg w-full text-left block px-6 py-3 ${isPathActive("/project-status") ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                } focus:outline-none`}
                        >
                            Project Monitoring
                        </button>
                        <ul className={`${activeDropdown === 'projectMonitoring' ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink
                                    to="/project-status/all"
                                    onClick={() => handleNavigate('all')}
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Project List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/moa-status"
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    MOA Status
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button
                            onClick={() => toggleDropdown('projectCreation')}
                            className={`text-lg w-full text-left block px-6 py-3 ${isPathActive("/create_proposal") || isPathActive("/create_moa") || isPathActive("/load_trainer") ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                } focus:outline-none`}
                        >
                            Project Creation
                        </button>
                        <ul className={`${activeDropdown === 'projectCreation' ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink
                                    to="/create_proposal"
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Create Proposal
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/create_moa"
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Create MOA/MOU
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/load_trainer"
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Load Trainer
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>

                        <NavLink
                            to="/pick-project-create-moa" // Update this path as per your routing
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${
                                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Create MOA/MOU
                        </NavLink>
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

export default ProjLeadSidebar;
