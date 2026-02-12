import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { fetchCategories } from "../../redux/slices/categorySlice";
import { fetchAllProducts } from "../../redux/slices/productSlice";
import Pagination from "./Pagination";
import RenderAllProducts from "./RenderAllProducts";
import ProductCategory from "./ProductCategory";

const LIMIT = 12;

const AllProducts = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const { categories, loading: categoryLoading } = useSelector(
    (state) => state.category,
  );

  const {
    productsByPage,
    totalPages,
    loading: productLoading,
    error,
  } = useSelector((state) => state.allProducts);
  const isLoading = categoryLoading || productLoading;

  // Fetch categories once
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  // Fetch products only if not cached
  useEffect(() => {
    if (!productsByPage[page]) {
      dispatch(fetchAllProducts({ page, limit: LIMIT }));
      console.log("i am calling api");
    }

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
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
    <div className="min-h-screen font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
         <ProductCategory categories={categories}/>
          <div className="flex-1">
            <RenderAllProducts products={productsByPage[page] || []} />

            <Pagination page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
