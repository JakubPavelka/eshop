import { createSlice } from "@reduxjs/toolkit";

interface SearchBarState {
  isOpen: boolean;
}

const initialState: SearchBarState = {
  isOpen: false,
};

const searchSlice = createSlice({
  name: "searchBar",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSearch: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openSearch, closeSearch } = searchSlice.actions;
export default searchSlice.reducer;
