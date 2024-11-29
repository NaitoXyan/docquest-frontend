import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const CoordStatusBar = () => {
  const { statusFilterParam } = useParams(); // Get status from URL parameter

  // Example mock data
  const documents = [
    {
      projectLeader: "Valdueno, Jero A.",
      projectTitle: "Tesda Vocational",
      proposedDate: "May 6, 2024, 1:30 PM",
      documentStatus: "Approved",
      officeStatus: "Submitted",
      projectId: "1021210010",
    },
    {
      projectLeader: "Doe, Jane",
      projectTitle: "Community Health Program",
      proposedDate: "May 15, 2024, 9:00 AM",
      documentStatus: "Pending",
      officeStatus: "Under Review",
      projectId: "1021210011",
    },
    {
      projectLeader: "Smith, John",
      projectTitle: "Educational Outreach",
      proposedDate: "May 20, 2024, 2:00 PM",
      documentStatus: "Disapproved",
      officeStatus: "Submitted",
      projectId: "1021210012",
    },
  ];

  // Filter documents based on the status parameter from the URL
  const filteredDocs = documents.filter(
    (doc) => doc.documentStatus.toLowerCase() === statusFilterParam.toLowerCase()
  );

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const filteredSearchDocs = filteredDocs.filter((doc) =>
    doc.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold">Projects: {statusFilterParam}</h1>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 items-center w-2/3">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 flex-grow"
          />
          <select className="border border-gray-300 rounded-lg p-2">
            <option>Search Document</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="py-4 px-6 text-left font-semibold">Project Leader</th>
              <th className="py-4 px-6 text-left font-semibold">Project Title</th>
              <th className="py-4 px-6 text-left font-semibold">Proposed Date of Implementation</th>
              <th className="py-4 px-6 text-left font-semibold">Document Status</th>
              <th className="py-4 px-6 text-left font-semibold">Office Status</th>
              <th className="py-4 px-6 text-left font-semibold">Action</th> {/* New Action Column */}
            </tr>
          </thead>
          <tbody>
            {filteredSearchDocs.map((doc, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-4 px-6">{doc.projectLeader}</td>
                <td className="py-4 px-6">{doc.projectTitle}</td>
                <td className="py-4 px-6">{doc.proposedDate}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-white ${
                      doc.documentStatus === "Approved"
                        ? "bg-green-500"
                        : doc.documentStatus === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {doc.documentStatus}
                  </span>
                </td>
                <td className="py-4 px-6">{doc.officeStatus}</td>
                <td className="py-4 px-6">
                  {/* View Button with NavLink */}
                  <NavLink
                    to={`/projectpdfviewer/${doc.projectId}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button className="px-4 py-2 border rounded-lg bg-gray-300 hover:bg-gray-400">
          1
        </button>
      </div>
    </div>
  );
};

export default CoordStatusBar;
