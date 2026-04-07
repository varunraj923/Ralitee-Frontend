import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToWhishlistApi,
  allWhishlistProductApi,
  deleteWishlistProduct,
} from "../../api/whishlistApi";


export const fetchWishlistProduct = createAsyncThunk(
  "wishlist/fetchWishlistProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await allWhishlistProductApi();
      const rawWishlistArray = await response.data.products;

      const dictionary = rawWishlistArray.reduce((acc, item) => {
        const id = item?.product?._id;
        if (id) acc[id] = true;
        return acc;
      }, {});

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
  async (product, { getState, rejectWithValue }) => {
    const { wishlistProductss } = getState().WishlistProduct;
    const productId = product._id;

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
    wishlistProductss: {},
    allWishlistProducts: [],
    loading: false,
    isEmpty: true,
    hasFetched: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchWishlistProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.hasFetched = true; 
      state.wishlistProductss = action.payload.dictionary;
      state.allWishlistProducts = action.payload.array;
      state.isEmpty = action.payload.array.length === 0;
    });
    builder.addCase(fetchWishlistProduct.rejected, (state, action) => {
      state.loading = false;
      state.hasFetched = true; // 
      state.error = action.payload;
    });
    builder.addCase(toggleWishlistProduct.fulfilled, (state, action) => {
      const { product, action: type } = action.payload;
      const productId = product._id;

      if (type === "add") {
        state.wishlistProductss = { 
          ...state.wishlistProductss, 
          [productId]: true 
        };

        const exists = state.allWishlistProducts.some((item) => item._id === productId);
        if (!exists) {
          state.allWishlistProducts.push({ ...product }); 
        }

        state.isEmpty = false;
      }

      if (type === "remove") {
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