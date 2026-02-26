import { RenderStars } from "./RenderStars";
import { Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/cartSlice";
import { useState } from "react";
export const ProductCard = ({
  product,
  showAddToCart = true,
  showDiscount = true,
  showOriginalPrice = true,
  setOpenSnackbar=false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);

  const handleProduct = (e) => {
    // If click came from a button, do NOT navigate
    if (e.target.closest("button")) return;

    navigate(`/product/${product._id}`);
  };

  const handleWishlist = () => {
    console.log("wishlist clicked");
  };

  const handleQuickView = () => {
    console.log("quick view clicked");
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      }),
    )
      .unwrap()
      .then(() => {
        setOpenSnackbar(true);
      })
      .catch((err) => {
        console.error("Failed to add to cart:", err);
        alert("Failed to add to cart. Please try again.");
      });
  };

  // ---- Adaptation Logic ONLY ----
  const discount = product.discountPercentage || 0;
  const image = product.images?.[0] || product.image || "";
  const ratingAvg = product.rating?.average || 0;
  const ratingCount = product.rating?.count || 0;

  return (
    <div
      className={`w-[261px] flex-shrink-0 group cursor-pointer
  transition-transform transition-shadow duration-[400ms] ease-out
   p-2 rounded-lg
  hover:shadow-[0_8px_12px_-6px_rgba(0,0,0,0.25)] ${showAddToCart ? "" : " hover:scale-[1.04]"}`}
      onClick={handleProduct}
    >
      <div
        className={`relative h-[250px] rounded-[4px] p-4 flex items-center justify-center overflow-hidden mb-4
      transition-transform  duration-300 ease-out 
     ${showAddToCart ? " hover:-translate-y-1" : ""} `}
      >
        {/* Discount Badge */}
        {showDiscount && discount > 0 && (
          <div className="absolute z-50 top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-[4px]">
            -{discount}%
          </div>
        )}

        {/* Product Image */}
        <img
          src={image}
          alt={product.name}
          className={`max-h-full max-w-full object-contain`}
        />

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            type="button"
            className="bg-white p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleWishlist();
            }}
          >
            <Heart size={20} className="text-black pointer-events-none" />
          </button>

          <button
            type="button"
            className="bg-white p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleQuickView();
            }}
          >
            <Eye size={20} className="text-black pointer-events-none" />
          </button>
        </div>

        {/* Add To Cart */}
        {showAddToCart && (
          <div
            className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Add To Cart
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-base truncate">{product.name}</h3>

        <div className="flex gap-3 font-medium">
          <span className="text-[#DB4444]">₹{product.price}</span>

          {showOriginalPrice && discount > 0 && (
            <span className="text-gray-400 line-through">
              ₹{Math.round((product.price * 100) / (100 - discount))}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">{RenderStars(ratingAvg)}</div>
          <span className="text-gray-400 text-sm">({ratingCount})</span>
        </div>
      </div>
    </div>
  );
};
