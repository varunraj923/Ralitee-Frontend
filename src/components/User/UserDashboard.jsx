import React from "react";
import FlashSalesSection from "./FlashSaleFeature/FlashSalesSection";
import BestSelling from "./BestSellingProductFeature/BestSelling";
import ExploreProduct from "./ExploreFeature/ExploreProduct";
import Footer from "./Footer/Footer";
import CategorySection from "./categories/CategorySection";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const UserDashboard = () => {
 const categoryLoading = useSelector((state) => state.category.loading);
const exploreLoading = useSelector((state) => state.explore.loading);
const flashSalesLoading = useSelector((state) => state.flashSales.loading);
const bestSellingLoading = useSelector((state) => state.bestSelling.loading);

const loading = categoryLoading||exploreLoading||flashSalesLoading||bestSellingLoading;

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
      <CategorySection />
      <FlashSalesSection />
      <BestSelling />
      <ExploreProduct />
      <Footer />
    </div>
  );
};

export default UserDashboard;
