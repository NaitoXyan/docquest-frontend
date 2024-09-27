import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProjLeadSidebar({ onFilterChange }) {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const navigate = useNavigate();

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    };

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        console.log(token)
        
        axios({
            method: 'post',
            url: 'https://docquest-production.up.railway.app/auth/token/logout/',
            headers: {
              'Authorization': `Token ${token}`,
            },
            data: {}
          });

        localStorage.removeItem('token');
        
        navigate('/login');
      };

      const handleNavigation = (path) => {
        navigate(path);
      };

    return (
        <div className="w-1/5 bg-vlu text-white h-screen fixed z-50">
            <div className="flex justify-center">
                <img src="/images/logo2.png" alt="DocQuestLogo" className="w-52" />
            </div>
            <nav>
                <ul>
                    <li>
                        {/* <a href="#" className="text-lg font-bold block px-6 py-3 text-yellow-500">Dashboard</a> */}
                        <button className="text-lg font-bold block px-6 py-3 text-yellow-500" onClick={() => handleNavigation('/user')}>Dashboard</button>
                    </li>
                    <li>
                        <button onClick={toggleSubMenu} className="text-lg w-full text-left block px-6 py-3 hover:text-yellow-500 focus:outline-none">
                            Projects Management
                        </button>
                        <ul className={`${isSubMenuVisible ? '' : 'hidden'} bg-indigo-900`}>
                            {/* <li><a href="#" className="block px-6 py-3 hover:text-yellow-500">Create Proposal</a></li> */}
                            <button className="block px-6 py-3 hover:text-yellow-500" onClick={() => handleNavigation('/create_proposal')}>Create Proposal</button>
                            {/* Add onClick handlers to change the filter based on the clicked item */}
                            <li>
                                <a href="#" className="block px-6 py-3 hover:text-yellow-500" onClick={() => onFilterChange('Approved')}>Approved</a>
                            </li>
                            <li>
                                <a href="#" className="block px-6 py-3 hover:text-yellow-500" onClick={() => onFilterChange('Ongoing')}>Ongoing</a>
                            </li>
                            <li>
                                <a href="#" className="block px-6 py-3 hover:text-yellow-500" onClick={() => onFilterChange('Disapproved')}>Disapproved</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" className="text-lg block px-6 py-3 hover:text-yellow-500">Create MOA/MOU</a>
                    </li>
                    <button className="text-lg block px-6 py-3 hover:text-yellow-500" onClick={handleLogout}>Log out</button>
                    {/* <li>
                        <a href="#" className="text-lg block px-6 py-3 hover:text-yellow-500">Log out</a>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}

export default ProjLeadSidebar;
