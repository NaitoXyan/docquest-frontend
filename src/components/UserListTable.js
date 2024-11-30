import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const UserListTable = () => {
    const [users, setUsers] = useState([]); // Initialize with an empty array
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false); // Track if we are in editing mode
    const [isRoleEditing, setIsRoleEditing] = useState(false);
    const [currentRoleUser, setCurrentRoleUser] = useState({
        userID: null,
        roleID: null,
    });
    const [currentUser, setCurrentUser] = useState({
        userID: null,
        email: "",
        password: "",
        firstname: "",
        middlename: "",
        lastname: "",
        contactNumber: "",
    });

    // Fetch users from API
    const fetchUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/users_by_program", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();

            // Transform data for frontend
            const transformedUsers = data.map((user) => ({
                userID: user.userID,
                fullName: `${user.firstname} ${user.middlename || ""} ${user.lastname}`,
                email: user.email,
                firstname: user.firstname,
                middlename: user.middlename,
                lastname: user.lastname,
                contactNumber: user.contactNumber, // Include contactNumber if available
                role: user.role.map((role) => role.role).join(", "),
            }));

            setUsers(transformedUsers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // const fetchRoles = useCallback(async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch("http://127.0.0.1:8000/coordinator_get_roles", {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Token ${token}`,
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch users");
    //         }
    //         const data = await response.json();

    //         const transformedRoles = data.map((roles) => ({

    //         }));
    //     }
    // });

    const filteredUsers = users.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle edit button click
    const handleEditClick = (user) => {
        setIsEditing(true);
        setCurrentUser({
            userID: user.userID, // Include userID for saving changes
            email: user.email,
            password: "", // Leave empty if the password is not fetched
            firstname: user.firstname || "", // Default to an empty string if undefined
            middlename: user.middlename || "",
            lastname: user.lastname || "",
            contactNumber: user.contactNumber || "",
        });
    };

    // Handle delete button click
    const handleEditRoleClick = (user) => {
        setIsRoleEditing(true);
        setCurrentRoleUser({
            userID: user.userID,
        })

    };

    // Handle save button click (Update user)
    const handleSave = async () => {
        const token = localStorage.getItem("token");

        try {
            // Construct the payload dynamically
            const payload = {
                email: currentUser.email,
                firstname: currentUser.firstname,
                middlename: currentUser.middlename,
                lastname: currentUser.lastname,
                contactNumber: currentUser.contactNumber,
            };

            // Only include password if it's not empty
            if (currentUser.password.trim()) {
                payload.password = currentUser.password;
            }

            await axios.patch(
                `http://127.0.0.1:8000/edit_user_details/${currentUser.userID}/`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`,
                    },
                }
            );

            // Refresh the user list
            await fetchUsers();

            // Exit editing mode
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user:", error.response || error.message);
        }
    };

    // Handle cancel button click (Close edit modal)
    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleRoleCancel = () => {
        setIsRoleEditing(false);
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
                            <th className="py-4 px-6 text-left font-medium">Role</th>
                            <th className="py-4 px-6 text-left font-medium">Edit User Details</th>
                            <th className="py-4 px-6 text-left font-medium">Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr
                                key={user.userID}
                                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                            >
                                <td className="py-4 px-6">{user.fullName}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">{user.role}</td>
                                <td className="py-4 px-6 items-center">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                        onClick={() => handleEditClick(user)}
                                    >
                                        Edit Account
                                    </button>
                                </td>
                                <td className="py-4 px-6 items-center">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                        onClick={() => handleEditRoleClick(user)}
                                    >
                                        Edit Role
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
                                <label className="block text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    value={currentUser.firstname}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            firstname: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Middle Name</label>
                                <input
                                    type="text"
                                    value={currentUser.middlename}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            middlename: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    value={currentUser.lastname}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            lastname: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600">Contact Number</label>
                                <input
                                    type="text"
                                    value={currentUser.contactNumber}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            contactNumber: e.target.value,
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

            {isRoleEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Edit User's Role</h2>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-gray-600">Role</label>
                                <input
                                    type="text"
                                    value={currentUser.firstname}
                                    onChange={(e) =>
                                        setCurrentUser({
                                            ...currentUser,
                                            firstname: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={handleRoleCancel}
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