import { createSlice } from '@reduxjs/toolkit';
import { IItem } from '../components/global/Types';

// export interface IItemState {
//   count: number;
//   price: number;
// }

export interface ICartState {
  isCartOpen: boolean;
  cart: Array<any>;
  items: Array<IItem>;
}

const initialState: ICartState = { isCartOpen: false, cart: [], items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    addToCart(state, action) {
      state.cart = [...state.cart, action.payload.item];
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseCount(state, action) {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) item.count++;
        return item;
      });
    },
    decreaseCount(state, action) {
      state.cart = state.cart.map((item) => {
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
