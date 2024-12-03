import React, { useState, useEffect } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import MOAForm from "../../components/MOAForm";
import { useNavigate, useParams } from "react-router-dom";

const ProjLeadMoaForm = () => {
  const { projectID } = useParams();
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
        <ProjLeadSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <MOAForm projectID={projectID} />
      </div>
    </div>
  );
};

export default ProjLeadMoaForm;
