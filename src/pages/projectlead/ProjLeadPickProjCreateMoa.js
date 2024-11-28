import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";

const PickProjCreateMoa = () => {
  const [projects, setProjects] = useState([]);
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();

  // Fetch data with GET request
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_project_status/${userID}/`)
      .then(response => {
        // Filter projects with status 'approved' (case-insensitive)
        const approvedProjects = response.data.filter(project => 
          project.status.toLowerCase() === 'approved'
        );
        setProjects(approvedProjects);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userID]);

  // Handler for creating MOA
  const handleCreateMOA = (projectID) => {
    console.log('Creating MOA for project ID:', projectID);
    navigate(`/create_moa/${projectID}`);
    // Alternatively, if you prefer to pass state:
    // navigate('/create_moa', { state: { projectID } });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
                <ProjLeadSidebar />
      </div>
      <h2 style={{ marginTop: '20px' }}>Approved Projects</h2>
      <div className="flex-1 ml-[10%]">
         <Topbar />
         
        <div className="flex flex-col mt-16 px-10">
        <div className="p-1 mt-4 ml-5 font-bold text-lg text-black-500">APPROVED PROJECTS</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
          <thead>
            <tr className="text-white">
              <th style={{ backgroundColor: '#1a1851', border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '50%' }}>
                Project Title
              </th>
              <th style={{ backgroundColor: '#1a1851', border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '20%' }}>
                Date Submitted
              </th>
              <th style={{ backgroundColor: '#1a1851', border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '15%' }}>
                Document Status
              </th>
              <th style={{ backgroundColor: '#1a1851', border: '1px solid #ddd', padding: '8px', textAlign: 'center', fontWeight: 'bold', width: '10%' }}>
                Create MOA
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', marginLeft:'3' }}>{project.projectTitle}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    {new Date(project.dateCreated).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false, // 24-hour format
                    })}
                  </td>
                  <td style={{ 
                      border: '1px solid #ddd', 
                      padding: '8px', 
                      textAlign: 'center' 
                  }}>
                      <span style={{ 
                          display: 'inline-block', 
                          padding: '5px 10px', 
                          borderRadius: '15px', 
                          backgroundColor: '#e0f7e9', /* Light green background */
                          color: 'green' /* Green text */,
                      }}>
                          {project.status}
                      </span>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                    <button
                      onClick={() => handleCreateMOA(project.projectID)}
                      style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Create MOA
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '8px', border: '1px solid #ddd' }}>
                  No approved projects available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        </div>
      </div>
    </div>
  );
};

// Define common styles
const styles = {
  th: {
    border: '2px solid #ddd',
    padding: '12px',
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontSize: '13px', 
    color: '#333', 
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    marginLeft: '1%',
  },
  tr: {
    // Optional: Add hover effect
    ':hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default PickProjCreateMoa;
