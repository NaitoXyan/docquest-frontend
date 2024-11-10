import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
// import axios from "axios";
// import ReactPaginate from "react-paginate";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const usersPerPage = 10;

    useEffect(() => {
        /*
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users"); // Replace with your actual API endpoint
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
        */
    }, []);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(0);
    };
    const filteredUsers = [
        { fullName: "Valueno, Rabosa A.", email: "valueno.rabosa@gmail.com", position: "Project Leader" },
    ].filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
    const offset = currentPage * usersPerPage;
    const displayedUsers = filteredUsers.slice(offset, offset + usersPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <Sidebar />
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
                                        key={index}
                                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                                    >
                                        <td className="py-4 px-6">{user.fullName}</td>
                                        <td className="py-4 px-6">{user.email}</td>
                                        <td className="py-4 px-6">{user.position}</td>
                                        <td className="py-4 px-6 flex items-center space-x-4">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                View
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-800 font-medium">
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
                    {/* 
                    {filteredUsers.length > usersPerPage && (
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination flex justify-center mt-5 space-x-4"}
                            activeClassName={"bg-blue-900 text-white px-3 py-2 rounded-lg"}
                            pageClassName={"px-3 py-2 text-blue-600 hover:bg-gray-200 rounded-lg"}
                            previousClassName={"px-3 py-2 text-blue-600"}
                            nextClassName={"px-3 py-2 text-blue-600"}
                            disabledClassName={"text-gray-400"}
                        />
                    )}
                    */}
                </div>
            </div>
        </div>
    );
};

export default UserList;
