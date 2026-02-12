import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const OrderSuccessPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-6"
                >
                    <CheckCircle className="text-green-500 w-24 h-24" />
                </motion.div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
                <p className="text-gray-600 mb-6">
                    Your order has been placed successfully. A confirmation email has been sent to you.
                </p>

                <p className="text-sm text-gray-500 mb-8">
                    Thank you for ordering from <span className="font-bold text-black">Ralitee</span>.
                </p>

                <Link
                    to="/products"
                    className="block w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition transform hover:scale-105"
                >
                    Continue Shopping
                </Link>
            </motion.div>
        </div>
    );
};

export default OrderSuccessPage;
