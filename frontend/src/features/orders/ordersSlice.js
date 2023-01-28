import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";

export const getUserOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId, thunkAPI) => {
    try {
      return ordersService.getUserOrders(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  orders: [],
  items: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrders.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = [];
    });
    builder.addCase(getUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.orders = [];
      state.message = action.payload;
    });
  },
});

export default ordersSlice.reducer;
