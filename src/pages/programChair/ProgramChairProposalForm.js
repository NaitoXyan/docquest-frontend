import React, { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import ProposalFormFirstPage from "../../components/ProposalFormFirstPage";
import ProgramChairSidebar from "../../components/ProgramChairSideBar";
import { useNavigate } from "react-router-dom";

const ProgramChairProposalForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
        localStorage.clear();
        navigate('/login', { replace: true });
        return;
    }
  }, [token]);
  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProgramChairSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <ProposalFormFirstPage />
      </div>
    </div>
  );
};

export default ProgramChairProposalForm;
