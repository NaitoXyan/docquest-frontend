import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

const EstaffViewDocument = () => {
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
                    <h1 className="text-2xl font-semibold m-7">View Document</h1>
                    <div className="flex flex-row mx-10 mb-7 bg-white rounded-xl p-16 h-fit items-start">
                        <div className="flex-1 mx-5 rounded-xl p-16 h-[500px] border-2 border-gray-500 items-center">Document Copy
                        </div>
                        <div className="flex-2 mx-5 rounded-xl p-16 h-fit flex flex-col items-center">
                            <div>
                                <h1>Project Leader</h1>
                                <a>(leader's name)</a>
                            </div>
                            <div  className="mt-10">
                                <h1>Document Type</h1>
                                <a>(type's name)</a>
                            </div>
                            <div  className="mt-10"></div>
                                <h1>Date</h1>
                                <a>(document's date)</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EstaffViewDocument;