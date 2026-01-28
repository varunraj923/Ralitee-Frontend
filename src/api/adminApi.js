import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

/* PRODUCTS */
export const fetchProducts = () => API.get("/products");
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

/* CATEGORIES */
export const fetchCategories = () => API.get("/categories");
export const createCategory = (data) => API.post("/categories", data);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

/* IMAGE UPLOAD */
export const uploadImage = (formData) =>
  API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* DASHBOARD */
export const getDashboardData = () => {
  return API.get("/admin/dashboard");
};

/* AUTH */
export const logout = () => API.post("/auth/logout");
