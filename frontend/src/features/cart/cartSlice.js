import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import cartService from "./cartService";

const cartId = JSON.parse(localStorage.getItem("cartId"));

export const getCart = createAsyncThunk("cart/get", (userId, thunkAPI) => {
  try {
    return cartService.getUserCart(userId);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCart = createAsyncThunk("cart/create", (_, thunkAPI) => {
  try {
    return cartService.createCart();
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getItems = createAsyncThunk(
  "cart/getItems",
  (userId, thunkAPI) => {
    try {
      return cartService.getItems(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addItems = createAsyncThunk("cart/addItems", (info, thunkAPI) => {
  try {
    return cartService.addItemToCart(info);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteItems = createAsyncThunk(
  "/cart/deleteItems",
  (info, thunkAPI) => {
    try {
      return cartService.deleteItemFromCart(info);
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
  cartId: cartId ? cartId : null,
  items: [],
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
      state.cartId = null;
      state.items = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.cartId = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cartId = null;
      })
      .addCase(createCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.cartId = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.cartId = null;
      })
      .addCase(getItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.items = null;
      })
      .addCase(addItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteItems.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.items = current(state.items).filter(
          (i) => i.product_id !== Number(action.payload.id)
        );
        if (!action.payload.check) {
          state.cartId = null;
        }
      })
      .addCase(deleteItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = cartSlice.actions;

export default cartSlice.reducer;
