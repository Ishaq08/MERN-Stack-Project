import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Async Thunk ---

// Process checkout and create an order
export const checkout = createAsyncThunk(
  'checkout/checkout',
  async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
        checkoutData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// --- Checkout Slice ---

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {
    // resetCheckout: (state) => {
    //   state.loading = false;
    //   state.error = null;
    //   state.success = false;
    },
  
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutDetails = action.payload;
        state.success = true;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Checkout failed';
        state.success = false;
      });
  },
});

export const { resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
