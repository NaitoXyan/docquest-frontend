import React from "react";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";
import DocumentsListCoord from "../../components/DocumentsListCoord";

const DocListCoord = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/5 fixed h-full bg-white shadow-md">
                <CoordinatorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[20%] min-h-screen flex flex-col">
                {/* Topbar */}
                <div className="w-full z-10">
                    <Topbar />
                </div>

                {/* Content below Topbar */}
                <div className="flex flex-col flex-grow p-10 mt-[72px]">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold mb-8">Documents List</h1>

                    {/* Documents List Table */}
                    <div className="bg-white shadow-xl rounded-lg flex-grow">
                        {/* Make sure the container spans full width and allows table to grow */}
                        <div className="overflow-x-auto w-full px-8 py-6">
                            <DocumentsListCoord />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocListCoord;
