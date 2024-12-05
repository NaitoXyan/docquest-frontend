import axios from 'axios';

const BASE_URL = 'https://web-production-4b16.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const fetchProgramData = async () => {
  const response = await api.get('/get_coordinator_college_programs');
  return response.data;
};

export const fetchRoles = async () => {
  const response = await api.get('/coordinator_get_roles');
  return response.data;
};

export const EstaffFetchRoles = async () => {
  const response = await api.get('/estaff_get_roles');
  return response.data;
};

export const EstaffFetchCampus = async () => {
  const response = await api.get('/get_campuses');
  return response.data;
}

export const EstaffFetchCollege = async (campusID) => {
  const response = await api.get('/get_colleges/', campusID);
  return response.data;
}

export const EstaffFetchProgram = async (collegeID) => {
  const response = await api.get('/get_programs/', collegeID);
  return response.data;
}

// using this for both coordinator and estaff create user.
export const createUser = async (userData) => {
  const response = await api.post('/coordinator_create_user/', userData);
  return response.data;
};

export default api;