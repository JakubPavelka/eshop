import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PropItem = {
  id: number;
  title: string;
  desc: string;
  category: string;
  price: number;
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  count?: number;
  image?: string;
  isAddedFav?: boolean;
};

interface Item extends PropItem {}
interface CartItems extends CartItem {}
interface FavouriteItem extends CartItem {}

interface ItemState {
  item: Item[];
  cart: CartItems[];
  fav: FavouriteItem[];
}

const initialState: ItemState = {
  item: [],
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  fav: JSON.parse(localStorage.getItem("favourites") || "[]"),
};

const itemsStateSlice = createSlice({
  name: "itemstate",
  initialState,
  reducers: {
    AddCartFav: (
      state,
      action: PayloadAction<{
        id: number;
        title?: string;
        price?: number;
        count?: number;
        image?: string;
        type: "cart" | "favourites";
      }>
    ) => {
      const { id, title, price, type, image } = action.payload;

      const alreadyFav = state.fav.find((item) => item.id === id);

      if (type === "cart") {
        const existingCartItem = state.cart.find((item) => item.id === id);

        if (existingCartItem) {
          existingCartItem.count = (existingCartItem.count || 1) + 1;
        } else if (title && price) {
          state.cart.push({ id, title, price, count: 1, image });
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else if (type === "favourites" && !alreadyFav) {
        if (title && price) {
          state.fav.push({ id, title, price, image, isAddedFav: true });
          localStorage.setItem("favourites", JSON.stringify(state.fav));
        }
      } else if (type === "favourites" && alreadyFav) {
        state.fav = state.fav.filter((item) => item.id !== id);
        alreadyFav.isAddedFav = false;
        localStorage.setItem("favourites", JSON.stringify(state.fav));
      }
    },
    RemoveCartFav: (
      state,
      action: PayloadAction<{ id: number; type: "cart" | "favourites" }>
    ) => {
      const { id, type } = action.payload;
      if (type === "cart") {
        state.cart = state.cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      } else if (type === "favourites") {
        state.fav = state.fav.filter((item) => item.id !== id);
        localStorage.setItem("favourites", JSON.stringify(state.fav));

        const favItem = state.cart.find((item) => item.id === id);
        if (favItem) {
          favItem.isAddedFav = false;
        }
      }
    },
    IncreaseDecreaseCart: (
      state,
      action: PayloadAction<{ id: number; type: "increase" | "decrease" }>
    ) => {
      const { id, type } = action.payload;

      const cartItem = state.cart.find((item) => item.id === id);

      if (cartItem) {
        if (type === "increase") {
          cartItem.count = (cartItem.count || 1) + 1;
        } else if (type === "decrease") {
          if (cartItem.count && cartItem.count > 1) {
            cartItem.count -= 1;
          } else {
            state.cart = state.cart.filter((item) => item.id !== id);
          }
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    IncreaseByAmount: (
      state,
      action: PayloadAction<{ id: number; count: number }>
    ) => {
      const { id, count } = action.payload;

      const byAmount = state.cart.find((item) => item.id === id);

      if (byAmount) {
        byAmount.count = count;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export default itemsStateSlice.reducer;
export const {
  AddCartFav,
  RemoveCartFav,
  IncreaseDecreaseCart,
  IncreaseByAmount,
} = itemsStateSlice.actions;
