import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

function EstaffSideBar({ onFilterChange }) {
    const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
    const navigate = useNavigate();
    const location = useLocation();

    // Helper function to check if the pathname is related to a specific section
    const isPathActive = (path) => location.pathname.startsWith(path);

    // Logout function to clear the session
    const handleLogout = async () => {
        console.log('Logging out...'); // Debugging log
        const token = localStorage.getItem('token');  // Get token from localStorage
        if (!token) {
            console.log("No token found. User might be already logged out.");
            navigate('/login');
            return;
        }

        try {
            // Make API call to logout
            await axios.post('https://docquest-production.up.railway.app/auth/token/logout/', {}, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            console.log("Logout successful.");
        } catch (error) {
            // Catch any errors during logout process
            console.error("Logout failed:", error);
        }

        // Clear local storage and navigate to login page
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
                            to="/estaff"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/documents-list"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Documents List
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/view-document"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            View Documents
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/scancopy"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Scan Copy
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/user-list"
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
                    <li>
                        <NavLink
                            to="/profile-estaff"
                            className={({ isActive }) =>
                                `text-lg block px-6 py-3 ${isActive ? 'text-yellow-500 font-bold' : 'hover:text-yellow-500'}` }
                        >
                            Profile Page
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

export default EstaffSideBar;
