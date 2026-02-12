import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../api/order";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CircularProgress, Radio, RadioGroup, FormControlLabel, Button, IconButton, Checkbox } from "@mui/material";
import { Trash2, Plus, MapPin } from "lucide-react";
import { addAddressApi, getAddressesApi, deleteAddressApi } from "../../api/auth";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { cart, totalAmount } = useSelector((state) => state.cart);

    // Address State
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState("new");
    const [saveAddress, setSaveAddress] = useState(false);

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

    useEffect(() => {
        loadAddresses();
    }, []);

    const loadAddresses = async () => {
        try {
            const res = await getAddressesApi();
            setAddresses(res.data.addresses);
        } catch (error) {
            console.error("Failed to load addresses", error);
        }
    };

    const handleAddressChange = (e) => {
        const id = e.target.value;
        setSelectedAddressId(id);

        if (id === "new") {
            setFormData({
                fullName: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                country: "",
                phone: ""
            });
            setSaveAddress(false);
        } else {
            const addr = addresses.find(a => a._id === id);
            if (addr) {
                // Populate form data for submission, but visual form might be hidden
                setFormData({
                    fullName: addr.fullName,
                    street: addr.street,
                    city: addr.city,
                    state: addr.state,
                    zip: addr.zip,
                    country: addr.country,
                    phone: addr.phone
                });
            }
        }
    };

    const handleDeleteAddress = async (id, e) => {
        e.preventDefault(); // Prevent radio selection
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this address?")) {
            try {
                await deleteAddressApi(id);
                enqueueSnackbar("Address deleted successfully", { variant: "success" });
                loadAddresses();
                if (selectedAddressId === id) {
                    setSelectedAddressId("new");
                    setFormData({
                        fullName: "", street: "", city: "", state: "", zip: "", country: "", phone: ""
                    });
                }
            } catch (err) {
                enqueueSnackbar(err.response?.data?.message || "Failed to delete address", { variant: "error" });
            }
        }
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Validate form data
            const requiredFields = ["fullName", "street", "city", "state", "zip", "country", "phone"];
            const missing = requiredFields.filter(field => !formData[field]);
            if (missing.length > 0) {
                enqueueSnackbar(`Please fill in all fields: ${missing.join(", ")}`, { variant: "warning" });
                setLoading(false);
                return;
            }

            // If "new" and "save" is checked, save address first
            if (selectedAddressId === "new" && saveAddress) {
                try {
                    await addAddressApi(formData);
                    enqueueSnackbar("Address saved for future use", { variant: "success" });
                } catch (saveErr) {
                    console.error("Failed to save address", saveErr);
                    enqueueSnackbar("Failed to save address, proceeding with order...", { variant: "warning" });
                }
            }

            // Place Order
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
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate("/products")}
                    className="text-primary hover:underline font-medium"
                >
                    Go start shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT COLUMN: Shipping Address Selection & Form */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Address Selection */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Shipping Address
                        </h2>

                        <RadioGroup value={selectedAddressId} onChange={handleAddressChange} className="space-y-4">
                            {addresses.map((addr) => (
                                <div
                                    key={addr._id}
                                    className={`relative border rounded-xl p-4 transition-all cursor-pointer ${selectedAddressId === addr._id
                                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                                            : "border-gray-200 hover:border-gray-300"
                                        }`}
                                >
                                    <FormControlLabel
                                        value={addr._id}
                                        control={<Radio />}
                                        label={
                                            <div className="ml-2">
                                                <div className="font-semibold text-gray-900">{addr.fullName}</div>
                                                <div className="text-sm text-gray-600">
                                                    {addr.street}, {addr.city}, {addr.state} {addr.zip}
                                                </div>
                                                <div className="text-sm text-gray-500">{addr.country} • {addr.phone}</div>
                                            </div>
                                        }
                                        className="w-full m-0"
                                    />
                                    <button
                                        onClick={(e) => handleDeleteAddress(addr._id, e)}
                                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                                        title="Delete address"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}

                            {/* Add New Address Option */}
                            <div
                                className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedAddressId === "new"
                                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <FormControlLabel
                                    value="new"
                                    control={<Radio />}
                                    label={
                                        <div className="ml-2 flex items-center gap-2 font-medium text-gray-900">
                                            <Plus size={18} />
                                            Add a new address
                                        </div>
                                    }
                                    className="w-full m-0"
                                />
                            </div>
                        </RadioGroup>
                    </div>

                    {/* New Address Form (Visible only if 'new' is selected) */}
                    {selectedAddressId === "new" && (
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
                            <h3 className="font-medium mb-4 text-gray-900">New Address Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text" name="fullName"
                                        value={formData.fullName}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <input
                                        type="text" name="street"
                                        value={formData.street}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="123 Main St, Apt 4B"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text" name="city"
                                        value={formData.city}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text" name="state"
                                        value={formData.state}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP / Postal Code</label>
                                    <input
                                        type="text" name="zip"
                                        value={formData.zip}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text" name="country"
                                        value={formData.country}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel" name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div className="col-span-2 pt-2">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={saveAddress}
                                                onChange={(e) => setSaveAddress(e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label="Save this address for future orders"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Order Summary */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                        <h2 className="text-xl font-semibold mb-6 pb-4 border-b">Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.items.map(item => (
                                <div key={item._id} className="flex justify-between items-start gap-4 text-sm">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
                                        {/* Placeholder for product image if available */}
                                        {item.product?.images?.[0]?.url &&
                                            <img src={item.product.images[0].url} alt="" className="w-full h-full object-cover" />
                                        }
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900 line-clamp-2">{item.product?.name}</p>
                                        <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-medium text-gray-900 whitespace-nowrap">
                                        ₹{((item.product?.discountPrice || item.product?.price) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t mt-2">
                                <span>Total</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading || (selectedAddressId === "new" && !formData.fullName)}
                            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-gray-200 active:scale-[0.98]"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            By placing your order, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
