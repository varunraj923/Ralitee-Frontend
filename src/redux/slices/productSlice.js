import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProductsApi,
  getCategoriesProductApi,
  searchProductsApi,
} from "../../api/product";
import { flashSalesApi } from "../../api/homepageApi";


export const fetchAllProducts = createAsyncThunk(
  "allProducts/fetchAllProducts",
  async (
    { page = 1, limit = 12, category = "allproducts", id, search },
    { rejectWithValue },
  ) => {
    try {
      let response;

      if (search) {
        response = await searchProductsApi(search, page, limit);
      } else if (category === "allproducts") {
        response = await fetchAllProductsApi(page, limit);
      }
      else if (category === 'flashsaleproducts') {
        response = await flashSalesApi(page, limit)
      }
      else {
        response = await getCategoriesProductApi(id, page, limit);
      }

      return {
        category,
        page,
        products: response.data.products,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: {
    productsByPage: {},
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

        const { category, page, products, totalPages } = action.payload;

        // create category object if not exists
        if (!state.productsByPage[category]) {
          state.productsByPage[category] = {};
        }

        // store products under category and page
        state.productsByPage[category][page] = products;
        state.productsByPage[category].total = totalPages;
        state.totalPages = totalPages;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allProductsSlice.reducer;
