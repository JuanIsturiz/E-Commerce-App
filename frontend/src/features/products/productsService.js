import axios from "axios";

const API_URL = "http://localhost:5000";

const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

const productsService = {
  getAllProducts,
};

export default productsService;
