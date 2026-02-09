import { useEffect, useState } from "react";
import { ProductCard } from "../FlashSaleFeature/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSelling } from "../../../redux/slices/bestSellingSlice";

const BestSelling = () => {
  const [showAll, setShowAll] = useState(false);

  const {
    bestSellingProducts = [],
    loading,
    error,
  } = useSelector((state) => state.bestSelling);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bestSellingProducts.length === 0) {
      dispatch(fetchBestSelling());
    }
  }, [dispatch, bestSellingProducts.length]);

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans border-b border-gray-200">
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

      {/* LOADING */}
      {loading && (
        <p className="text-center py-10 text-gray-500">
          Loading best selling products...
        </p>
      )}

      {/* PRODUCTS */}
      {!loading && (
        <>
          <div
            className="flex gap-8 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {bestSellingProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                showAddToCart={false}
                showDiscount={false}
              />
            ))}
          </div>

          {showAll && (
            <div
              className="flex gap-8 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {bestSellingProducts.slice(4, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  showAddToCart={false}
                  showDiscount={false}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default BestSelling;
