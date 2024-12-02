import React from "react";
import UserListTable from "../../components/UserListTable"; // Adjust path as needed
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";

const UserListCoord = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/5 fixed h-full bg-white shadow-lg">
                <CoordinatorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[20%] flex flex-col">
                {/* Topbar */}
                <div className="w-full z-10">
                    <Topbar />
                </div>

                {/* Content below Topbar */}
                <div className="flex flex-col flex-grow p-10 mt-10">
                    {/* Title */}
                    <h1 className="text-2xl font-bold mb-8">ACCOUNTS LIST</h1>

                    {/* User List Table */}
                    <div className="bg-white shadow-xl rounded-lg flex-grow">
                        <div className="overflow-x-auto px-8 py-6">
                            <UserListTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListCoord;
