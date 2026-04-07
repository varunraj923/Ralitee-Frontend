import API from "./index";

export const placeOrder = async (shippingAddress) => {
    const response = await API.post("/orders/place", { shippingAddress });
    return response.data;
};

export const getOrders = async () => {
    const response = await API.get("/orders");
    return response.data;
}
