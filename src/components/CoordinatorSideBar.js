import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function CoordinatorSidebar() {
    const [isProposalMenuVisible, setProposalMenuVisible] = useState(false);
    const [isUserMenuVisible, setUserMenuVisible] = useState(false);

    const toggleProposalMenu = () => {
        setProposalMenuVisible(!isProposalMenuVisible);
    };

    const toggleUserMenu = () => {
        setUserMenuVisible(!isUserMenuVisible);
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
                                `text-lg font-bold block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`
                            }>
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
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`
                                    }>
                                    User List
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/createuser:id" 
                                    className={({ isActive }) => 
                                        `block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`
                                    }>
                                    Create User
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <NavLink 
                            to="/documents-coord" 
                            className={({ isActive }) => 
                                `text-lg block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`
                            }>
                            Documents
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/logout" 
                            className={({ isActive }) => 
                                `text-lg block px-6 py-3 ${isActive ? "text-yellow-500" : "hover:text-yellow-500"}`
                            }>
                            Log out
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default CoordinatorSidebar;
