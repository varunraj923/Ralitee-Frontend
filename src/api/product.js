import api from "./index"; 

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};


export const fetchAllProductsApi = (page = 1, limit = 10) => {
  return api.get(`/products?page=${page}&limit=${limit}`);
};
