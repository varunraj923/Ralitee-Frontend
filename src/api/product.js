import api from "./index"; 

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
