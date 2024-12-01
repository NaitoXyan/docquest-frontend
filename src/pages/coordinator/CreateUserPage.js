import React from 'react';
import { Toaster } from 'react-hot-toast';
import CreateUserForm from '../../components/CreateUser/CreateUserForm';

const CreateUserPage = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex">
      <div className="w-1/5 fixed h-full" />
      <div className="flex-1 ml-0">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold m-7">Create User Account</h1>
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