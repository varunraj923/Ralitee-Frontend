import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/slices/categorySlice";

const CategorySection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -300 : 300;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    navigate(
      `/products?category=${encodeURIComponent(
        category.name,
      )}&id=${category._id}&page=1`,
    );
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 py-12 font-sans border-b border-gray-200">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-8 bg-[#DB4444] rounded-sm" />
            <span className="text-[#DB4444] font-bold text-sm tracking-wide">
              Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Browse by Category
          </h2>
        </div>

        <div className="hidden md:flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category)}
              className="flex-none w-[160px] md:w-[180px] snap-start group cursor-pointer"
            >
              <div
                className={`
                  h-[180px] w-full rounded-lg mb-4 
                  flex items-center justify-center p-4 
                  transition-all duration-300 
                 
                  ${category?.color || ""}
                `}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg  transition-all duration-500 ease-out group-hover:scale-105 "
                />
              </div>

              <p className="text-center font-medium text-gray-800 text-base group-hover:text-[#DB4444] transition-colors">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      }
    </section>
  );
};

export default CategorySection;
