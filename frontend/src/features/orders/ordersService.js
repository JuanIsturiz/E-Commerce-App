import axios from "axios";

const API_URL = "http://localhost:5000";

const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/`);
  return await response.data;
};

const ordersService = {
  getUserOrders,
};

export default ordersService;
