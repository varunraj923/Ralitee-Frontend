// 1. Import combineReducers along with configureStore
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import exploreReducer from "./slices/exploreSlice";
import flashSalesReducer from "./slices/flashSalesSlice";
import bestSellingReducer from "./slices/bestSellingSlice";
import allProductsReducer from "./slices/productSlice";
import AllWishlistProduct from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";

// 2. Combine all your slice reducers into one "appReducer"
const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  explore: exploreReducer,
  flashSales: flashSalesReducer,
  bestSelling: bestSellingReducer,
  allProducts: allProductsReducer,
  cart: cartReducer,
  WishlistProduct: AllWishlistProduct,
});

// 3. Wrap it in the rootReducer to catch the logout action
const rootReducer = (state, action) => {

  if (action.type === "auth/clearAuthData") {
    state = undefined; 
  }
  return appReducer(state, action);
};


export const store = configureStore({
  reducer: rootReducer,
});