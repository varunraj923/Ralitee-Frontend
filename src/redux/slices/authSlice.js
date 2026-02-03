import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  return item === "undefined" || item === undefined ? null : item;
};

const initialState = {
  token: getLocalStorageItem("token"),
  role: getLocalStorageItem("role"),
  user: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { token, role, user } = action.payload;
      state.token = token;
      state.role = role;
      state.user = user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },

    clearAuthData: (state) => {
      localStorage.clear();
      state.token = null;
      state.role = null;
      state.user = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
