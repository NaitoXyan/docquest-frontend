import React from "react";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Topbar from "../../components/Topbar";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/GeneratePdf";

const DirectorReviewProject = () => {
  const { projectID } = useParams();

  return (
    <div className="bg-gray-200 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%] mr-[20%]">
        <Topbar />
        <div className="h-[calc(100vh-80px)] flex justify-center items-center p-5">
          <PDFViewer className="w-full h-full border shadow-lg">
            <MyDocument projectID={projectID} />
          </PDFViewer>
        </div>
      </div>

      {/* Approval Panel */}
      <div className="w-1/5 fixed right-0 top-0 h-full p-4 bg-white shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Pending For Approval:</h3>
        <label>Comment:</label>
        <textarea
            placeholder="Comment..."
            className="w-full p-2 border rounded mb-2 resize-none"
            rows="4"
          ></textarea>
        <button className="w-full py-2 mb-2 text-white font-bold bg-green-600 rounded hover:bg-green-700">
          Approve
        </button>
        <button className="w-full py-2 mb-2 text-white font-bold bg-yellow-500 rounded hover:bg-yellow-700">
          Revise
        </button>
        <button className="w-full py-2 mb-2 text-white font-bold bg-red-600 rounded hover:bg-red-700">
          Deny
        </button>
        {/* <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Need Revision</h4>
          
          <button className="w-full py-2 text-white font-bold bg-blue-600 rounded hover:bg-blue-700">
            Notify For Revision
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DirectorReviewProject;
