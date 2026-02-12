import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../api/order";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { cart, totalAmount } = useSelector((state) => state.cart);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);
    // Error state removed as we use snackbar now

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await placeOrder(formData);
            dispatch(clearCart());
            enqueueSnackbar("Order placed successfully!", { variant: "success" });
            navigate("/order-success");
        } catch (err) {
            enqueueSnackbar(err.response?.data?.message || "Failed to place order", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return <div className="text-center mt-20">Your cart is empty. <button onClick={() => navigate("/products")} className="text-blue-500 underline">Go Shop</button></div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping Details Form */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text" name="fullName" required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Street Address</label>
                            <input
                                type="text" name="street" required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text" name="city" required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">State</label>
                                <input
                                    type="text" name="state" required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                <input
                                    type="text" name="zip" required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text" name="country" required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input
                                type="tel" name="phone" required
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded font-medium hover:opacity-90 transition mt-6 disabled:opacity-50 flex justify-center items-center gap-2"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded h-fit">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        {cart.items.map(item => (
                            <div key={item._id} className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.product?.name}</span>
                                    <span className="text-gray-500">x{item.quantity}</span>
                                </div>
                                <span>₹{((item.product?.discountPrice || item.product?.price) * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
