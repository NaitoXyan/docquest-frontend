import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // Existing states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [roles, setRoles] = useState([]);

  // New error state
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before new submission

    try {
      // First request: Login to get the token
      const loginResponse = await axios.post('http://127.0.0.1:8000/auth/token/login/', {
        email,
        password,
      });

      const token = loginResponse.data.auth_token;
      setToken(token);
      localStorage.setItem('token', token);

      // Second request: Get user details
      const userResponse = await axios.get('http://127.0.0.1:8000/name_and_roles', {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      const { userID, firstname, lastname, roles } = userResponse.data;

      // Store user details in localStorage
      localStorage.setItem('userid', userID);
      localStorage.setItem('firstname', JSON.stringify(firstname));
      localStorage.setItem('lastname', JSON.stringify(lastname));

      const rolesList = roles.map(roleObj => roleObj.code);
      localStorage.setItem('roles', JSON.stringify(rolesList));

      // Navigate based on roles
      if (rolesList.includes('rglr')) {
        navigate('/user');
      } else if (rolesList.includes('ecrd')) {
        navigate('/director');
      } else if (
        rolesList.includes('prch') ||
        rolesList.includes('cldn') ||
        rolesList.includes('vcaa') ||
        rolesList.includes('vcri') ||
        rolesList.includes('acnt') ||
        rolesList.includes('cclr') ||
        rolesList.includes('estf')
      ) {
        navigate('/signatory');
      }
    } catch (error) {
      // Handle errors and set error message
      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 400) {
          setError('Invalid email or password.');
        } else {
          setError('An unexpected error occurred. Please try again later.');
        }
      } else if (error.request) {
        // Request was made but no response received
        setError('No response from server. Please check your network.');
      } else {
        // Something else happened
        setError('An error occurred. Please try again.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg-login3.png')"
      }}
    >
      <div className="w-full max-w-md p-9 ">
        <div className="flex justify-center my-1">
          <img src="/images/logo1.png" alt="DocQuestLogo" className="w-48" />
        </div>

        {/* Display error message if exists */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black-700" style={{ color: "#060E57" }} >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-300 rounded-md shadow-sm border focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
          <label
            htmlFor="password"
            className="block mt-0.5 text-sm font-medium"
            style={{ color: "#060E57" }}
          >
            Password
          </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-300 rounded-md shadow-sm border focus:outline-none focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button type="submit" className="w-full mt-6 bg-indigo-950 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <h1 className='font-semibold'>Login</h1>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
