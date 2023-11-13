import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: {},
  loading: false,
};

export const getProducts = createAsyncThunk("products", async (category) => {
  //
  //`http://localhost:5000/products?category=${category}`
  const response = await fetch(
    `https://api.anadolutab.com/products?category=${category}`
  );

  return await response.json();
});

export const getProductDetail = createAsyncThunk("product", async (id) => {
  const response = await fetch(`https://api.anadolutab.com/product/${id}`);

  return await response.json();
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductDetail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProductDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function

export default productSlice.reducer;
