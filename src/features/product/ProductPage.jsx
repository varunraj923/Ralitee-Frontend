import React, { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductGallery from "./components/ProductGallery";

const productData = {
  name: "Havic HV G-92 Gamepad",
  slug: "hv-g92",
  description:
    "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
  price: 192.0,
  rating: 4.0,
  discountPrice: 9,
  category: "gaming",
  stock: "In Stock",
  sizes: ["XS", "S", "M", "L", "XL"],
  images: [
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    "/api/placeholder/100/100", 
    "/api/placeholder/100/100", 
  ],
  thumbnail: "",
};

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-black mt-22">
      <main className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ProductGallery images={productData.images} />
          </div>
          <div className="lg:col-span-5">
            <ProductDetails product={productData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
