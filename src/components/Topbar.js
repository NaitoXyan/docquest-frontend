import { BellIcon } from '@heroicons/react/outline'; // Import the Bell Icon
import React, { useState, useEffect } from 'react';

const Topbar = () => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Simulate fetching notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const newNotifications = await fetch('/api/notifications')
        .then((res) => res.json())
        .catch((error) => {
          console.error('Error fetching notifications:', error);
          return [];
        });

      if (newNotifications.length > 0) {
        setNotifications(newNotifications);
        setHasNotifications(true);
      }
    };

    fetchNotifications();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (notifications.length === 0) {
      setHasNotifications(false);
    }
  };

  return (
    <div className="flex w-4/5 items-center mb-14 px-3 h-14 bg-white fixed right-0 z-50">
      {/* Notification Icon */}
      <div className="relative w-5/6">
        <BellIcon
          className={`w- h-7 cursor-pointer ${hasNotifications ? 'text-gray-500' : 'text-blue-500'}`}
          onClick={toggleDropdown}
        />

        {/* Notification Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="p-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {notifications.length === 0 ? (
                  <li className="text-gray-500 text-xs">No new notifications</li>
                ) : (
                  notifications.map((notif, index) => (
                    <li key={index} className="text-xs text-gray-700 py-1 border-b">
                      {notif.message}
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
          <h1 className="text-sm w-44">Emmanuelle James Duallo</h1>
          <h2 className="text-xs text-gray-500">Project Leader</h2>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
