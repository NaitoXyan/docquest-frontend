import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EstaffSideBar from '../../components/EstaffSideBar';
import Topbar from '../../components/Topbar';
import { useNavigate, useParams } from 'react-router-dom';

const EstaffScancopy = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { content_type_name, source_id } = useParams();

  useEffect(() => {
    if (!token) {
      localStorage.clear();
      navigate('/login', { replace: true });
      return;
    }
  }, [token, navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    // Validate content_type_name and source_id
    if (!content_type_name || !source_id) {
      setMessage('Content type or source ID is missing.');
      return;
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (!allowedTypes.includes(file.type)) {
      setMessage('Only PDF and DOCX files are allowed.');
      return;
    }

    setIsUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('content_type_name', content_type_name);
    formData.append('source_id', source_id);

    try {
      const response = await axios.post('https://web-production-4b16.up.railway.app/upload-document/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        }
      });

      setMessage(`File "${file.name}" uploaded successfully. Document ID: ${response.data.document_id}`);
      setFile(null);
      document.getElementById('file-upload').value = ''; // Clear file input
    } catch (error) {
      const errorMessage = error.response?.data?.details || 'Upload failed. Please try again.';
      setMessage(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-1/5 fixed h-full bg-white shadow-md">
        <EstaffSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[20%]">
        <Topbar />
        <div className="m-8 mt-16">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Upload Copy
          </h1>
          <p className="text-gray-600 mb-6">
            Use this page to upload scanned documents related to project proposals or agreements. Only PDF and DOCX files are allowed.
          </p>

          <div className="bg-white shadow rounded-lg p-6">
            {/* File Input */}
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select a file to upload:
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf, .docx"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className={`w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>

            {/* Message Display */}
            {message && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  message.includes('successfully')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstaffScancopy;