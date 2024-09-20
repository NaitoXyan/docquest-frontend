import React, { useState } from "react";

function Sidebar() {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible)
    };

    return (
        <div className="w-1/5 bg-vlu text-white h-screen fixed z-50">
            <div className="flex justify-center">
                <img src="/images/logo2.png" alt="DocQuestLogo" className="w-52" />
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#" className="text-lg font-bold block px-6 py-3 text-yellow-500">Dashboard</a>
                    </li>
                    <li>
                        <button onClick={toggleSubMenu} className="text-lg w-full text-left block px-6 py-3 hover:text-yellow-500 focus:outline-none">
                            User Management
                        </button>
                        <ul className={`${isSubMenuVisible ? '' : 'hidden'} bg-indigo-900`}>
                            <li><a href="#" className="block px-6 py-3 hover:text-yellow-500">View Users</a></li>
                            <li><a href="#" className="block px-6 py-3 hover:text-yellow-500">Create Users</a></li>
                        </ul>
                    </li>
                    <li><a href="#" className="text-lg block px-6 py-3 hover:text-yellow-500">Documents</a></li>
                    <li><a href="#" className="text-lg block px-6 py-3 hover:text-yellow-500">Settings</a></li>
                    <li><a href="#" className="text-lg block px-6 py-3 hover:text-yellow-500">Log out</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;