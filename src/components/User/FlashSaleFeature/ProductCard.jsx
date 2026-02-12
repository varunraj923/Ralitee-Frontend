import { RenderStars } from "./RenderStars";
import { Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({
  product,
  showAddToCart = true,
  showDiscount = true,
  showOriginalPrice = true,
}) => {
  const navigate = useNavigate();

  const handleProduct = () => {
    navigate(`/product/${product._id}`);
  };

  // ---- Adaptation Logic ONLY ----
  const discount = product.discountPercentage || 0;
  const image = product.images?.[0] || product.image || "";
  const ratingAvg = product.rating?.average || 0;
  const ratingCount = product.rating?.count || 0;

  return (
    <div className="w-[261px] flex-shrink-0 group cursor-pointer">
      <div
        className="relative h-[250px] bg-[#F5F5F5] rounded-[4px] p-4 flex items-center justify-center overflow-hidden mb-4 transition-all duration-300 ease-in-out
        hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg"
        onClick={handleProduct}
      >
        {/* Discount Badge */}
        {showDiscount && discount > 0 && (
          <div className="absolute z-50 top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-[4px]">
            -{discount}%
          </div>
        )}

        {/* Action Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
            <Heart size={20} className="text-black" />
          </button>
          <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition">
            <Eye size={20} className="text-black" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={image}
          alt={product.name}
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />

        {/* Add To Cart */}
        {showAddToCart && (
          <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
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
          <div className="flex">{RenderStars(product.rating.average)}</div>
          <span className="text-gray-400 text-sm">({ratingCount})</span>
        </div>
      </div>
    </div>
  );
};
