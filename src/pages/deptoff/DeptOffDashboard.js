import React from "react";
import Topbar from "../../components/Topbar";
import DeptOffSideBar from "../../components/DeptOffSideBar";

const DeptOffDashboard = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
           <div className="w-1/5 fixed h-full">
           <DeptOffSideBar/>
           </div>
           <div className="flex-1 ml-[20%]">
            <Topbar />
                <div className="flex flex-col mt-14 px-10">
                    <h1 className="text-2xl font-semibold mb-5 mt-5">Documents Overview</h1>
                    <div className="flex space-x-4 mb-10">
                        {/* Approved */}
                        <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
                            <h2 className="text-lg font-semibold">Proposal 1</h2>
                            <h2 className="text-4xl font-bold">2</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                        {/* Pending */}
                        <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
                            <h2 className="text-lg font-semibold">Proposal 2</h2>
                            <h2 className="text-4xl font-bold">10</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                        {/* Rejected */}
                        <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
                            <h2 className="text-lg font-semibold">Load Trainers</h2>
                            <h2 className="text-4xl font-bold">3</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                        {/* MOA/MOU */}
                        <div className="bg-gray-400 rounded-lg text-white p-6 flex flex-col items-center justify-center flex-grow">
                            <h2 className="text-lg font-semibold">MOA/MOU</h2>
                            <h2 className="text-4xl font-bold">3</h2>
                            <button className="mt-2 underline">View</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeptOffDashboard;
