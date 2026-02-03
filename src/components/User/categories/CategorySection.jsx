import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * API-ready category structure
 * You can replace this with API data later
 */
const initialCategories = [
  {
    id: 1,
    name: "Fruits",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Vegetables",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Dairy",
    image:
      "https://images.unsplash.com/photo-1585238342028-4b61c2b7b84f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Bakery",
    image:
      "https://images.unsplash.com/photo-1608198093002-5d6a7b0b4d4b?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Snacks",
    image:
      "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 7,
    name: "Meat",
    image:
      "https://images.unsplash.com/photo-1527515637466-8f0e3f2c0b70?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 8,
    name: "Organic",
    image:
      "https://images.unsplash.com/photo-1580910051070-9cdb0f1c4a30?auto=format&fit=crop&w=300&q=80",
  },
];

const CategorySection = ({ categories = initialCategories, onCategoryClick }) => {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const categoriesPerPage = 8;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const visibleCategories = isMobile
    ? categories
    : categories.slice(
      page * categoriesPerPage,
      page * categoriesPerPage + categoriesPerPage
    );

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
            <span className="text-[#DB4444] font-semibold">
              Categories
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-[0.04em]">
            Browse by Category
          </h2>
        </div>

        {/* ARROWS (Desktop only) */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 disabled:opacity-50"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div
        className="
          flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide
          md:grid md:grid-cols-4 md:gap-8 md:overflow-visible
        "
      >
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => onCategoryClick?.(category)}
            className="
              snap-start cursor-pointer
              flex flex-col items-center justify-center
              border border-gray-200 rounded-xl
              p-6 hover:shadow-md transition
            "
          >
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base font-medium text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
