import { createSlice } from "@reduxjs/toolkit";

const getLocalStorageItem = (key) => {
  const item = localStorage.getItem(key);
  if (item === "undefined" || item === undefined || item === null) {
    return null;
  }

  // Try to parse JSON for objects (like user)
  try {
    return JSON.parse(item);
  } catch {
    // Return as string for simple values (like token, role)
    return item;
  }
};

const initialState = {
  token: getLocalStorageItem("token"),
  role: getLocalStorageItem("role"),
  user: getLocalStorageItem("user"),
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
      localStorage.setItem("user", JSON.stringify(user));
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
