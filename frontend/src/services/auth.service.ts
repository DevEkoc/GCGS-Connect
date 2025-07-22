import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/';

const register = (data: any) => {
  return axios.post(API_URL + 'register/', data);
};

const login = (data: any) => {
  return axios.post(API_URL + 'login/', data).then((response) => {
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService; 