import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWhishlistApi,
  allWhishlistProductApi,
  deleteWishlistProduct,
} from "../../api/whishlistApi";

// 1. Fetch Wishlist Thunk
export const fetchWishlistProduct = createAsyncThunk(
  "wishlist/fetchWishlistProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allWhishlistProductApi();
      const rawWishlistArray = await response.data.products;

      // Create the dictionary for fast O(1) lookups (Heart Icons)
      const dictionary = rawWishlistArray.reduce((acc, item) => {
        const id = item?.product?._id;
        if (id) acc[id] = true;
        return acc;
      }, {});

      // Extract just the product details into a clean array for rendering
      const cleanProductArray = rawWishlistArray
        .map((item) => item.product)
        .filter(Boolean);

      return {
        dictionary,
        array: cleanProductArray,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 2. Toggle Wishlist Thunk
export const toggleWishlistProduct = createAsyncThunk(
  "wishlist/toggleWishlistProduct",
  // CHANGE: Accept the FULL product object, not just the ID
  async (product, { getState, rejectWithValue }) => {
    const { wishlistProductss } = getState().WishlistProduct;
    const productId = product._id; // Extract ID for the API call

    try {
      if (wishlistProductss?.[productId]) {
        await deleteWishlistProduct(productId);
        return { product, action: "remove" };
      } else {
        await addToWhishlistApi(productId);
        return { product, action: "add" };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const WishlistProduct = createSlice({
  name: "wishlist",
  initialState: {
    error: null,
    wishlistProductss: {}, // The object (for heart icons)
    allWishlistProducts: [], // The array (for rendering the page)
    loading: false,
    isEmpty: true, // Clean boolean for our components
    wishlistLoaded: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWishlistProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlistProductss = action.payload.dictionary;
      state.allWishlistProducts = action.payload.array;
      state.isEmpty = action.payload.array.length === 0;
      state.wishlistLoaded = true;
    });
    builder.addCase(fetchWishlistProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.wishlistLoaded = true;
    });
builder.addCase(toggleWishlistProduct.fulfilled, (state, action) => {
      const { product, action: type } = action.payload;
      const productId = product._id;

      if (type === "add") {
        // BULLETPROOF FIX 1: Force a brand new object reference 
        // This guarantees React detects the change and turns the heart red instantly.
        state.wishlistProductss = { 
          ...state.wishlistProductss, 
          [productId]: true 
        };

        const exists = state.allWishlistProducts.some((item) => item._id === productId);
        if (!exists) {
          // BULLETPROOF FIX 2: Spread the product to avoid "Frozen Object" React errors
          state.allWishlistProducts.push({ ...product }); 
        }

        state.isEmpty = false;
      }

      if (type === "remove") {
        // Force a brand new object reference for removal as well just to be safe
        const newWishlistProductss = { ...state.wishlistProductss };
        delete newWishlistProductss[productId];
        state.wishlistProductss = newWishlistProductss;

        state.allWishlistProducts = state.allWishlistProducts.filter(
          (item) => item._id !== productId
        );

        state.isEmpty = state.allWishlistProducts.length === 0;
      }
    });
  },
});

export default WishlistProduct.reducer;