import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Rating {
  rate: number;
  count: number;
}

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface itemsApiState {
  loading: boolean;
  items: Item[];
  error: string;
  randomizedItems: Item[];
}

const initialState: itemsApiState = {
  loading: false,
  items: [],
  error: "",
  randomizedItems: [],
};

export const fetchItems = createAsyncThunk<Item[], string | undefined>(
  "item/fetchItem",
  async (category) => {
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : "https://fakestoreapi.com/products/";
    return axios.get<Item[]>(url).then((response) => response.data);
  }
);

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setRandomizedItems: (state, action: PayloadAction<Item[]>) => {
      state.randomizedItems = action.payload;
    },
    resetItems: (state) => {
      state.items = [];
      state.randomizedItems = [];
      state.error = "";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      fetchItems.fulfilled,
      (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.error = "";
        const shuffledItems = [...action.payload].sort(
          () => Math.random() - 0.5
        );
        state.randomizedItems = shuffledItems;
      }
    );
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message || "Failed to fetch items";
    });
  },
});

export const { setRandomizedItems, resetItems } = itemsSlice.actions;
export default itemsSlice.reducer;
