import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px' }}>
      <h2>Approved Projects</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={styles.th}>Project Title</th>
            <th style={styles.th}>Date Submitted</th>
            <th style={styles.th}>Document Status</th>
            <th style={styles.th}>Create MOA</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={index} style={styles.tr}>
                <td style={styles.td}>{project.projectTitle}</td>
                <td style={styles.td}>
                  {new Date(project.dateCreated).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false, // 24-hour format
                  })}
                </td>
                <td style={styles.td}>{project.status}</td>
                <td style={styles.td}>
                  <button 
                    onClick={() => handleCreateMOA(project.projectID)}
                    style={styles.button}
                  >
                    Create MOA
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '8px' }}>
                No approved projects available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Define common styles
const styles = {
  th: {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
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
