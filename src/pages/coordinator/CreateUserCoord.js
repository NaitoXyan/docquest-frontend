import React from "react";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";
import CoordinatorCreateUser from "../../components/CoordinatorCreateUser";

const CreateUserCoord = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/5 fixed h-full bg-white shadow-md">
                <CoordinatorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[20%] min-h-screen">
                {/* Topbar, positioned fixed at the top */}
                <div className="fixed w-full top-0 left-0 z-10">
                    <Topbar />
                </div>

                {/* Content below Topbar */}
                <div className="flex flex-col mt-[64px] p-10 min-h-full">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold mb-5">Create User</h1>

                    {/* Create User Form */}
                    <CoordinatorCreateUser />
                </div>
            </div>
        </div>
    );
};

export default CreateUserCoord;
