import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart as addToCartApi, updateCartItem, removeFromCart } from "../../api/cart";

// Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const data = await getCart();
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color }, { rejectWithValue }) => {
    try {
        const data = await addToCartApi(productId, quantity, size, color);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
});

export const updateCartQuantity = createAsyncThunk("cart/updateQuantity", async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
        const data = await updateCartItem(itemId, quantity);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update quantity");
    }
});

export const removeCartItem = createAsyncThunk("cart/removeItem", async (itemId, { rejectWithValue }) => {
    try {
        const data = await removeFromCart(itemId);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to remove item");
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: null,
        totalAmount: 0,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearCartMessage: (state) => {
            state.successMessage = null;
            state.error = null;
        },
        clearCart: (state) => {
            state.cart = null;
            state.totalAmount = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                state.totalAmount = action.payload.totalAmount;
                state.successMessage = "Item added to cart successfully!";
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update Quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                state.totalAmount = action.payload.totalAmount;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Remove Item
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload.cart;
                state.totalAmount = action.payload.totalAmount;
                state.successMessage = "Item removed from cart";
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearCartMessage, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
