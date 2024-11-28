import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import Topbar from "../../components/Topbar";
import VPALASideBar from "../../components/VPALASideBar";

const VPALAMemoList = () => {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [documentType, setDocumentType] = useState("");
  const itemsPerPage = 5;

  // Mock data for documents
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        projectLeader: "Project A",
        college: "College of Science",
        date: "2024-11-01",
        status: "Approved",
        downloadLink: "/files/project-a.pdf", // Mock download link
      },
      {
        id: 2,
        projectLeader: "Project B",
        college: "College of Engineering",
        date: "2024-11-15",
        status: "Pending",
        downloadLink: "/files/project-b.pdf",
      },
      {
        id: 3,
        projectLeader: "Project C",
        college: "College of Arts",
        date: "2024-11-20",
        status: "Rejected",
        downloadLink: "/files/project-c.pdf",
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

  // Filter and paginate documents
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
          <div className="flex justify-between mb-5">
            <h1 className="text-2xl font-bold">MEMORANDUM LIST</h1>
            <div className="flex">
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
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        doc.status === 'Pending'
                          ? 'bg-orange-100 text-orange-500'
                          : doc.status === 'Approved'
                          ? 'bg-green-100 text-green-500'
                          : doc.status === 'Rejected'
                          ? 'bg-red-100 text-red-500'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <a
                      href={doc.downloadLink}
                      download
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Download
                    </a>
                    <NavLink
                      to={`/scan/${doc.id}`} // Navigates to a scan page with the document ID
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Scan Copy
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
    </div>
  );
};

export default VPALAMemoList;
