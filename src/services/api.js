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

export const EstaffFetchCollege = async (campusIDs) => {
  // Ensure campusIDs is an array and contains only valid integers
  const sanitizedCampusIDs = Array.isArray(campusIDs) 
    ? campusIDs
      .map(id => {
        const parsed = parseInt(id, 10);
        return !isNaN(parsed) ? parsed : null;
      })
      .filter(id => id !== null)
    : [parseInt(campusIDs, 10)].filter(id => !isNaN(id));

  console.log('Sanitized Campus IDs:', sanitizedCampusIDs);

  if (sanitizedCampusIDs.length === 0) {
    console.error('No valid campus IDs found');
    throw new Error('Invalid campus ID');
  }

  const response = await api.post('/get_colleges/', { 
    campusIDs: sanitizedCampusIDs 
  });
  return response.data;
};

export const EstaffFetchProgram = async (collegeIDs) => {
  // Ensure collegeIDs is an array and contains only integers
  const sanitizedCollegeIDs = Array.isArray(collegeIDs) 
    ? collegeIDs.map(id => parseInt(id, 10)) 
    : [parseInt(collegeIDs, 10)];

  const response = await api.post('/get_programs/', { 
    collegeIDs: sanitizedCollegeIDs 
  });
  return response.data;
};

// using this for both coordinator and estaff create user.
export const createUser = async (userData) => {
  const response = await api.post('/coordinator_create_user/', userData);
  return response.data;
};

export default api;