import api from "./index";

export const addToWhishlistApi = (productId) => {
  return api.post(`wishlist/${productId}`);
};
export const allWhishlistProductApi = () => {
  return api.get(`wishlist`);
};

export const deleteWishlistProduct = (productId ) => {
  console.log(productId)
  return api.delete(`wishlist/${productId}`);
};