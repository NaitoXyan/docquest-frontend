import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Topbar from "../../components/Topbar";
import VPALASideBar from "../../components/VPALASideBar";

const VPALAMemoList = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [currentDownload, setCurrentDownload] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        projectLeader: "Project A",
        college: "College of Science",
        date: "2024-11-01",
        status: "Approved",
        downloadLink: "/files/project-a",
      },
      {
        id: 2,
        projectLeader: "Project B",
        college: "College of Engineering",
        date: "2024-11-15",
        status: "Pending",
        downloadLink: "/files/project-b",
      },
      {
        id: 3,
        projectLeader: "Project C",
        college: "College of Arts",
        date: "2024-11-20",
        status: "Rejected",
        downloadLink: "/files/project-c",
      },
    ];
    setDocuments(mockData);
  }, []);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < documents.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDocumentTypeFilter = (e) => {
    setDocumentType(e.target.value);
  };

  const openDownloadModal = (doc) => {
    setCurrentDownload(doc);
    setShowDownloadModal(true);
  };

  const handleDownload = (format) => {
    if (currentDownload) {
      const downloadLink = `${currentDownload.downloadLink}.${format.toLowerCase()}`;
      alert(`Downloading as ${format}: ${downloadLink}`);
      setShowDownloadModal(false);
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.projectLeader.toLowerCase().includes(search.toLowerCase()) &&
      (documentType === "" || doc.status === documentType)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <VPALASideBar />
      </div>
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="flex flex-col mt-14 px-10 pt-5">
        <div className="flex justify-end items-center mb-4">
            {/* <h1 className="text-2xl font-bold mt-10">MEMORANDUM LIST</h1> */}
            <div className="flex justify-between items-center mb-1">
              <input
                type="text"
                placeholder="Search by Project Title"
                className="p-2 border"
                value={search}
                onChange={handleSearch}
              />
              <select
                className="ml-3 p-2 border"
                value={documentType}
                onChange={handleDocumentTypeFilter}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-vlu text-white">
                <th className="py-2 px-4 text-left">PROJECT TITLE</th>
                <th className="py-2 px-4 text-left">COLLEGE</th>
                <th className="py-2 px-4 text-left">DATE SUBMITTED</th>
                <th className="py-2 px-4 text-center">STATUS</th>
                <th className="py-2 px-4 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((doc, index) => (
                <tr key={index} className="even:bg-gray-200">
                  <td className="py-2 px-4">{doc.projectLeader}</td>
                  <td className="py-2 px-4">{doc.college}</td>
                  <td className="py-2 px-4">{doc.date}</td>
                  <td className="py-2 px-4 text-center">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gray-200`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <NavLink
                      to={`/view/${doc.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      View Copy
                    </NavLink>
                    <button
                      onClick={() => openDownloadModal(doc)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Download
                    </button>
                    <NavLink
                      to={`/scan/${doc.id}`}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Upload Copy
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-5">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage * itemsPerPage >= filteredDocuments.length}
              className="px-4 py-2 bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <p className="mt-3">
            Page {currentPage} of {Math.ceil(filteredDocuments.length / itemsPerPage)}
          </p>
        </div>
      </div>

      {showDownloadModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Choose File Format</h2>
            <div className="flex justify-between">
              <button
                onClick={() => handleDownload("PDF")}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                PDF
              </button>
              <button
                onClick={() => handleDownload("MS Word")}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                MS Word
              </button>
            </div>
            <button
              onClick={() => setShowDownloadModal(false)}
              className="mt-4 px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VPALAMemoList;
