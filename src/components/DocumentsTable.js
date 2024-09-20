import React from 'react';
import SearchBar from './SearchBar';

function DocumentsTable() {
  return (
    <div className="mx-7 bg-white rounded-lg shadow-lg p-6">
      <SearchBar />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm leading-4">Project Leader</th>
              <th className="px-6 py-3 text-left text-sm leading-4">Document Type</th>
              <th className="px-6 py-3 text-left text-sm leading-4">Date</th>
              <th className="px-6 py-3 text-left text-sm leading-4">Download</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">John Doe</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">johndoe@example.com</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm">Manager</td>
              <td className="px-6 py-4 border-b border-gray-200 text-sm flex justify-end items-center space-x-2">
                <a href="#" className="flex items-center text-blue-900 hover:text-blue-900">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M9 2a1 1 0 0 1 1 1v8.586l1.707-1.707a1 1 0 1 1 1.414 1.414l-3.414 3.414a1 1 0 0 1-1.414 0L6.293 10.293a1 1 0 0 1 1.414-1.414L9 11.586V3a1 1 0 0 1 1-1z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M4 14a2 2 0 0 1 2-2h8a2 2 0 1 1 0 4H6a2 2 0 0 1-2-2z" clipRule="evenodd" />
                  </svg>
                  Download
                </a>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentsTable;
