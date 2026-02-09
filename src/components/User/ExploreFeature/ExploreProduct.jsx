import { ProductCard } from "../FlashSaleFeature/ProductCard";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExploreProducts } from "../../../redux/slices/exploreSlice";

const productsPerPage = 8;

const ExploreProduct = () => {
  const dispatch = useDispatch();

  const { exploreProducts, loading, error } = useSelector(
    (state) => state.explore
  );

  const [page, setPage] = useState(0);

   
  useEffect(() => {
    if(exploreProducts.length === 0){
      dispatch(fetchExploreProducts());
    }
  }, [dispatch,exploreProducts.length]);

  const totalPages = Math.ceil(exploreProducts.length / productsPerPage);

  const paginatedProducts = exploreProducts.slice(
    page * productsPerPage,
    page * productsPerPage + productsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
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
        {/* MOBILE: show ALL products */}
        <div className="flex md:hidden gap-6">
          {exploreProducts.map((product) => (
            <div key={product._id} className="snap-start">
              <ProductCard
                product={product}
                showAddToCart={false}
                showDiscount={false}
                showOriginalPrice={false}
              />
            </div>
          ))}
        </div>

        {/* DESKTOP: show PAGINATED products */}
        {paginatedProducts.map((product) => (
          <div key={product._id} className="hidden md:block">
            <ProductCard
              product={product}
              showAddToCart={false}
              showDiscount={false}
              showOriginalPrice={false}
            />
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
