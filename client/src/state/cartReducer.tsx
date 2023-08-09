import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../components/global/Types';

// export interface IItemState {
//   count: number;
//   price: number;
// }

export interface ICartState {
  isCartOpen: boolean;
  cartItems: Array<IItem>;
  items: Array<IItem>;
}

const initialState: ICartState = { isCartOpen: false, cartItems: [], items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      state.cartItems = [...state.cartItems, action.payload.item];
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
    },
    increaseCount(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) item.count++;
        return item;
      });
    },
    decreaseCount(state, action) {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id && item.count > 1) item.count--;
        return item;
      });
    },
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    }
  }
});

export const { setItems, addToCart, removeFromCart, increaseCount, decreaseCount, setIsCartOpen } =
  cartSlice.actions;

export default cartSlice.reducer;
