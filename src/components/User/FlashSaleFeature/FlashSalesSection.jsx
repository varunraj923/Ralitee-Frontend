import React, { useRef, useEffect,useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlashSales } from "../../../redux/slices/flashSalesSlice";
import FlashSalesTimer from "./FlashSalesTimer";
import FlashSalesProducts from "./FlashSalesProducts";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const FlashSalesSection = () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { flashSalesProducts, loading, error } = useSelector(
    (state) => state.flashSales,
  );

  useEffect(() => {
    if (flashSalesProducts.length === 0) {
      dispatch(fetchFlashSales());
    }
  }, [dispatch, flashSalesProducts.length]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handleViewAllProducts = () => {
    navigate(
      `/products?category=${encodeURIComponent("flashsaleproducts")}&page=1`,
    );
  };

  return (
    <section className="max-w-[1170px] mx-auto px-4 py-16 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20">
          {/* TITLE */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
              <span className="text-[#DB4444] font-semibold">Today's</span>
            </div>
            <h2 className="text-4xl font-semibold tracking-[0.04em]">
              Flash Sales
            </h2>
          </div>
          <FlashSalesTimer />
        </div>

        {/* ARROWS */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scroll-smooth pb-8 no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <FlashSalesProducts
          products={flashSalesProducts}
          loading={loading}
          error={error}
          setOpenSnackbar={setOpenSnackbar}
        />
      </div>

      {/* FOOTER */}
      <div className="flex justify-center mt-10 border-b border-gray-200 pb-16">
        <button
          className="bg-[#DB4444] text-white px-12 py-4 rounded-[4px] font-medium hover:bg-red-600 transition"
          onClick={() => handleViewAllProducts()}
        >
          View All Products
        </button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item added to cart!
        </Alert>
      </Snackbar>
    </section>
  );
};

export default FlashSalesSection;
