import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { RenderStars } from "../../components/User/FlashSaleFeature/RenderStars";

const RenderAllProducts = ({ products = [] }) => {
  // Safety: if not array
  if (!Array.isArray(products)) {
    return null;
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => {
        if (!product) return null;

        const {
          _id,
          name,
          images,
          price,
          category,
          rating,
        } = product;

        return (
          <div
            key={_id || Math.random()}
            className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-64 p-4 flex items-center justify-center ">
              <img
                src={images?.[0] || "/placeholder.png"}
                alt={name || "Product"}
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
                className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
              />

              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm text-gray-400 hover:text-red-500">
                <Heart size={18} />
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="text-xs text-gray-500 mb-1">
                {category?.name || "Uncategorized"}
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                {name || "No Name"}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-yellow-400">
                  <RenderStars rating={rating?.average || 0} />
                </div>
                <span className="text-xs text-gray-500">
                  ({rating?.count || 0})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  ₹{price}
                </span>

                {/* <button className="lg:hidden p-2 bg-gray-100 rounded-full">
                  <ShoppingCart size={20} />
                </button> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderAllProducts;
