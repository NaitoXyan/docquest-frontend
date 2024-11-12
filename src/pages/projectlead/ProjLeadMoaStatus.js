import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProjLeadMoaStatus = () => {
  const [moas, setMoas] = useState([]);
  const userID = localStorage.getItem('userid');
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('');
  const { statusFilterParam } = useParams();

  // Fetch MOA data with GET request
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/get_moa_status/${userID}/`)
      .then(response => {
        setMoas(response.data);
        console.log(response.data);
        console.log(statusFilterParam);
      })
      .catch(error => {
        console.error('Error fetching MOA data:', error);
      });
  }, [userID]);

  useEffect(() => {
    if (statusFilterParam) {
      console.log(statusFilterParam);
      setStatusFilter(statusFilterParam.toLowerCase());
    }
  }, [statusFilterParam]);

  // Handler for viewing PDF
  const handleViewPDF = (moaID) => {
    console.log('MOA ID:', moaID);
    navigate(`/moa-pdf-viewer/${moaID}`);
  };

  // Handler for editing MOA
  const handleEditMoa = (moaID) => {
    console.log('Editing MOA ID:', moaID);
    navigate(`/edit-moa/${moaID}`);
  };

  // Handler for status filter change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Filter MOAs based on status
  const filteredMoas = statusFilter
    ? moas.filter(moa => moa.status.toLowerCase() === statusFilter.toLowerCase())
    : moas;

  return (
    <div style={{ padding: '20px' }}>
      <h2>MOA List</h2>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="statusFilter" style={{ marginRight: '10px' }}>Filter by Status:</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          <option value="">All</option>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Leader</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Project Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date Submitted</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>MOA Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>View Document</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Edit MOA</th>
          </tr>
        </thead>
        <tbody>
          {filteredMoas.length > 0 ? (
            filteredMoas.map((moa, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {`${moa.moaUser.firstname} ${moa.moaUser.lastname}`}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {moa.projectTitles.map((project, index) => (
                        <div
                            key={index}
                            style={{
                            border: '1px solid #ccc',
                            padding: '8px',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            }}
                        >
                            {project.projectTitle}
                        </div>
                        ))}
                    </div>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(moa.dateCreated).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false, // Set to true for 12-hour format
                  })}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {moa.status}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* View document button */}
                  <button onClick={() => handleViewPDF(moa.moaID)}>
                    View PDF
                  </button>
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* Edit project button */}
                  <button onClick={() => handleEditMoa(moa.moaID)}>
                    Edit MOA
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '8px' }}>No MOAs available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjLeadMoaStatus;
