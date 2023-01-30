import axios from "axios";

const API_URL = "http://localhost:5000";

const getUserOrders = async (userId) => {
  const response = await axios.get(`${API_URL}/orders/user/${userId}`);
  return await response.data;
};

const createOrder = async (info) => {
  const { cartId, total, userId, products } = info;
  const today = new Date().getTime();
  const randomDay = 100000000 * Math.round(Math.random() * 20) + 100000000;
  const deliverDate = new Date(today + randomDay).toISOString().split("T")[0];
  const bodyInfo = {
    deliverDate,
    total,
    userId,
    products,
  };

  const response = await axios.post(
    `${API_URL}/checkout/cart/${cartId}/success`,
    bodyInfo
  );
  return await response.data;
};

const ordersService = {
  getUserOrders,
  createOrder,
};

export default ordersService;
