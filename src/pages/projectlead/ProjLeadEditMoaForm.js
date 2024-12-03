import React, { useState, useEffect } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import EditMOAForm from "../../components/EditMoaForm";
import { useNavigate, useParams } from "react-router-dom";

const ProjLeadEditMoaForm = () => {
  const { moaID } = useParams();
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
        <EditMOAForm moaID={moaID} />
      </div>
    </div>
  );
};

export default ProjLeadEditMoaForm;
