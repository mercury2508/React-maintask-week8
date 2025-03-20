import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  total: 0,
  final_total: 0,
  qty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartData(state, action) {
      const { carts, total, final_total } = action.payload;
      const qty = carts.reduce((accu, cart) => accu + cart.qty, 0);

      state.carts = carts;
      state.total = total;
      state.final_total = final_total;
      state.qty = qty;
    },
  },
});

export const { updateCartData, clearCartData } = cartSlice.actions;
export default cartSlice.reducer;
