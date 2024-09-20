import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const EstaffDashboard = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar with fixed width */}
            <div className="w-1/5 fixed h-full">
                <Sidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-[20%]"> {/* 20% left margin to match Sidebar width */}
                <Topbar />
                <div className="flex flex-col mt-14">
                    <h1 className="text-2xl font-semibold m-7">Documents Overview</h1>
                    <div className="mx-7 bg-white rounded-lg shadow-xl p-6">
                        <div className="flex flex-row justify-around items-center w-full text-center h-[125px]">
                            <div
                                style={{ backgroundColor: '#ADADAD' }}
                                className="p-4 w-[175px] h-[120px] flex items-center justify-center rounded-lg shadow-xl"
                            >
                                <div>
                                    <h1 className="">Proposal 1</h1>
                                    <a href="#" className="">#</a>
                                </div>
                            </div>
                            <div
                                style={{ backgroundColor: '#ADADAD' }}
                                className="p-4 w-[175px] h-[120px] flex items-center justify-center rounded-lg shadow-xl"
                            >
                                <div>
                                    <h1 className="">Proposal 2</h1>
                                    <a href="#" className="">#</a>
                                </div>
                            </div>
                            <div
                                style={{ backgroundColor: '#ADADAD' }}
                                className="p-4 w-[175px] h-[120px] flex items-center justify-center rounded-lg shadow-xl"
                            >
                                <div>
                                    <h1 className="">Load Trainers</h1>
                                    <a href="#" className="">#</a>
                                </div>
                            </div>
                            <div
                                style={{ backgroundColor: '#ADADAD' }}
                                className="p-4 w-[175px] h-[120px] flex items-center justify-center rounded-lg shadow-xl"
                            >
                                <div>
                                    <h1 className="">MOA/MOU</h1>
                                    <a href="#" className="">#</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstaffDashboard;
