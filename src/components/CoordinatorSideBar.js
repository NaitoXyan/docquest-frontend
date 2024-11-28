import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function CoordinatorSidebar() {
    const [isProposalMenuVisible, setProposalMenuVisible] = useState(false);
    const [isUserMenuVisible, setUserMenuVisible] = useState(false);
    const navigate = useNavigate(); // Hook to navigate programmatically

    const toggleProposalMenu = () => {
        setProposalMenuVisible(!isProposalMenuVisible);
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(!isUserMenuVisible);
    };

    // Function to handle logout
    const handleLogout = () => {
        // Clear localStorage items related to authentication
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        localStorage.removeItem("firstname");
        localStorage.removeItem("lastname");
        localStorage.removeItem("roles");

        // Redirect to the login page
        navigate("/login");
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
                    <li>
                        <NavLink 
                            to="/documents-coord" 
                            className={({ isActive }) => 
                                `text-lg block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`}>
                            Documents
                        </NavLink>
                    </li>
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
