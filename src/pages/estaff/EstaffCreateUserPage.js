import React, {useEffect} from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import EstaffCreateUserForm from './EstaffCreateUserForm';

const EstaffCreateUserPage = () => {
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
      <div className="flex-1 ml-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold m-7">CREATE USER ACCOUNT</h1>
          <div className="mx-10">
            <EstaffCreateUserForm />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default EstaffCreateUserPage;