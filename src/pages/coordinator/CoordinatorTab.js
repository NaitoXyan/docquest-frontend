import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import DocumentsTable from "../../components/DocumentsTable";
import { useNavigate } from "react-router-dom";

const CoordinatorTab = () => {
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
            <div className="w-1/5 fixed h-full">
                <Sidebar />
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

export default CoordinatorTab;