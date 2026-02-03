import api from "./index.js";

// Use the main API instance which has the auth interceptor


/* PRODUCTS */
export const fetchProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

/* CATEGORIES */
export const fetchCategories = () => api.get("/categories");
export const createCategory = (data) => api.post("/categories", data);
export const updateCategory = (id, data) => api.put(`/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

/* IMAGE UPLOAD */
export const uploadImage = (formData) =>
  api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/* DASHBOARD */
export const getDashboardData = () => {
  return api.get("/admin/dashboard");
};

/* AUTH */
export const logout = () => api.post("/auth/logout");

