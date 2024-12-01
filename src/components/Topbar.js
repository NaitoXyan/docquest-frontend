import { BellIcon } from '@heroicons/react/solid'; // Import the Bell Icon
import { TrashIcon } from '@heroicons/react/outline'; // Import the Trash Icon
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [roles, setRoles] = useState([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (notifications.length > 0) {
      // Mark all notifications as read when the dropdown is opened
      setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...';
  };



  // Check if there are any unread notifications
  const hasNotifications = notifications.some((notif) => !notif.read);

  useEffect(() => {
    const storedFirstname = JSON.parse(localStorage.getItem('firstname'));
    const storedLastname = JSON.parse(localStorage.getItem('lastname'));
    const storedRoles = JSON.parse(localStorage.getItem('roles'));

    if (storedFirstname) setFirstname(storedFirstname);
    if (storedLastname) setLastname(storedLastname);
    if (storedRoles) setRoles(storedRoles);
  }, []);

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const formatRoles = () => {
    const formattedRoles = roles.map((role) => {
      if (role === 'rglr') {
        return 'Project Leader';
      } else if (role === 'prch') {
        return 'Program Chair';
      } else if (role === 'cldn') {
        return 'College Dean';
      } else if (role === 'ecrd') {
        return 'Director, Extension & Community Relations';
      } else if (role === 'vcaa') {
        return 'Vice - Chancellor for Academic Affairs';
      } else if (role === 'vcri') {
        return 'Vice - Chancellor for Research and Innovation';
      } else if (role === 'acnt') {
        return 'Accountant II';
      } else if (role === 'cclr') {
        return 'Chancellor, USTP CDO';
      } else {
        return role;
      }
    }).join(', ');

    return truncateText(formattedRoles, 30); // Truncate roles
  };


  return (
    <div className="flex w-4/5 items-center mb-14 px-3 h-14 bg-white fixed right-0 z-50">
      {/* Notification Icon with Count */}
      <div className="relative w-5/6">
        <div className="w-14 rounded-lg relative">
          <BellIcon className={`w-7 h-7 ${hasNotifications ? 'text-amber-400' : 'text-gray-400'} cursor-pointer`} onClick={toggleDropdown} />
          {/* Display Notification Count */}
          <div className="absolute top-1 left-6 flex items-center justify-center w-5 h-5 rounded-full text-gray-400 text-sm font-semibold">
            {notifications.length > 0 ? notifications.length : null}
          </div>
        </div>

        {/* Notification Dropdown */}
        {isDropdownOpen && (
          <div className="absolute -left-3 mt-3 w-64 bg-white shadow-lg z-10">
            <div className="p-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="text-gray-500 text-xs">No new notifications</li>
                ) : (
                  notifications.map((notif) => (
                    <li key={notif.id} className={`text-xs py-2 border-b ${notif.read ? 'text-gray-500' : 'text-gray-700'} flex justify-between items-center`}>
                      {/* Notification Title */}
                      <span className="font-semibold">{notif.title}</span>
                      {/* Delete Button */}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Circle Profile Picture */}
      <div className="flex items-center">
        <img
          src="/images/userprofile.png"
          alt="Profile"
          className="w-8 h-8 rounded-full mr-3"
        />
        <div>
          <Link to="/profile">
            <h1 className="text-sm w-44 text-truncate font-medium">{firstname} {lastname}</h1>
            <h2
              className="text-xs text-gray-500 text-truncate"
              title={formatRoles()} // Full text shown in the tooltip
            >
              {formatRoles()}
            </h2>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
