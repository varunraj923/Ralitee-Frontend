import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartQuantity, removeCartItem } from "../../redux/slices/cartSlice";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import BackButton from "../../components/common/BackButton";

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cart, totalAmount, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleUpdateQuantity = (itemId, quantity) => {
        dispatch(updateCartQuantity({ itemId, quantity }));
    };

    const handleRemove = (itemId) => {
        dispatch(removeCartItem(itemId));
    };


     if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }
    if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 ">
            <div className="class"><BackButton/> <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1></div>
            

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item._id} className="flex gap-4 p-4 border rounded shadow-sm bg-white items-center">
                            {/* Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                                <img
                                    src={item.product?.images?.[0] || "/placeholder.png"}
                                    alt={item.product?.name}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">{item.product?.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    {item.size && `Size: ${item.size}`} {item.color && ` | Color: ${item.color}`}
                                </p>
                                <div className="mt-2 font-medium text-red-500">
                                    ₹{(item.product?.discountPrice || item.product?.price).toFixed(2)}
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border rounded">
                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                        className="p-2 hover:bg-gray-100"
                                        disabled={loading}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        className="p-2 hover:bg-gray-100"
                                        disabled={loading}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="text-gray-400 hover:text-red-500 ml-4 transition"
                                    title="Remove Item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-6 rounded h-fit sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="space-y-2 mb-4 border-b pb-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => navigate("/checkout")}
                        className="w-full bg-black text-white py-3 rounded font-medium hover:opacity-90 transition"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
