import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const storedFirstname = JSON.parse(localStorage.getItem('firstname'));
  const storedLastname = JSON.parse(localStorage.getItem('lastname'));
  const username = storedFirstname + " " + storedLastname;
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();


  // Fetch data with GET request
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_project_status/${userID}/`)
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userID]);

  // Handler for viewing PDF
  const handleViewPDF = (projectID) => {
    console.log('this is projectID: ', projectID)
    navigate(`/pdf-viewer/${projectID}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Project List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Leader</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Proposed Date of Implementation</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Document Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>View Document</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {`${project.projectUser.firstname} ${project.projectUser.lastname}`}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{project.projectTitle}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {new Date(project.dateCreated).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, // Set to true for 12-hour format
                    })}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {project.status}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {/* view document button */}
                    <button onClick={() => handleViewPDF(project.projectID)}>
                    View PDF
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;