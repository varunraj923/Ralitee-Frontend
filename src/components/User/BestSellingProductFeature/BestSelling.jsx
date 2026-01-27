import { useState } from "react";
import { ProductCard } from "../FlashSaleFeature/ProductCard";


 const bestProducts = [
  {
    id: 101,
    name: "Logitech G Pro Wireless Mouse",
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 102,
    name: "Razer BlackWidow V3 Keyboard",
    image:
      "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 199,
    originalPrice: 249,
    discount: 20,
    rating: 4.6,
    reviews: 180,
  },
  {
    id: 103,
    name: "SteelSeries Arctis 7 Headset",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 249,
    originalPrice: 299,
    discount: 17,
    rating: 4.7,
    reviews: 310,
  },
  {
    id: 104,
    name: "ASUS TUF 27” Gaming Monitor",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 399,
    originalPrice: 449,
    discount: 11,
    rating: 4.9,
    reviews: 520,
  },
  {
    id: 105,
    name: "Secretlab Titan EVO Gaming Chair",
    image:
      "https://images.unsplash.com/photo-1616627981283-4b8a6c9b9e9e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 499,
    originalPrice: 599,
    discount: 17,
    rating: 4.8,
    reviews: 410,
  },
  {
    id: 106,
    name: "Elgato Stream Deck MK.2",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.7,
    reviews: 275,
  },
];



const BestSelling = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll
    ? bestProducts
    : bestProducts.slice(0, 4);

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20 mb-4">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
              <span className="text-[#DB4444] font-semibold">
                This months
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-[0.04em]">
              Best Selling Products
            </h2>
          </div>
        </div>

       <button
  onClick={() => setShowAll(!showAll)}
  className="
    bg-[#DB4444] text-white
    px-6 py-3 text-sm
    md:px-12 md:py-4 md:text-base
    rounded-[4px] font-medium
    hover:bg-red-600 transition
  "
>
  {showAll ? "Show Less" : "View All"}
</button>
      </div>

      {/* PRODUCTS */}
      <div
        className="flex gap-8 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product}  showAddToCart={false} showDiscount={false}/>
        ))}
      </div>
    </section>
  );
};

export default BestSelling;
