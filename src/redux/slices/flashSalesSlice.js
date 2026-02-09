import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { flashSalesApi } from "../../api/homepageApi";

// Async thunk to fetch flash sales data from API
export const fetchFlashSales = createAsyncThunk(
  "flashSales/fetchFlashSales",
  async (_, { rejectWithValue }) => {
    try {
      const response = await flashSalesApi();
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const flashSalesSlice = createSlice({
  name: "flashSales",
  initialState: {
    flashSalesProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlashSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFlashSales.fulfilled, (state, action) => {
        state.loading = false;
        state.flashSalesProducts = action.payload;
      })
      .addCase(fetchFlashSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default flashSalesSlice.reducer;
