import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchAllProducts } from "../../redux/slices/productSlice";

import Pagination from "./Pagination";
import RenderAllProducts from "./RenderAllProducts";
import ProductCategory from "./ProductCategory";
import FlashSalesTimer from "../../components/User/FlashSaleFeature/FlashSalesTimer";

const LIMIT = 12;

const AllProducts = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "allproducts";
  const categoryId = searchParams.get("id") || null;
  const page = parseInt(searchParams.get("page")) || 1;

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category,
  );

  const {
    productsByPage,
    loading: productLoading,
    error,
  } = useSelector((state) => state.allProducts);

  const isLoading = categoryLoading || productLoading;

  // Fetch categories once
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  // Fetch products for current category & page
  useEffect(() => {
    const pageData = productsByPage[category]?.[page];

    if (!pageData) {
      dispatch(
        fetchAllProducts({
          page,
          limit: LIMIT,
          category,
          id: categoryId,
        }),
      );
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, categoryId, page, dispatch, productsByPage]);

  const productsForCurrentPage = productsByPage[category]?.[page] || [];
  const totalProductsPages = productsByPage[category]?.total || 1;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {category === "flashsaleproducts" && (
          <div className="flex justify-center pt-4 pb-11">
            <FlashSalesTimer />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category sidebar */}
          {category !== "flashsaleproducts" && (
            <ProductCategory
              categories={categories}
              selectedCategory={category}
              category={category}
              page={page}
            />
          )}

          {/* Products list */}
          <div className="flex-1">
            <RenderAllProducts products={productsForCurrentPage} />
            {totalProductsPages > 1 && (
              <Pagination
                category={category}
                categoryId={categoryId}
                page={page}
                totalPages={totalProductsPages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
