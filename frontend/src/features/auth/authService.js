import axios from "axios";

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
  await axios.get(`${API_URL}/logout`);
};

const authService = {
  createUser,
  loginUser,
  logoutUser,
};

export default authService;
