import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cart: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {},
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
