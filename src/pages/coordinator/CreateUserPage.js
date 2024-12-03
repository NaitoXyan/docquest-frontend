import React, {useEffect} from 'react';
import { Toaster } from 'react-hot-toast';
import CreateUserForm from '../../components/CreateUser/CreateUserForm';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
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
      <div className="w-1/5 fixed h-full" />
      <div className="flex-1 ml-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold m-7">CREATE USER ACCOUNT</h1>
          <div className="mx-10">
            <CreateUserForm />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default CreateUserPage;