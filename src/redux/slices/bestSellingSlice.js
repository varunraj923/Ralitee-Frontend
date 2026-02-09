import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bestSellingProductApi } from "../../api/homepageApi";

// Async thunk to fetch categories
export const fetchBestSelling = createAsyncThunk(
  "bestSelling/fetchBestSelling",
  async (_, { rejectWithValue }) => {
    try {
      const response = await bestSellingProductApi();
      
      return response.data.products;

    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bestSellingSlice = createSlice({
  name: "bestSelling",
  initialState: {
    bestSellingProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSelling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSelling.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellingProducts = action.payload;
     
      })
      .addCase(fetchBestSelling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bestSellingSlice.reducer;
