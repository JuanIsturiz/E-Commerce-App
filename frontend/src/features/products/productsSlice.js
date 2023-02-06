import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./productsService";

export const getProducts = createAsyncThunk(
  "products/get",
  async (_, thunkAPI) => {
    try {
      return await productsService.getAllProducts();
    } catch (err) {
      const message =
        (err.response && err.response.date && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state, action) => {
      // state.products = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.products = [];
      });
  },
});

export const { reset } = productsSlice.actions;

export default productsSlice.reducer;
