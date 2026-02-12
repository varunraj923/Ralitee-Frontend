 import { Star } from "lucide-react";
 export const RenderStars = ({rating}) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={15}
          className={`${
            i <= rating
              ? "fill-yellow-400 text-yellow-400" // Filled star
              : i - 0.5 === rating
              ? "fill-yellow-400 text-yellow-400 opacity-50" // Half star (simplified visual)
              : "text-gray-300" // Empty star
          }`}
        />
      );
    }
    return stars;
  };