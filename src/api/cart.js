import API from "./index";

export const getCart = async () => {
    const response = await API.get("/cart");
    return response.data;
};

export const addToCart = async (productId, quantity, size, color) => {
    const response = await API.post("/cart/add", { productId, quantity, size, color });
    return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await API.put("/cart/update", { itemId, quantity });
    return response.data;
};

export const removeFromCart = async (itemId) => {
    const response = await API.delete(`/cart/remove/${itemId}`);
    return response.data;
};
