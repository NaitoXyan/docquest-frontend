import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function VPALASideBar({ onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if the pathname is related to a specific section
    const isPathActive = (path) => location.pathname.startsWith(path);

    const handleProjectNavigate = (statusFilter = 'all') => {
        console.log("Navigating to:", `/project-status/${statusFilter}`);
        navigate(`/project-status/${statusFilter.toLowerCase()}`);
    };

    const handleMOANavigate = (statusFilter = 'all') => {
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
                            to="/vpala"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/vpalamemolist"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Documents
                        </NavLink>
                    </li>
                    {/* <li>
                        <button
                            onClick={() => toggleDropdown('projectMonitoring')}
                            className={`text-lg w-full text-left block px-6 py-3 ${isPathActive("/project-status") ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                } focus:outline-none`}
                        >
                            MOA/MOU Status
                        </button>
                        <ul className={`${activeDropdown === 'projectMonitoring' ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink
                                    to="/project-status/all"
                                    // onClick={() => handleProjectNavigate('all')}
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Pending
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/moa-status/all"
                                    // onClick={() => handleMOANavigate('all')}
                                    className={({ isActive }) =>
                                        `text-lg pl-10 block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Approved
                                </NavLink>
                            </li>
                        </ul>
                    </li> */}
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

export default VPALASideBar;
