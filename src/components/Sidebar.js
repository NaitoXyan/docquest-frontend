import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";

function Sidebar() {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Define the paths that fall under User Management
    const userManagementPaths = ["/view_users", "/create_users"];

    // Determine if any User Management path is active
    const isUserManagementActive = userManagementPaths.some(path => location.pathname.startsWith(path));

    useEffect(() => {
        if (isUserManagementActive) {
            setIsSubMenuVisible(true);
        } else {
            setIsSubMenuVisible(false);
        }
    }, [isUserManagementActive]);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        console.log(token);

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
            <div className="flex justify-center mt-4 mb-8">
                <img src="/images/logo2.png" alt="DocQuestLogo" className="w-52" />
            </div>
            <nav>
                <ul>
                    {/* Dashboard */}
                    <li>
                        <NavLink
                            to="/dashboard" // Update this path as per your routing
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${
                                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>

                    {/* User Management with Submenu */}
                    <li>
                        <button
                            onClick={toggleSubMenu}
                            className={`text-lg w-full text-left block px-6 py-3 ${
                                isUserManagementActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                            } focus:outline-none`}
                        >
                            User Management
                        </button>
                        <ul className={`${isSubMenuVisible ? 'block' : 'hidden'} bg-indigo-900`}>
                            {/* View Users */}
                            <li>
                                <NavLink
                                    to="/view_users" // Update this path as per your routing
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    View Users
                                </NavLink>
                            </li>
                            {/* Create Users */}
                            <li>
                                <NavLink
                                    to="/create_users" // Update this path as per your routing
                                    className={({ isActive }) =>
                                        `block px-6 py-3 ${
                                            isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                        }`
                                    }
                                >
                                    Create Users
                                </NavLink>
                            </li>
                        </ul>
                    </li>

                    {/* Documents */}
                    <li>
                        <NavLink
                            to="/documents" // Update this path as per your routing
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${
                                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Documents
                        </NavLink>
                    </li>

                    {/* Settings */}
                    <li>
                        <NavLink
                            to="/settings" // Update this path as per your routing
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${
                                    isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Settings
                        </NavLink>
                    </li>

                    {/* Log out */}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="text-lg block px-6 py-3 hover:text-yellow-500 w-full text-left focus:outline-none"
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
