import React, { useState, useEffect } from 'react';
import Topbar from "../../components/Topbar";
import VPALASideBar from '../../components/VPALASideBar';
import { useNavigate } from 'react-router-dom';

const VPALADashboard = () => {

    const [projects, setProjects] = useState([]);
    const [statusCounts, setStatusCounts] = useState({ approved: 0, pending: 0 });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const userID = localStorage.getItem('userid');
    const navigate = useNavigate();

    const documentData = [
        { id: 1, title: "Valueno, Rabosa A.", college: "Project Proposal", date: "03/31/2019" },
        { id: 2, title: "Valueno, Rabosa A.", college: "Load Trainers", date: "04/02/2022" },
        { id: 3, title: "Valueno, Rabosa A.", college: "Project Proposal", date: "08/09/2021" },
        // Add more items if needed
      ];
    
      useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/get_project_status/${userID}/`);
                const data = await response.json();

                // Sort projects by dateCreated in descending order (latest projects first)
                const sortedProjects = data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

                setProjects(sortedProjects);

                const counts = sortedProjects.reduce((acc, project) => {
                    acc[project.status] = (acc[project.status] || 0) + 1;
                    return acc;
                }, { approved: 0, pending: 0, rejected: 0 });

                setStatusCounts(counts);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);
    
    const handleNavigate = (statusFilter) => {
        navigate(`/project-status/${statusFilter.toLowerCase()}`); // Ensure it passes in lowercase
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-vlu text-white" : "bg-gray-100"}`}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pageNumbers.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "bg-amber-400 text-white" : "bg-gray-100"}`}
                >
                    1
                </button>
            );

            if (currentPage > 3) {
                pageNumbers.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
            }

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`px-3 py-1 rounded-lg ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) {
                pageNumbers.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
            }

            pageNumbers.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                >
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="bg-gray-200 min-h-screen flex">
            <div className="w-1/5 fixed h-full">
                <VPALASideBar/>
            </div>
            <div className="flex-1 ml-[20%]">
                <Topbar />
                    <div>
                    <div className="p-8 font-sans">
      <h2 className="text-2xl mt-10 font-bold mb-6">MOA/MOU Overview</h2>

      {/* Status Cards */}
      <div className="flex gap-4 justify-center mb-8">
        <div className="flex flex-col items-center justify-center bg-yellow-500 text-white font-semibold w-60 h-40 rounded-lg">
          <h3 className="text-lg">PENDING</h3>
          <p className="text-4xl">0</p>
          {/* <a href="#" className="underline">View</a> */}
        </div>
        <div className="flex flex-col items-center justify-center bg-green-500 text-white font-semibold w-60 h-40 rounded-lg">
          <h3 className="text-lg">APPROVED</h3>
          <p className="text-4xl">2</p>
          {/* <a href="#" className="underline">View</a> */}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Documents</h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-blue-900 text-white justify-center">
              <th className="py-2 px-4 text-left">Project Title</th>
              <th className="py-2 px-2 text-center w-1/4">College</th>
              <th className="py-2 px-2 text-cente w-1/4">Date Submitted</th>
              {/* <th className="py-2 px-4 text-left">Actions</th> */}
            </tr> 
          </thead>
          <tbody>
            {currentProjects.map((doc) => (
              <tr key={doc.id} className="even:bg-gray-200">
                <td className="py-2 px-4">{doc.title}</td>
                <td className="py-2 px-4">{doc.college}</td>
                <td className="py-2 px-4">{doc.date}</td>
                {/* <td className="py-2 px-4">
                  <button className="text-blue-700 mr-4">View</button>
                  <button className="text-blue-700">Download</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  
                    </div>
            </div>

        </div>
    );

};


export default VPALADashboard;
 