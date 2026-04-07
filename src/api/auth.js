import api from "./index.js";

export const registerApi = async (userData) => {
  return api.post("/auth/register", userData);
};

export const loginApi = async (loginData) => {
  return api.post("/auth/login", loginData);
};

export const logoutApi = async () => {
  return api.post("/auth/logout");
};

export const changePasswordApi = async (forgotData) => {
  console.log(forgotData)
  return api.post("/auth/change-password", forgotData);
};

export const forgotPasswordApi = async (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPasswordApi = async (token, data) => {
  return api.post(`/auth/reset-password/${token}`, data);
};

export const addAddressApi = async (data) => {
  return api.post("/user/add-address", data);
};

export const getAddressesApi = async () => {
  return api.get("/user/addresses");
};

export const deleteAddressApi = async (addressId) => {
  return api.delete(`/user/delete-address/${addressId}`);
};

