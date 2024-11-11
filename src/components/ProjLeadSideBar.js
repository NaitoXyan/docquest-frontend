import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function ProjLeadSidebar({ onFilterChange }) {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the current path is under Projects Management
    const isProjectsManagementActive = location.pathname.startsWith("/create_proposal") ||
                                        location.pathname.startsWith("/project-status/approved") ||
                                        location.pathname.startsWith("/project-status/ongoing") ||
                                        location.pathname.startsWith("/project-status/denied");

    useEffect(() => {
        setIsSubMenuVisible(isProjectsManagementActive);
    }, [isProjectsManagementActive]);

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
                                `text-lg block px-6 py-3 ${
                                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <button
                            onClick={() => setIsSubMenuVisible(!isSubMenuVisible)}
                            className={`text-lg w-full text-left block px-6 py-3 ${
                                isProjectsManagementActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                            } focus:outline-none`}
                        >
                            Projects Management
                        </button>
                        <ul className={`${isSubMenuVisible ? '' : 'hidden'} bg-indigo-900`}>
                            <li>
                                <NavLink
                                    to="/create_proposal"
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Create Proposal
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/project-status/approved"
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                    onClick={() => onFilterChange('Approved')}
                                >
                                    Approved
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/project-status/ongoing"
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                    onClick={() => onFilterChange('Ongoing')}
                                >
                                    Ongoing
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/project-status/denied"
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                    onClick={() => onFilterChange('Disapproved')}
                                >
                                    Denied
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink
                            to="/create_moa" // Update this path as per your routing
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
                            className="text-lg block px-6 py-3 hover:text-yellow-500 w-full text-left"
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
