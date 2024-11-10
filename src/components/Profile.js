import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  // State to hold user details
  const [user, setUser] = useState(null);

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    middlename: '',
    lastname: '',
    campus: '',
    college: '',
    department: '',
    contactNumber: '',
    password: '', // For updating password
  });

  // Get token and userID from localStorage
  const token = localStorage.getItem('token');
  const userID = localStorage.getItem('userid');

  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to login if no token found
      navigate('/login');
      return;
    }

    if (!userID) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }
    console.log(userID);
    // Fetch user details
    axios.get('https://docquest-production.up.railway.app/get_user_details', {
      headers: {
        'Authorization': `Token ${token}`,
      }
    })
    .then(response => {
      setUser(response.data);
      setFormData({
        email: response.data.email || '',
        firstname: response.data.firstname || '',
        middlename: response.data.middlename || '',
        lastname: response.data.lastname || '',
        campus: response.data.campus || '',
        college: response.data.college || '',
        department: response.data.department || '',
        contactNumber: response.data.contactNumber || '',
        password: '', // Password should not be pre-filled
      });
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
      // Handle error (e.g., redirect to login if unauthorized)
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please log in again.');
        navigate('/login');
      } else {
        alert('Failed to fetch user details.');
      }
    });
  }, [token, userID, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
    if (isEditing && user) {
      // If cancelling edit, reset form data to original user data
      setFormData({
        email: user.email || '',
        firstname: user.firstname || '',
        middlename: user.middlename || '',
        lastname: user.lastname || '',
        campus: user.campus || '',
        college: user.college || '',
        department: user.department || '',
        contactNumber: user.contactNumber || '',
        password: '',
      });
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    if (!userID) {
      alert('User ID not found.');
      return;
    }

    // Prepare the payload
    const payload = {
      email: formData.email,
      firstname: formData.firstname,
      middlename: formData.middlename,
      lastname: formData.lastname,
      campus: formData.campus,
      college: formData.college,
      department: formData.department,
      contactNumber: formData.contactNumber,
    };

    // If password is provided, include it
    if (formData.password) {
      payload.password = formData.password;
    }

    axios.patch(`https://docquest-production.up.railway.app/edit_user_details/${userID}/`, payload, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      setUser(response.data);
      setIsEditing(false);
      // Optionally, update localStorage if necessary
      localStorage.setItem('firstname', JSON.stringify(response.data.firstname));
      localStorage.setItem('middlename', JSON.stringify(response.data.middlename));
      localStorage.setItem('lastname', JSON.stringify(response.data.lastname));
      localStorage.setItem('campus', JSON.stringify(response.data.campus));
      localStorage.setItem('college', JSON.stringify(response.data.college));
      localStorage.setItem('department', JSON.stringify(response.data.department));
      localStorage.setItem('contactNumber', JSON.stringify(response.data.contactNumber));
      // Roles are not updated here
      alert('Profile updated successfully!');
    })
    .catch(error => {
      console.error('Error updating user details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);

        // Display specific error messages
        if (error.response.data) {
          const errorMessages = [];

          for (const key in error.response.data) {
            if (Array.isArray(error.response.data[key])) {
              error.response.data[key].forEach(msg => {
                errorMessages.push(`${key}: ${msg}`);
              });
            } else {
              errorMessages.push(`${key}: ${error.response.data[key]}`);
            }
          }

          alert(`Failed to update profile:\n${errorMessages.join('\n')}`);
        } else {
          alert('Failed to update profile. Please try again.');
        }
      } else if (error.request) {
        console.error('Request data:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Error message:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-16 h-fit">
      <h2 className="text-2xl font-bold mb-6 text-center"></h2>
      <form className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">

          {/* First Name */}
          <div>
            <label className="font-semibold text-gray-700">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
          
          {/* Contact Number */}
          <div>
            <label className="font-semibold text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="font-semibold text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

          {/* Campus */}
          <div>
            <label className="font-semibold text-gray-700">Campus</label>
            <input
              type="text"
              name="campus"
              value={formData.campus}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

           {/* Middle Name */}
           <div>
            <label className="font-semibold text-gray-700">Middle Name</label>
            <input
              type="text"
              name="middlename"
              value={formData.middlename}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

          {/* College */}
          <div>
            <label className="font-semibold text-gray-700">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>

          {/* Department */}
          <div>
            <label className="font-semibold text-gray-700">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>

        {/* Password (for updating) */}
        {isEditing && (
          <div>
            <label className="font-semibold text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter new password"
              className="w-full p-2 border rounded bg-white"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={toggleEditMode}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={toggleEditMode}
              className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
