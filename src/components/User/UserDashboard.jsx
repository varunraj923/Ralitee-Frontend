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
  // Category Api
  const { categories, loading: categoryLoading, categoriesLoaded } = useSelector(
    (state) => state.category,
  );
  useEffect(() => {
    if (!categoriesLoaded && !categoryLoading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesLoaded, categoryLoading]);

  // BestSelling Api
  const {
    bestSellingProducts,
    loading: bestSellingLoading,
    bestSellingLoaded,
  } = useSelector((state) => state.bestSelling);
  useEffect(() => {
    if (!bestSellingLoaded && !bestSellingLoading) {
      dispatch(fetchBestSelling());
    }
  }, [dispatch, bestSellingLoaded, bestSellingLoading]);

  // FlashSalesApi
  const { flashSalesProducts, loading: flashSalesLoading, flashSalesLoaded } = useSelector(
    (state) => state.flashSales,
  );
  useEffect(() => {
    if (!flashSalesLoaded && !flashSalesLoading) {
      dispatch(fetchFlashSales());
    }
  }, [dispatch, flashSalesLoaded, flashSalesLoading]);

  //ExploreproductApi
  const { exploreProducts, loading: exploreLoading, exploreLoaded } = useSelector((state) => state.explore);
  useEffect(() => {
    if (!exploreLoaded && !exploreLoading) {
      dispatch(fetchExploreProducts());
    }
  }, [dispatch, exploreLoaded, exploreLoading]);

  //WishlistProductApi
  const { wishlistProductss, loading: wishlistLoading, wishlistLoaded } = useSelector(
    (state) => state.WishlistProduct,
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !wishlistLoaded && !wishlistLoading) {
      dispatch(fetchWishlistProduct());
    }
  }, [dispatch, token, wishlistLoaded, wishlistLoading]);

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
