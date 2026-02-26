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
  const search = searchParams.get("search");
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

  // Fetch products for current category & page (or search)
  useEffect(() => {
    // If it's a search, we might not use cache productsByPage nicely without modifying Redux more.
    // For simplicity, we just dispatch the fetch manually so it executes the API call.
    dispatch(
      fetchAllProducts({
        page,
        limit: LIMIT,
        category: search ? "search" : category,
        id: categoryId,
        search,
      })
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [category, categoryId, page, search, dispatch]);

  // Use "search" as the category key in Redux if we are searching
  const reduxCategoryKey = search ? "search" : category;
  const productsForCurrentPage = productsByPage[reduxCategoryKey]?.[page] || [];
  const totalProductsPages = productsByPage[reduxCategoryKey]?.total || 1;

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
          {/* Category sidebar - Hide during search */}
          {!search && category !== "flashsaleproducts" && (
            <ProductCategory
              categories={categories}
              selectedCategory={category}
              category={category}
              page={page}
            />
          )}

          {/* Products list */}
          <div className="flex-1">
            {search && (
              <h2 className="text-2xl font-semibold mb-6">
                Search Results for: <span className="text-red-600">"{search}"</span>
              </h2>
            )}

            {productsForCurrentPage.length === 0 && !isLoading && (
              <div className="text-center py-10 text-gray-500">
                No products found.
              </div>
            )}

            <RenderAllProducts products={productsForCurrentPage} />
            {totalProductsPages > 1 && (
              <Pagination
                category={category}
                categoryId={categoryId}
                search={search}
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
