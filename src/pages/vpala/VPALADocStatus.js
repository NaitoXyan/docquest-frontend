import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom"; // Import NavLink
import VPALASideBar from "../../components/VPALASideBar";
import Topbar from "../../components/Topbar";

// Sample data for the table (replace this with dynamic data if needed)
const initialDocs = [
  {
    id: 1,
    projectTitle: "Project ABC",
    college: "College of Engineering",
    dateSubmitted: "2024-10-01",
    status: "approved",
  },
  {
    id: 2,
    projectTitle: "Project XYZ",
    college: "College of Arts",
    dateSubmitted: "2024-11-10",
    status: "pending",
  },
  {
    id: 3,
    projectTitle: "Project DEF",
    college: "College of Science",
    dateSubmitted: "2024-11-05",
    status: "rejected",
  },
];

const VPALADocStatus = () => {
  const navigate = useNavigate(); // Set up navigation
  const { statusFilter } = useParams(); // Access status filter from URL
  const [documents, setDocuments] = useState(initialDocs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentDocId, setCurrentDocId] = useState(null); // Store current document ID
  const [downloadFormat, setDownloadFormat] = useState(""); // State for the chosen download format

  // Filter documents based on the search term and selected status
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle download button click, open the format selection modal
  const handleDownloadClick = (docId) => {
    setCurrentDocId(docId); // Set the current document ID
    setShowModal(true); // Show the modal to select the format
  };

  // Handle format selection
  const handleFormatSelection = (format) => {
    setDownloadFormat(format);
    alert(`Downloading ${documents.find((doc) => doc.id === currentDocId).projectTitle} as ${format.toUpperCase()}...`);
    setShowModal(false); // Close the modal after selection
  };

  // Update the status filter in the URL when the user selects a new status
  const handleStatusChange = (e) => {
    navigate(`/documents/${e.target.value}`); // Navigate to the new filtered URL
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <VPALASideBar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-10 p-4">
        <h1 className="text-2xl font-bold m">DOCUMENTS LIST</h1>
          <div className="flex justify-end items-center mb-4">
            <input
              type="text"
              placeholder="Search by project title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border mr-3"
            />
            <select
              value={statusFilter || "all"}
              onChange={handleStatusChange}
              className="p-2 border"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead className="bg-vlu text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-medium">Project Title</th>
                  <th className="py-4 px-6 text-left font-medium">College</th>
                  <th className="py-4 px-6 text-left font-medium">Date Submitted</th>
                  <th className="py-4 px-6 text-left font-medium">Status</th>
                  <th className="py-4 px-6 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc, index) => (
                  <tr key={doc.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="py-4 px-6">{doc.projectTitle}</td>
                    <td className="py-4 px-6">{doc.college}</td>
                    <td className="py-4 px-6">{doc.dateSubmitted}</td>
                    <td className="py-4 px-6">{doc.status}</td>
                    <td className="py-4 px-6 flex items-center space-x-4">
                      {/* Replace button with NavLink */}
                      <NavLink
                        to={`/document/${doc.id}`} // Navigate to document details page
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </NavLink>
                      <button
                        className="text-green-600 hover:text-green-800 font-medium"
                        onClick={() => handleDownloadClick(doc.id)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for format selection */}
          {showModal && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Select Download Format</h2>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleFormatSelection("word")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    MS Word
                  </button>
                  <button
                    onClick={() => handleFormatSelection("pdf")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    PDF
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VPALADocStatus;
