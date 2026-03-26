import React from "react";
import FlashSalesSection from "./FlashSaleFeature/FlashSalesSection";
import BestSelling from "./BestSellingProductFeature/BestSelling";
import ExploreProduct from "./ExploreFeature/ExploreProduct";
// import Footer from "./Footer/Footer";
import Footer from "../homepage/Footer";
import CategorySection from "./categories/CategorySection";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import NavBar from "../homepage/Navbar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchBestSelling } from "../../redux/slices/bestSellingSlice";
import { fetchWishlistProduct } from "../../redux/slices/wishlistSlice";
import { fetchFlashSales } from "../../redux/slices/flashSalesSlice";
import { fetchExploreProducts } from "../../redux/slices/exploreSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const exploreLoading = useSelector((state) => state.explore.loading);

  // Category Api
  // Category Api
  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category,
  );
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  // BestSelling Api
  // BestSelling Api
  const {
    bestSellingProducts,
    loading: bestSellingLoading,
    error,
  } = useSelector((state) => state.bestSelling);
  useEffect(() => {
    if (bestSellingProducts.length === 0) {
      dispatch(fetchBestSelling());
    }
  }, [dispatch, bestSellingProducts.length]);

  // FlashSalesApi
  // FlashSalesApi
  const { flashSalesProducts, loading: flashSalesLoading } = useSelector(
    (state) => state.flashSales,
  );
  useEffect(() => {
    if (flashSalesProducts.length === 0) {
      dispatch(fetchFlashSales());
    }
  }, [dispatch, flashSalesProducts.length]);

  //ExploreproductApi
  //ExploreproductApi
  const { exploreProducts} = useSelector((state) => state.explore);
  useEffect(() => {
    if (exploreProducts.length === 0) {
      dispatch(fetchExploreProducts());
    }
  }, [dispatch]);



  //WishlistProductApi
  const {wishlistProductss,loading:wishlistLoading} = useSelector(
    (state) => state.WishlistProduct,
  );

  useEffect(() => {
  if (Object.keys(wishlistProductss).length === 0) {
          dispatch(fetchWishlistProduct());
        }
  }, [dispatch,wishlistProductss]);

  const loading =
    categoryLoading ||
    exploreLoading ||
    flashSalesLoading ||
    bestSellingLoading ||
    wishlistLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <CategorySection />
      <FlashSalesSection />
      <BestSelling />
      <ExploreProduct fetchData={false} />
      <Footer />
    </div>
  );
};

export default UserDashboard;
