

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import exploreReducer from "./slices/exploreSlice";
import flashSalesReducer from "./slices/flashSalesSlice";
import bestSellingReducer from "./slices/bestSellingSlice"
import allProductsReducer from "./slices/productSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    explore: exploreReducer,
    flashSales: flashSalesReducer,
    bestSelling: bestSellingReducer,
    allProducts: allProductsReducer,
  },
});
