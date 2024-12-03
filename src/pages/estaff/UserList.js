import React, { useState, useEffect } from "react";
import EstaffSideBar from "../../components/EstaffSideBar";
import Topbar from "../../components/Topbar";
import { useNavigate } from "react-router-dom";

const UserList = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
      if (!token) {
          localStorage.clear();
          navigate('/login', { replace: true });
          return;
      }
    }, [token]);

    const [users, setUsers] = useState([
        { id: 1, fullName: "Valueno, Rabosa A.", email: "valueno.rabosa@gmail.com", position: "Project Leader", password: "password123" },
    ]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const usersPerPage = 10;

    useEffect(() => {
        // Fetch users from the API if needed
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0);
    };

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
    const offset = currentPage * usersPerPage;
    const displayedUsers = filteredUsers.slice(offset, offset + usersPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
    };

    const handleSave = () => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === currentUser.id ? currentUser : user
            )
        );
        setIsEditing(false);
        setCurrentUser(null);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentUser(null);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <EstaffSideBar />
            </div>

            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14 px-7">
                    <h1 className="text-2xl font-semibold mb-4">Registered Account Users</h1>

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-4 items-center">
                            <span className="text-gray-500">Search by: </span>
                            <select className="border border-gray-300 rounded-lg p-2">
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded-lg p-2 w-1/3"
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto bg-white shadow-md">
                            <thead className="bg-vlu text-white">
                                <tr>
                                    <th className="py-4 px-6 text-left font-medium">Full Name</th>
                                    <th className="py-4 px-6 text-left font-medium">Email</th>
                                    <th className="py-4 px-6 text-left font-medium">Position</th>
                                    <th className="py-4 px-6 text-left font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedUsers.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                    >
                                        <td className="py-4 px-6">{user.fullName}</td>
                                        <td className="py-4 px-6">{user.email}</td>
                                        <td className="py-4 px-6">{user.position}</td>
                                        <td className="py-4 px-6 flex items-center space-x-4">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-800 font-medium">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-gray-600">Full Name</label>
                                <input
                                    type="text"
                                    value={currentUser.fullName}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            fullName: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Email</label>
                                <input
                                    type="email"
                                    value={currentUser.email}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Password</label>
                                <input
                                    type="text"
                                    value={currentUser.password}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-300 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
