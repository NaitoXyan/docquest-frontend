import React, {useEffect} from "react";
import CoordinatorSidebar from "../../components/CoordinatorSideBar";
import Topbar from "../../components/Topbar";
import CoordinatorCreateUser from "../../components/CoordinatorCreateUser";
import CreateUserPage from "./CreateUserPage";
import { useNavigate } from "react-router-dom";

const CreateUserCoord = () => {
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
            <div className="w-1/5 fixed h-full bg-white shadow-md">
                <CoordinatorSidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-[20%] min-h-screen">
                {/* Topbar, positioned fixed at the top */}
                <div className="fixed w-full top-0 left-0 z-10">
                    <Topbar />
                </div>

                {/* Content below Topbar */}
                <div className="flex flex-col mt-2 p-10 min-h-full">
                    {/* Create User Form */}
                    <CreateUserPage />
                </div>
            </div>
        </div>
    );
};

export default CreateUserCoord;
