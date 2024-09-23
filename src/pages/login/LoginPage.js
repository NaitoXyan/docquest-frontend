import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [roles, setRoles] = useState([]);

  const navigate =  useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post the credentials to log in
    axios({
      method: 'post',
      url: 'https://docquest-production.up.railway.app/auth/token/login/',
      data: {
        email: email,
        password: password,
      }
    })
    .then(function (response) {
      // Extract the token from the response
      const token = response.data.auth_token;

      // Use the token to make the second request
      return axios({
        method: 'get',
        url: 'https://docquest-production.up.railway.app/name_and_roles',
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
    })
    .then(function (response) {
      // Extract firstname, lastname, and roles from the response
      const { firstname, lastname, roles } = response.data;

      // Set the state for firstname, lastname, and roles
      setFirstname(firstname);
      setLastname(lastname);

      // Extract roles into a list of strings
      const rolesList = roles.map(roleObj => roleObj.role);
      setRoles(rolesList);
      console.log("State updated with user data:", { firstname, lastname, rolesList });

      if (rolesList.includes('regular')) {
        navigate('/user');
      } else if (
        rolesList.includes('program chair') | 
        rolesList.includes('college dean') |
        rolesList.includes('ECR director') |
        rolesList.includes('VCAA') |
        rolesList.includes('VCRI') |
        rolesList.includes('accountant') |
        rolesList.includes('chancellor')
      ) {
        navigate('/signatory');
      }
    })
    .catch(function (error) {
      // Handle any errors from both requests
      console.log(error);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;