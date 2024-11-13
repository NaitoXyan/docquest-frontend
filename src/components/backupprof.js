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
    avatar: '',
    name: '',
    gender: '',
    birthdate: '',
    email: '',
    password: '',
    office: '',
  });

  // State for avatar preview
  const [avatarPreview, setAvatarPreview] = useState('');

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Navigation hook
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    if (!token) {
      // Redirect to login if no token found
      navigate('/login');
      return;
    }

    // Fetch user details
    axios
      .get('https://docquest-production.up.railway.app/get_user_details', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setFormData({
          avatar: response.data.avatar || '',
          name: response.data.name || '',
          gender: response.data.gender || '',
          birthdate: response.data.birthdate || '',
          email: response.data.email || '',
          password: '', // Password should not be pre-filled
          office: response.data.office || '',
        });
        setAvatarPreview(response.data.avatar || 'https://via.placeholder.com/150');
        // Optionally, store user ID if needed for updates
        localStorage.setItem('user_id', response.data.id); // Assuming 'id' is the primary key
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        // Handle error (e.g., redirect to login if unauthorized)
        if (error.response && error.response.status === 401) {
          // Token might be invalid or expired
          navigate('/login');
        }
      });
  }, [token, navigate]);

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the image to base64 or handle as per your backend requirements
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
    // If cancelling edit, reset form data to original user data
    if (isEditing && user) {
      setFormData({
        avatar: user.avatar || '',
        name: user.name || '',
        gender: user.gender || '',
        birthdate: user.birthdate || '',
        email: user.email || '',
        password: '',
        office: user.office || '',
      });
      setAvatarPreview(user.avatar || 'https://via.placeholder.com/150');
    }
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Get user ID from localStorage
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    // Prepare the payload
    const payload = {
      ...formData,
    };

    // If password is empty, remove it from payload
    if (!payload.password) {
      delete payload.password;
    }

    // If avatar is a file, handle it accordingly (e.g., using FormData)
    // Here, assuming avatar is a base64 string or URL
    // Adjust as per your backend's requirements

    axios
      .put(`https://docquest-production.up.railway.app/edit_user_details/${userId}/`, payload, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
        // Update localStorage if necessary
        localStorage.setItem('firstname', JSON.stringify(response.data.firstname));
        localStorage.setItem('lastname', JSON.stringify(response.data.lastname));
        // Update other fields as needed
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        // Handle specific error messages
        if (error.response) {
          if (error.response.status === 400) {
            alert('Invalid data. Please check your inputs.');
          } else if (error.response.status === 401) {
            alert('Unauthorized. Please log in again.');
            navigate('/login');
          } else {
            alert('Failed to update profile. Please try again.');
          }
        } else {
          alert('Network error. Please check your connection.');
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
      <div className="flex justify-center mb-8">
        <div className="relative group">
          {isEditing ? (
            <>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleAvatarUpload}
              />
              <img
                src={avatarPreview}
                alt="User Avatar"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-400 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                Click to change
              </div>
            </>
          ) : (
            <img
              src={avatarPreview}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-400"
            />
          )}
        </div>
      </div>

      <form className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
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
          {isEditing && (
            <div>
              <label className="font-semibold text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className={`w-full p-2 border rounded ${
                  isEditing ? 'bg-white' : 'bg-gray-200'
                }`}
              />
            </div>
          )}
          <div>
            <label className="font-semibold text-gray-700">Office</label>
            <input
              type="text"
              name="office"
              value={formData.office}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${
                isEditing ? 'bg-white' : 'bg-gray-200'
              }`}
            />
          </div>
        </div>

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
