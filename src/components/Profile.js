import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [avatar, setAvatar] = useState(user.avatar || 'https://via.placeholder.com/150');
  const [userInfo, setUserInfo] = useState({ ...user });
  const [isEditing, setIsEditing] = useState(false);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col mx-10 mb-7 bg-white rounded-xl p-16 h-fit">
      <div className="flex justify-center mb-8">
        <div className="relative group">
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleAvatarUpload}
            disabled={!isEditing}
          />
          <img
            src={avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-400 group-hover:opacity-80"
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
              Click to change
            </div>
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
              value={userInfo.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={userInfo.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Birthdate</label>
            <input
              type="date"
              name="birthdate"
              value={userInfo.birthdate}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Office</label>
            <input
              type="text"
              name="office"
              value={userInfo.office}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
          <div>
            <label className="font-semibold text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={userInfo.role}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded ${isEditing ? 'bg-white' : 'bg-gray-200'}`}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleEditMode}
            className="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-300"
          >
            {isEditing ? 'Save Changes' : 'Edit Account'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
