import axios from "axios";

const API_URL = "http://localhost:5000";

export const getCartProducts = async (cartId) => {
  const response = await axios.get(`${API_URL}/cart/${cartId}/products`);
  return response.data;
};
