import React, { useState } from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import EditMOAForm from "../../components/EditMoaForm";
import { useParams } from "react-router-dom";

const ProjLeadEditMoaForm = () => {
  const { moaID } = useParams();

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
