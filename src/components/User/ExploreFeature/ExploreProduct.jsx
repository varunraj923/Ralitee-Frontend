import { ProductCard } from "../FlashSaleFeature/ProductCard";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const exploreProducts = [
  {
    id: 401,
    name: "Organic Avocado",
    image:
      "https://images.unsplash.com/photo-1580915411957-1d8a6e9f0d7a?auto=format&fit=crop&w=500&q=80",
    price: 3,
    originalPrice: 5,
    discount: 40,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: 402,
    name: "Fresh Strawberries",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80",
    price: 4,
    originalPrice: 6,
    discount: 33,
    rating: 4.8,
    reviews: 220,
  },
  {
    id: 403,
    name: "Healthy Salad Bowl",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=500&q=80",
    price: 7,
    originalPrice: 9,
    discount: 22,
    rating: 4.6,
    reviews: 180,
    isNew:true,
  },
  {
    id: 404,
    name: "Organic Almonds",
    image:
      "https://images.unsplash.com/photo-1580910051070-9cdb0f1c4a30?auto=format&fit=crop&w=500&q=80",
    price: 12,
    originalPrice: 16,
    discount: 25,
    rating: 4.5,
    reviews: 210,
    isNew:true,
  },
  {
    id: 405,
    name: "Fresh Blueberries",
    image:
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=500&q=80",
    price: 5,
    originalPrice: 7,
    discount: 28,
    rating: 4.7,
    reviews: 140,
  },
  {
    id: 406,
    name: "Granola Cereal",
    image:
      "https://images.unsplash.com/photo-1580910051070-9cdb0f1c4a30?auto=format&fit=crop&w=500&q=80",
    price: 8,
    originalPrice: 11,
    discount: 27,
    rating: 4.4,
    reviews: 160,
  },
  {
    id: 407,
    name: "Fresh Bananas",
    image:
      "https://images.unsplash.com/photo-1574226516831-e1dff420e8f8?auto=format&fit=crop&w=500&q=80",
    price: 2,
    originalPrice: 3,
    discount: 33,
    rating: 4.6,
    reviews: 180,
  },
  {
    id: 408,
    name: "Organic Eggs",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
    price: 4,
    originalPrice: 6,
    discount: 33,
    rating: 4.5,
    reviews: 300,
  },
  {
    id: 409,
    name: "Fresh Salmon",
    image:
      "https://images.unsplash.com/photo-1527515637466-8f0e3f2c0b70?auto=format&fit=crop&w=500&q=80",
    price: 15,
    originalPrice: 20,
    discount: 25,
    rating: 4.8,
    reviews: 110,
  },
  {
    id: 410,
    name: "Greek Yogurt",
    image:
      "https://images.unsplash.com/photo-1580915411957-1d8a6e9f0d7a?auto=format&fit=crop&w=500&q=80",
    price: 3,
    originalPrice: 5,
    discount: 40,
    rating: 4.7,
    reviews: 260,
  },
  {
    id: 411,
    name: "Chocolate Cake",
    image:
      "https://images.unsplash.com/photo-1608198093002-5d6a7b0b4d4b?auto=format&fit=crop&w=500&q=80",
    price: 20,
    originalPrice: 25,
    discount: 20,
    rating: 4.9,
    reviews: 90,
  },
  {
    id: 412,
    name: "Pasta Pack",
    image:
      "https://images.unsplash.com/photo-1580915411957-1d8a6e9f0d7a?auto=format&fit=crop&w=500&q=80",
    price: 6,
    originalPrice: 8,
    discount: 25,
    rating: 4.4,
    reviews: 150,
  },
  {
    id: 413,
    name: "Fresh Bread Loaf",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=80",
    price: 4,
    originalPrice: 6,
    discount: 33,
    rating: 4.6,
    reviews: 210,
  },
  {
    id: 414,
    name: "Cheese Pack",
    image:
      "https://images.unsplash.com/photo-1523986371872-9d3ba2e2f0b0?auto=format&fit=crop&w=500&q=80",
    price: 8,
    originalPrice: 11,
    discount: 27,
    rating: 4.5,
    reviews: 190,
  },
  {
    id: 415,
    name: "Fresh Orange Juice",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=80",
    price: 5,
    originalPrice: 7,
    discount: 28,
    rating: 4.7,
    reviews: 220,
  },
  {
    id: 416,
    name: "Healthy Smoothie",
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=500&q=80",
    price: 7,
    originalPrice: 10,
    discount: 30,
    rating: 4.8,
    reviews: 140,
  },
];

const ExploreProduct = () => {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const productsPerPage = 8;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(exploreProducts.length / productsPerPage);

  const visibleProducts = isMobile
    ? exploreProducts
    : exploreProducts.slice(
        page * productsPerPage,
        page * productsPerPage + productsPerPage
      );

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
            <span className="text-[#DB4444] font-semibold">
              Our Products
            </span>
          </div>
          <h2 className="text-4xl font-semibold tracking-[0.04em]">
            Explore our Products
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

      {/* PRODUCTS */}
      <div
        className="
          flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide
          md:grid md:grid-cols-4 md:gap-8 md:overflow-visible
        "
      >
        {visibleProducts.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product}  showAddToCart={false} showDiscount={false} showOriginalPrice={false}/>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-center mt-10 border-b border-gray-200 pb-16">
        <button className="bg-[#DB4444] text-white px-12 py-4 rounded-[4px] font-medium hover:bg-red-600 transition">
          View All Products
        </button>
      </div>
    </section>
  );
};

export default ExploreProduct;
