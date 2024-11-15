import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import DeptOffSideBar from "../../components/DeptOffSideBar";

const CoordinatorViewDoc = ({ projectLeader, documentType, documentDate, pdfFileUrl }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfFileUrl;
    link.setAttribute('download', 'document.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <DeptOffSideBar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14">
          <h1 className="text-2xl font-semibold m-7">View Document</h1>
          <div className="flex flex-row mx-10 mb-7 bg-white rounded-xl p-16 h-fit items-start">
            {/* Document Info */}
            <div className="flex-2 mx-5 rounded-xl p-16 h-fit flex flex-col items-center">
              <div>
                <h1>Project Leader</h1>
                <a>{projectLeader || "(leader's name)"}</a>
              </div>
              <div className="mt-10">
                <h1>Document Type</h1>
                <a>{documentType || "(type's name)"}</a>
              </div>
              <div className="mt-10">
                <h1>Date</h1>
                <a>{documentDate || "(document's date)"}</a>
              </div>
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="mt-10 bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
              >
                Download Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorViewDoc;
