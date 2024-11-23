import React from "react";
import EstaffSideBar from "../../components/EstaffSideBar";
import Topbar from "../../components/Topbar";
import DocumentsTable from "../../components/DocumentsTable";

const CampusProposal = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <EstaffSideBar />
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                <div className="flex flex-col mt-14">
                    <h1 className="text-2xl font-semibold m-7">Documents</h1>
                    <DocumentsTable />
                </div>
            </div>
        </div>
    );
}

export default CampusProposal;