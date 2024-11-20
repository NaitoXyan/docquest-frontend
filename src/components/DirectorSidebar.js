import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function DirectorSidebar({ onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if token is present
        if (!token) {
          navigate('/login', { replace: true });
          return;
        }
    
        // Retrieve roles from localStorage
        const roles = JSON.parse(localStorage.getItem('roles') || '[]');
        
        // Redirect if "ecrd" role is not found
        if (!roles.includes("ecrd")) {
          navigate('/login', { replace: true });
        }
      }, [token, navigate]);


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
            await axios.post('http://127.0.0.1:8000/auth/token/logout/', {}, {
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
                            to="/director"
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
                            to="/review-list/pending/project"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            Project Proposal Review
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/review-list/pending/moa"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'
                                }`
                            }
                        >
                            MOA/MOU Review
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

export default DirectorSidebar;