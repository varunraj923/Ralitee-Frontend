import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import { fetchWishlistProduct } from "../../redux/slices/wishlistSlice";

import Pagination from "./Pagination";
import RenderAllProducts from "./RenderAllProducts";
import ProductCategory from "./ProductCategory";
import FlashSalesTimer from "../../components/User/FlashSaleFeature/FlashSalesTimer";
import BackButton from "../../components/common/BackButton";
import NavBar from "../../components/homepage/Navbar/Navbar";

const LIMIT = 12;

const AllProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // 1. Check if we are on the wishlist page
  const isWishlistPage = location.pathname === "/wishlist";

  const category = searchParams.get("category") || "allproducts";
  const categoryId = searchParams.get("id") || null;
  const search = searchParams.get("search");
  const page = parseInt(searchParams.get("page")) || 1;

  const { categories, loading: categoryLoading, categoriesLoaded } = useSelector(
    (state) => state.category,
  );


  // Fetch categories once
  useEffect(() => {
    if (!categoriesLoaded && !categoryLoading) {
      dispatch(fetchCategories());
    }
  }, [categoriesLoaded, categoryLoading, dispatch]);



  const { allWishlistProducts, wishlistProductss, isEmpty, loading: wishlistLoading } = useSelector(
    (state) => state.WishlistProduct
  );
  const { token } = useSelector((state) => state.auth);


  
  const {
    productsByPage,
    loading: productLoading,
    error,
  } = useSelector((state) => state.allProducts);

  useEffect(() => {
    if (!isWishlistPage) {
      dispatch(
        fetchAllProducts({
          page,
          limit: LIMIT,
          category: search ? "search" : category,
          id: categoryId,
          search,
        }),
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [category, categoryId, page, search, dispatch, isWishlistPage]);


  // 3. Determine which products and pages to show!
  const reduxCategoryKey = search ? "search" : category;
  
  // If wishlist, use wishlistItems array. Otherwise, use normal pagination data.
  const productsForCurrentPage = isWishlistPage 
    ? allWishlistProducts 
    : (productsByPage[reduxCategoryKey]?.[page] || []);

  const totalProductsPages = isWishlistPage
    ? 1 
    : (productsByPage[reduxCategoryKey]?.total || 1);

    
  // 2. Adjust loading to check the right slice depending on the page
  const isLoading = categoryLoading || (isWishlistPage ? wishlistLoading : productLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen font-sans text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          
          {/* Flash Sales Header */}
          {category === "flashsaleproducts" && !isWishlistPage && (
            <div className="grid grid-cols-3 items-center pt-4 pb-11">
              <div className="justify-self-start">
                <BackButton />
              </div>
              <div className="justify-self-center">
                <FlashSalesTimer />
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Category sidebar - Hide during search OR if on Wishlist page */}
            {!search && category !== "flashsaleproducts" && !isWishlistPage && (
              <ProductCategory
                categories={categories}
                selectedCategory={category}
                category={category}
                page={page}
              />
            )}

            {/* Products list */}
            <div className="flex-1 mt-4 lg:mt-0">
              
              {/* Conditional Title Headers */}
              {isWishlistPage && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-5 h-10 bg-[#DB4444] rounded-[4px]" />
                  <h2 className="text-3xl font-semibold tracking-[0.04em]">
                    My Wishlist
                  </h2>
                </div>
              )}

              {search && !isWishlistPage && (
                <h2 className="text-2xl font-semibold mb-6">
                  Search Results for:{" "}
                  <span className="text-red-600">"{search}"</span>
                </h2>
              )}

              {productsForCurrentPage.length === 0 && !isLoading && (
                <div className="text-center py-10 text-gray-500">
                  {isWishlistPage ? "Your wishlist is empty." : "No products found."}
                </div>
              )}

              {/* Render the Grid */}
              <RenderAllProducts products={productsForCurrentPage} wishlistProductss={wishlistProductss}/>
              
              {/* Pagination - Hide on Wishlist page */}
              {totalProductsPages > 1 && !isWishlistPage && (
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
    </>
  );
};

export default AllProducts;