import { useState } from "react";
import { RenderStars } from "../../../components/User/FlashSaleFeature/RenderStars";
import { Heart, Minus, Plus, Truck, RotateCcw } from "lucide-react";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2]);

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Rating */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex">{RenderStars(product.rating)}</div>
          <span className="text-gray-500">({product.reviewCount} Reviews)</span>
          <span className="text-gray-300">|</span>
          <span className="text-green-500 font-medium">
            {product.stock}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="text-2xl font-medium tracking-wide">
        ₹{product.price.toFixed(2)}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-black border-b border-gray-300 pb-6">
        {product.description}
      </p>

      {/* Options Container */}
      <div className="space-y-4">
        {/* Sizes */}
        {product.sizes && (
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Size:</span>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-8 h-8 flex items-center justify-center text-sm border rounded hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors ${
                    selectedSize === size
                      ? "bg-red-500 text-white border-red-500"
                      : "border-gray-300 text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        {/* Quantity */}
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="w-16 h-10 flex items-center justify-center font-medium border-x border-gray-300">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center bg-red-500 text-white hover:bg-red-600 transition"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Buy Button */}
        <button className="flex-1 bg-red-500 text-white h-10 rounded font-medium hover:bg-red-600 transition shadow-sm">
          Buy Now
        </button>

        {/* Wishlist */}
        <button className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 hover:text-red-500 transition">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Delivery Info Box */}
      <div className="border border-gray-300 rounded mt-4 divide-y divide-gray-300">
        <div className="flex items-center gap-4 p-4">
          <Truck className="w-8 h-8 text-black" />
          <div>
            <h4 className="font-medium">Free Delivery</h4>
            <a href="#" className="text-xs font-medium underline">
              Enter your postal code for Delivery Availability
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <RotateCcw className="w-8 h-8 text-black" />
          <div>
            <h4 className="font-medium">Return Delivery</h4>
            <p className="text-xs">
              Free 30 Days Delivery Returns.{" "}
              <a href="#" className="underline font-medium">
                Details
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
