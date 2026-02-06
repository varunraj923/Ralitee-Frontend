import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, Eye, ShoppingCart, Filter, ChevronDown } from "lucide-react";

const DUMMY_PRODUCTS = [
  { id: 1, name: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, rating: 5, reviews: 88, discount: "-40%" },
  { id: 2, name: "AK-900 Wired Keyboard", price: 960, oldPrice: 1160, rating: 4, reviews: 75, discount: "-35%" },
  { id: 3, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, rating: 5, reviews: 99, discount: "-30%" },
  { id: 4, name: "S-Series Comfort Chair", price: 375, oldPrice: 400, rating: 4.5, reviews: 99, discount: "-25%" },
  { id: 5, name: "Gucci Duffle Bag", price: 960, oldPrice: 1160, rating: 4.5, reviews: 65, discount: null },
  { id: 6, name: "RGB CPU Cooler", price: 160, oldPrice: 170, rating: 4, reviews: 65, discount: null },
];

const BrowsebyCategory = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("Popularity");

  // Format the ID to look like a title (e.g., "electronics" -> "Electronics")
  const categoryName = id ? id.charAt(0).toUpperCase() + id.slice(1) : "Category";

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 font-sans">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-gray-800">Home</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Category</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{categoryName}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters (Dummy UI) */}
        <aside className="w-full md:w-[250px] flex-shrink-0 space-y-6 hidden md:block">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Filter size={18} /> Filters
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-[#DB4444] focus:ring-[#DB4444]" /> In Stock
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-[#DB4444] focus:ring-[#DB4444]" /> On Sale
              </label>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
            <div className="flex items-center gap-2 text-sm">
              <input type="number" placeholder="Min" className="w-20 border rounded px-2 py-1" />
              <span>-</span>
              <input type="number" placeholder="Max" className="w-20 border rounded px-2 py-1" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {categoryName} <span className="text-base font-normal text-gray-500 ml-2">({DUMMY_PRODUCTS.length} items)</span>
            </h1>
            
            <div className="mt-4 sm:mt-0 relative group">
              <button className="flex items-center gap-2 border px-4 py-2 rounded bg-white hover:bg-gray-50 text-sm">
                Sort by: {sortBy} <ChevronDown size={16} />
              </button>
              {/* Dropdown would go here */}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_PRODUCTS.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-md overflow-hidden">
                
                {/* Image Section */}
                <div className="relative h-[250px] bg-gray-100 flex items-center justify-center p-4 rounded-md">
                   {/* Discount Tag */}
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-medium px-3 py-1 rounded-sm">
                      {product.discount}
                    </span>
                  )}
                  
                  {/* Action Icons (appear on hover) */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"><Heart size={18} /></button>
                    <button className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"><Eye size={18} /></button>
                  </div>

                  <img 
                    src="https://articles-1mg.gumlet.io/articles/wp-content/uploads/2017/02/rsz_shutterstock_291146909.jpg?compress=true&quality=80&w=640&dpr=1" 
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Add to Cart (Slide up on hover) */}
                  <button className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
                    <ShoppingCart size={16} /> Add To Cart
                  </button>
                </div>

                {/* Details Section */}
                <div className="pt-4">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[#DB4444] font-medium">${product.price}</span>
                    {product.oldPrice && (
                       <span className="text-gray-400 text-sm line-through">${product.oldPrice}</span>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-[#FFAD33]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} stroke="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsebyCategory;