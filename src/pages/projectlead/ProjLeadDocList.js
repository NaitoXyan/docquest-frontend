import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

const documentsData = [
  { leader: 'Valdueno, Jero A.', title: 'Tesda Vocational', date: 'May 6, 2024 1:30pm', status: 'On Going', officeStatus: 'Submitted' },
  // Add more documents here as needed
];

const ITEMS_PER_PAGE = 5;

const ExtensionMonitoring = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Get the current documents based on the page
  const currentDocuments = documentsData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalPages = Math.ceil(documentsData.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <Sidebar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <h1 className="text-2xl font-semibold m-7 mt-20">Extension Monitoring</h1>

        <div className="bg-white shadow-lg rounded-lg m-7 p-5">
          <table className="w-full text-left border-separate">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3">Project Leader</th>
                <th className="p-3">Project Title</th>
                <th className="p-3">Proposed Date of Implementation</th>
                <th className="p-3">Document Status</th>
                <th className="p-3">Office Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((doc, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="p-3">{doc.leader}</td>
                  <td className="p-3">{doc.title}</td>
                  <td className="p-3">{doc.date}</td>
                  <td className="p-3">
                    <span className="bg-yellow-500 text-white p-1 rounded">{doc.status}</span>
                  </td>
                  <td className="p-3">{doc.officeStatus}</td>
                  <td className="p-3">
                    <button className="text-blue-500">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-5">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">
              Previous
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 mx-1 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionMonitoring;
