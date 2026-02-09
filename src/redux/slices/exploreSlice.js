import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { exploreProductApi } from "../../api/homepageApi";

// Async thunk to fetch explore products
export const fetchExploreProducts = createAsyncThunk(
  "explore/fetchExploreProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await exploreProductApi();
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    exploreProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExploreProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExploreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.exploreProducts = action.payload;
      
      })
      .addCase(fetchExploreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default exploreSlice.reducer;
