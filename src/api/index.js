import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. http://localhost:3000/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
