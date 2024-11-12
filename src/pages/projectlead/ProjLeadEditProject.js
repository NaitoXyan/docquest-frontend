import React, { useState } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import MOAForm from "../../components/MOAForm";
import { useParams } from "react-router-dom";
import EditProposalForm from "../../components/EditProjectForm";

const ProjLeadEditProject = () => {
  const { projectID } = useParams();

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <EditProposalForm projectID={projectID} />
      </div>
    </div>
  );
};

export default ProjLeadEditProject;
