import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Topbar from "../../components/Topbar";
import ProjLeadSidebar from "../../components/ProjLeadSideBar";
import Sidebar from '../../components/Sidebar';

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
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <ProjLeadSidebar />
      </div>
      <div className="flex-1 ml-[20%]">
          <Topbar/>
        <div className="flex flex-col mt-8 px-4 md:px-10">
          <div style={{ marginBottom: '20px', marginTop: '50px', textAlign: 'right' }}>
          <h2 className="mt-[1%] text-start text-2xl font-bold">MEMORANDUM LIST</h2>
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
              <tr className="w-full text-black p-5">
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    width: '18%', 
                    textAlign: 'left', 
                    borderRadius: '5px 0 0 0'
                  }}>
                  Project Leader
                </th>
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    textAlign: 'center'
                  }}>
                  Project Title
                </th>
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    width: '15%', 
                    textAlign: 'center'
                  }}>
                  Date Submitted
                </th>
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    width: '10%', 
                    textAlign: 'center'
                  }}>
                  MOA Status
                </th>
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    width: '10%', 
                    textAlign: 'center'
                  }}>
                  View Document
                </th>
                <th className="text-white text-sm" style={{
                    backgroundColor: '#1a1851', 
                    border: '1px solid #ddd', 
                    padding: '10px', 
                    width: '10%', 
                    textAlign: 'center', 
                    borderRadius: '0 5px 0 0'
                  }}>
                  Edit MOA
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredMoas.length > 0 ? (
                filteredMoas.map((moa, index) => (
                  <tr key={index} style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd'}}>
                    <td style={{
                        border: '1px solid #ddd', 
                        padding: '15px', 
                        textAlign: 'left', 
                        borderRadius: '5px 0 0 0',
                         marginLeft: '10px'
                      }}>
                      {`${moa.moaUser.firstname} ${moa.moaUser.lastname}`}
                    </td>
                    <td style={{
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        textAlign: 'left',
                        marginLeft: '2px'
                      }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {moa.projectTitles.map((project, index) => (
                          <div key={index} style={{
                              padding: '10px', 
                            }}>
                            {project.projectTitle}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        textAlign: 'center'
                      }}>
                      {new Date(moa.dateCreated).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false, 
                      })}
                    </td>
                    <td style={{
                      border: '1px solid #ddd', 
                      padding: '10px', 
                      textAlign: 'center', 
                      backgroundColor: moa.status === 'Pending' ? '#FFA500' : moa.status === 'Approved' ? '#4CAF50' : moa.status === 'Rejected' ? '#F44336' : ''
                    }}>
                      {moa.status}
                    </td>
                    <td style={{
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        textAlign: 'center'
                      }}>
                      <button onClick={() => handleViewPDF(moa.moaID)} 
                              style={{
                                backgroundColor: '#4CAF50', 
                                color: 'white', 
                                padding: '2px 16px', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
                        View PDF
                      </button>
                    </td>
                    <td style={{
                        border: '1px solid #ddd', 
                        padding: '10px', 
                        textAlign: 'center'
                      }}>
                      <button onClick={() => handleEditMoa(moa.moaID)} 
                              style={{
                                backgroundColor: '#FF9800', 
                                color: 'white', 
                                padding: '2px 16px', 
                                border: 'none', 
                                borderRadius: '5px', 
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = '#fb8c00'}
                              onMouseOut={(e) => e.target.style.backgroundColor = '#FF9800'}>
                        Edit MOA
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{
                      textAlign: 'center', 
                      padding: '10px', 
                      fontStyle: 'italic', 
                      color: '#999'
                    }}>
                    No MOAs available
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

export default ProjLeadMoaStatus;
