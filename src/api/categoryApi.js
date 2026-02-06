import api from "./index.js";

export const categoryApi = async () => {
  return api.get("/categories");
};
