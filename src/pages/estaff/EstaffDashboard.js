import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const EstaffDashboard = () => {
  const [users, setUsers] = useState([]); // Store the users
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const usersPerPage = 5; // Number of users per page

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, [currentPage]); // Re-fetch users whenever the current page changes

  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://your-backend-api.com/users?page=${currentPage}&limit=${usersPerPage}`);
      const data = await response.json();
      setUsers(data); // Assuming the API returns an array of users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleNext = () => {
    setCurrentPage(prevPage => prevPage + 1); // Increment the page number
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar with fixed width */}
      <div className="w-1/5 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 ml-[20%]"> {/* 20% left margin to match Sidebar width */}
        <Topbar />
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">Documents Overview</h1>

          {/* Documents Section */}
          <div className="mx-7 bg-white rounded-lg shadow-xl p-6">
            <div className="flex flex-row justify-around items-center w-full text-center h-[125px]">
              {["Proposal 1", "Proposal 2", "Load Trainers", "MOA/MOU"].map((item, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: '#ADADAD' }}
                  className="p-4 w-[175px] h-[120px] flex items-center justify-center rounded-lg shadow-xl"
                >
                  <div>
                    <h1>{item}</h1>
                    <a href="#">#</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users Section */}
          <div className="flex flex-row justify-end items-center">
            <div className="flex justify-start w-full">
              <h1 className="text-2xl font-semibold m-7">Users</h1>
            </div>
            <div className="relative m-7">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                size="20"
                value={searchQuery}
                onChange={handleSearch} // Update search query on input change
                className="bg-gray-300 pl-10 pr-4 py-2 rounded-full w-[250px] text-center"
              />
            </div>
          </div>

          {/* User List with Pagination */}
          <div className="mx-7 bg-white rounded-lg shadow-xl p-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 text-left p-2">Name</th>
                  <th className="border-b-2 text-left p-2">Email</th>
                  <th className="border-b-2 text-left p-2">Position</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">{user.name}</td>
                      <td className="border-b p-2">{user.email}</td>
                      <td className="border-b p-2">{user.position}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredUsers.length === usersPerPage && (
              <div className="mt-4 text-right">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstaffDashboard;
