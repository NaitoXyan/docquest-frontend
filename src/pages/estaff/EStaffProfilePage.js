import React from 'react';
import EstaffSideBar from '../../components/EstaffSideBar';
import Topbar from '../../components/Topbar';
import Profile from '../../components/Profile';

const EStaffProfilePage = () => {
  const eStaff = {
    name: 'Extension Office Staff',
    gender: 'Female',
    birthdate: '1985-10-10',
    email: 'admin@example.com',
    password: 'adminPass',
    office: 'Headquarters',
    role: 'Administrator',
    avatar: 'https://via.placeholder.com/150',
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <EstaffSideBar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <h1 className="text-2xl font-semibold m-7 mt-20">User Profile</h1>
        <Profile user={eStaff} isEditable={true} />
      </div>
    </div>
  );
};

export default EStaffProfilePage;
