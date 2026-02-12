import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllProductsApi } from "../../api/product";

export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async ({ page = 1, limit = 12 }, { rejectWithValue }) => {
    try {
      const response = await fetchAllProductsApi(page, limit);

      return {
        products: response.data.products,
        totalPages: response.data.totalPages,
        page,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    productsByPage: {}, // caching
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;

        const { products, page, totalPages } = action.payload;

        state.productsByPage[page] = products; // cache by page
        state.totalPages = totalPages;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allProductsSlice.reducer;
