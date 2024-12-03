import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import ProposalFormFirstPage from "../../components/ProposalFormFirstPage";
import CollegeDeanSidebar from "../../components/CollegeDeanSideBar";

const CollegeDeanProposalForm = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <CollegeDeanSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <ProposalFormFirstPage />
      </div>
    </div>
  );
};

export default CollegeDeanProposalForm;
