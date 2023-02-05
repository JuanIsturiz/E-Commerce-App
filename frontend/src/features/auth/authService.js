import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:5000";

const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logoutUser = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("cartId");
  Cookies.remove("user");
  await axios.get(`${API_URL}/logout`);
};

const updatePassword = async (info) => {
  const { userId, passwords } = info;
  const response = await axios.put(
    `${API_URL}/users/${userId}/passwords`,
    passwords
  );
  return await response.data;
};

const authService = {
  createUser,
  loginUser,
  logoutUser,
  updatePassword,
};

export default authService;
