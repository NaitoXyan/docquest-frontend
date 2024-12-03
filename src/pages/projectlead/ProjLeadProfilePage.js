import React, {useEffect} from 'react';
import ProjLeadSideBar from '../../components/ProjLeadSideBar';
import Topbar from '../../components/Topbar';
import Profile from '../../components/Profile';
import { useNavigate } from 'react-router-dom';

const AdminProfilePage = () => {
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

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (!token) {
        localStorage.clear();
        navigate('/login', { replace: true });
        return;
    }
  }, [token]);

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full">
        <ProjLeadSideBar />
      </div>

      <div className="flex-1 ml-[20%]">
        <Topbar />
        <h1 className="text-2xl font-semibold m-7 mt-20">User Profile</h1>
        <Profile />
      </div>
    </div>
  );
};

export default AdminProfilePage;
