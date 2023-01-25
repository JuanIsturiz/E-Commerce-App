import axios from "axios";

const API_URL = "http://localhost:5000";

const getUserCart = async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);

  const check = await response.data.length;

  if (!check) {
    return null;
  } else {
    const cartId = await response.data[0].cart_id;
    localStorage.setItem("cartId", JSON.stringify(cartId));
    return cartId;
  }
};

const createCart = async (userId) => {
  const response = await axios.post(`${API_URL}/cart`, { userId });
  const newCart = await response.data;
  localStorage.setItem("cartId", JSON.stringify(newCart.id));
  return newCart.id;
};

const getItems = async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return await response.data;
};

const addItemToCart = async (info) => {
  const { quantity, userId, productId, cartId } = info;

  const response = await axios.post(
    `${API_URL}/cart/${cartId}/user/${userId}`,
    { quantity, productId }
  );
  return await response.data;
};

const cartService = { getUserCart, createCart, getItems, addItemToCart };

export default cartService;