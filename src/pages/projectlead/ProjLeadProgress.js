import React from "react";
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";

const ProjLeadProgress = () => {
    // Mock project status data
    const projectStatus = [
        {
            projectId: "101",
            projectName: "AI Research Project",
            status: [
                { role: "Project Leader", status: "Created", date: "2024-09-01", approved: true },
                { role: "President", status: "Approved", date: "2024-09-05", approved: true },
                { role: "Vice President", status: "In Review", date: "2024-09-06", approved: false },
                { role: "VCAAA", status: "Pending", date: "2024-09-08", approved: false },
                { role: "Coordinator", status: "Pending", date: "2024-09-10", approved: false }
            ]
        },
    ];

    return (
        <div className="bg-gray-200 min-h-screen flex">
            {/* Sidebar with fixed width */}
            <div className="w-1/5 fixed h-full">
                <ProjLeadSidebar />
            </div>
            {/* Main content area */}
            <div className="flex-1 ml-[20%]"> {/* 20% left margin to match Sidebar width */}
                <Topbar />
                {/* Project Status Tracker */}
                <div className="flex flex-col mt-14 px-10">
                    <h2 className="text-3xl font-semibold mb-5 text-gray-800">Project Status Tracker</h2>
                    {projectStatus.map((project) => (
                        <div key={project.projectId} className="bg-white shadow-lg rounded-lg p-6 mb-10">
                            <h3 className="text-lg font-semibold mb-3">{project.projectName}</h3>
                            {/* Render status for each role with line connectors */}
                            <div className="flex items-center justify-between">
                                {project.status.map((entry, index) => (
                                    <div key={index} className="relative flex flex-col items-center">
                                        {/* Status Indicator */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 ${
                                                    entry.approved ? "border-green-500 bg-white" : "border-yellow-500 bg-gray-200"
                                                }`}>
                                                {entry.approved ? (
                                                    <span className="text-green-500 font-bold">✔</span>
                                                ) : (
                                                    <span className="text-yellow-500 font-bold">!</span>
                                                )}
                                            </div>
                                            {/* Role Name */}
                                            <span className={`mt-2 font-semibold ${entry.approved ? "text-green-500" : "text-yellow-500"}`}>
                                                {entry.role}
                                            </span>
                                            {/* Status and Date */}
                                            <span className={`text-sm ${entry.approved ? "text-gray-600" : "text-gray-400"}`}>
                                                {entry.status} - {entry.date}
                                            </span>
                                        </div>
                                        {/* Horizontal line connector */}
                                        {index < project.status.length - 1 && (
                                            <div className={`w-20 h-1 ${entry.approved ? "bg-green-500" : "bg-gray-300"}`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProjLeadProgress;
