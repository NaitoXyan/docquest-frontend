import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import DocumentsTable from "../../components/DocumentsTable";

const CoordinatorTab = () => {
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
                    <h1 className="text-2xl font-semibold m-7">Documents</h1>
                    <DocumentsTable />
                </div>
            </div>
        </div>
    );
}

export default CoordinatorTab;