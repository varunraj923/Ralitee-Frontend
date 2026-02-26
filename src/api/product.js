import api from "./index";

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchAllProductsApi = (page = 1, limit = 10) => {
  return api.get(`/products?page=${page}&limit=${limit}`);
};

export const getCategoriesProductApi = (id, page = 1, limit = 12) => {
  return api.get(`/products?category=${id}&page=${page}&limit=${limit}`);
};

export const searchProductsApi = (search, page = 1, limit = 12) => {
  return api.get(`/products?search=${search}&page=${page}&limit=${limit}`);
};