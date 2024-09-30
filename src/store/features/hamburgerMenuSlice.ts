import { createSlice } from "@reduxjs/toolkit";

interface HamburgerMenu {
  isOpen: boolean;
}

const initialState: HamburgerMenu = {
  isOpen: false,
};

const hamburgerMenuSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      if (window.innerWidth <= 767) {
        state.isOpen = !state.isOpen;
      }
    },
    closeMenu: (state) => {
      if (window.innerWidth <= 767) {
        state.isOpen = false;
      }
    },
  },
});

export default hamburgerMenuSlice.reducer;
export const { toggleMenu, closeMenu } = hamburgerMenuSlice.actions;
