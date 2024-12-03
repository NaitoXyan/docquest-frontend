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
  const response = await api.get('/get_program_to_campus');
  return response.data;
};

export const fetchRoles = async () => {
  const response = await api.get('/coordinator_get_roles');
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post('/coordinator_create_user/', userData);
  return response.data;
};

export default api;