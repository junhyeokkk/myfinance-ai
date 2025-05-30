import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function login(email: string, password: string) {
  const res = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  const { accessToken, refreshToken, user } = res.data.data;
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
}

export async function signup(email: string, password: string, name: string) {
  const res = await axios.post(`${API_URL}/auth/signup`, {
    email,
    password,
    name,
  });
  return res.data;
}