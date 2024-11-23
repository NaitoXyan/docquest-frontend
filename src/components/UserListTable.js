import React, { useState } from "react";

const UserListTable = () => {
    const [users, setUsers] = useState([
        { id: 1, fullName: "Valueno, Rabosa A.", email: "valueno.rabosa@gmail.com", position: "Project Leader" },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track if we are in editing mode
    const [currentUser, setCurrentUser] = useState({
        id: null,
        fullName: "",
        email: "",
        position: "",
    });

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEditClick = (user) => {
        setIsEditing(true);
        setCurrentUser({ ...user });
    };

    // Handle delete button click
    const handleDeleteClick = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    // Handle save button click (Update user)
    const handleSave = () => {
        setUsers(users.map((user) =>
            user.id === currentUser.id ? { ...currentUser } : user
        ));
        setIsEditing(false);
    };

    // Handle cancel button click (Close edit modal)
    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user.id}
                                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                <td className="py-4 px-6">{user.fullName}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">{user.position}</td>
                                <td className="py-4 px-6 flex items-center space-x-4">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800 font-medium"
                                        onClick={() => handleDeleteClick(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                <label className="block text-gray-600">Position</label>
                                <input
                                    type="text"
                                    value={currentUser.position}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            position: e.target.value,
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

export default UserListTable;
