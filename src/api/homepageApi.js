import api from "./index.js";

export const categoryApi = async () => {
  return api.get("/categories");
};

export const bestSellingProductApi = async () => {
  return api.get("/products?section=bestSelling");
};
export const exploreProductApi = async () => {
  return api.get("/products?section=explore");
};
export const flashSalesApi = async (page,limit) => {
  return api.get(`/products?section=flashSales&page=${page}&limit=${limit}`);
};
