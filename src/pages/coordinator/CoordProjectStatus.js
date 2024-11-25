import React from "react";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";
import CoordStatusBar from "../../components/CoordStatusBar";

const CoordProjectStatus = () => {
    return (
      <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full bg-white shadow-md z-50">
          <CoordinatorSidebar />
      </div>
  
      {/* Main Content */}
      <div className="flex-1 ml-[20%] overflow-x-auto"> {/* Added overflow-x-auto */}
          <Topbar />
          <div className="flex flex-col mt-14 px-6">
              <h1 className="text-2xl font-semibold mb-6">Documents</h1>
              <CoordStatusBar />
          </div>
      </div>
  </div>
  
    );
};

export default CoordProjectStatus;
