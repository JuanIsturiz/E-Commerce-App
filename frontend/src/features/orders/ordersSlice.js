import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const createOrder = createAsyncThunk(
  "orders/create",
  async (info, thunkAPI) => {
    try {
      console.log("step 2");
      return ordersService.createOrder(info);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancel",
  async (orderId, thunkAPI) => {
    try {
      return ordersService.cancelOrder(orderId);
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
    builder
      .addCase(getUserOrders.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.orders;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload;
      })
      .addCase(createOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        if (!action.payload.check) {
          localStorage.removeItem("cartId");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(cancelOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = current(state.orders).map((o) => {
          if (o.id === action.payload.id) {
            console.log("o.id ", typeof o.id);
            console.log("action.payload.id ", typeof action.payload.id);
            return { ...o, status: "Cancelled" };
          }
          return o;
        });
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default ordersSlice.reducer;
