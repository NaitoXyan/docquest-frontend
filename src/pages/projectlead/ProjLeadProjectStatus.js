import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProjLeadProjectStatus = () => {
  const [projects, setProjects] = useState([]);
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const { statusFilterParam } = useParams();

  // Fetch data with GET request
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_project_status/${userID}/`)
      .then(response => {
        setProjects(response.data);
        console.log(statusFilterParam)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [userID]);

  useEffect(() => {
    if (statusFilterParam) {
      console.log(statusFilterParam)
      setStatusFilter(statusFilterParam.toLowerCase());
    }
  }, [statusFilterParam]);

  // Handler for viewing PDF
  const handleViewPDF = (projectID) => {
    console.log('this is projectID: ', projectID)
    navigate(`/pdf-viewer/${projectID}`);
  };

  // Handler for editing project
  const handleEditProject = (projectID) => {
    console.log('Editing project ID:', projectID);
    navigate(`/edit-project/${projectID}`);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  }

  const filteredProjects = statusFilter
    ? projects.filter(project => project.status.toLowerCase() === statusFilter.toLocaleLowerCase())
    : projects;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Project List</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="statusFilter" style={{ marginRight: '10px' }}>Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Leader</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Proposed Date of Implementation</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Document Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>View Document</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Edit Project</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
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
                  {/* View document button */}
                  <button onClick={() => handleViewPDF(project.projectID)}>
                    View PDF
                  </button>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* Edit project button */}
                  <button onClick={() => handleEditProject(project.projectID)}>
                    Edit Project
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '8px' }}>No projects available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjLeadProjectStatus;