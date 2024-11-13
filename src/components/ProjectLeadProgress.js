import React from "react";

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
            {/* Sidebar with project tracker */}
            <div className="fixed top-0 right-0 w-80 p-6 bg-white shadow-lg rounded-lg mt-14 mr-6">
                <h2 className="text-3xl font-semibold mb-5 text-gray-800">Project Status Tracker</h2>

                {projectStatus.map((project) => (
                    <div key={project.projectId} className="bg-white shadow-lg rounded-lg p-6 mb-10">
                        <h3 className="text-lg font-semibold mb-3">{project.projectName}</h3>

                        <div className="relative">
                            {/* Render status for each role with connecting circles */}
                            {project.status.map((entry, index) => (
                                <div key={index} className="flex items-center mb-6">
                                    {/* Circle indicating status */}
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                                            entry.approved ? "border-green-500 bg-green-200" : "border-gray-400 bg-gray-200"
                                        }`}>
                                        {entry.approved ? (
                                            <span className="text-green-500 font-bold text-lg">✔</span>
                                        ) : (
                                            <span className="text-gray-500 font-bold text-lg">!</span>
                                        )}
                                    </div>

                                    {/* Status text and date */}
                                    <div className="ml-6">
                                        <p className={`font-semibold ${entry.approved ? "text-green-500" : "text-gray-600"}`}>{entry.role}</p>
                                        <p className="text-sm">{entry.status} - {entry.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjLeadProgress;
