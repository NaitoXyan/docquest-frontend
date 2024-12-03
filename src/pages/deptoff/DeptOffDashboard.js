import React, {useEffect} from "react";
import Topbar from "../../components/Topbar";
import DeptOffSideBar from "../../components/DeptOffSideBar";
import { useNavigate } from "react-router-dom";

const DeptOffDashboard = () => {
  // Placeholder data for users (you should replace this with real data)
  const users = [
    { name: "John Doe", email: "john@example.com", position: "Manager" },
    { name: "Jane Smith", email: "jane@example.com", position: "Assistant" },
    { name: "Samuel Green", email: "samuel@example.com", position: "Supervisor" },
  ];
  const currentUsers = users; // In a real case, this would be the filtered or paginated data
  const indexOfFirstUser = 0;
  const indexOfLastUser = currentUsers.length;
  const totalPages = 1; // Change this depending on your pagination logic
  const currentPage = 1; // This is just a placeholder for the current page logic

  const prevPage = () => {
    if (currentPage > 1) {
      // Handle page navigation logic
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      // Handle page navigation logic
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <DeptOffSideBar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14 px-10">
          {/* Users Table */}
          <h1 className="text-2xl font-semibold mb-5">Users</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Position</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.position}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} entries</div>
              <div className="flex space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-100'}`}
                >
                  Previous
                </button>
                <span className="px-3 py-1">{currentPage}</span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-100'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Documents Overview */}
          <h1 className="text-2xl font-bold mb-5 mt-10">DOCUMENTS OVERVIEW</h1>
          <div className="flex space-x-4 mb-10">
            {/* Approved */}
            <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
              <h2 className="text-lg font-semibold">Proposal 1</h2>
              <h2 className="text-4xl font-bold">2</h2>
              <button className="mt-2 underline">View</button>
            </div>
            {/* Pending */}
            <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
              <h2 className="text-lg font-semibold">Proposal 2</h2>
              <h2 className="text-4xl font-bold">10</h2>
              <button className="mt-2 underline">View</button>
            </div>
            {/* Rejected */}
            <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
              <h2 className="text-lg font-semibold">Load Trainers</h2>
              <h2 className="text-4xl font-bold">3</h2>
              <button className="mt-2 underline">View</button>
            </div>
            {/* MOA/MOU */}
            <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
              <h2 className="text-lg font-semibold">MOA/MOU</h2>
              <h2 className="text-4xl font-bold">3</h2>
              <button className="mt-2 underline">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptOffDashboard;
