import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import itemsReducer from "./features/itemsSlice";
import hamburgerReducer from "./features/hamburgerMenuSlice";
import favitemsReducer from "./features/itemsStateSlice";
import filterReducer from "./features/itemsFilterSlice";
import searchReducer from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    hamburger: hamburgerReducer,
    itemstate: favitemsReducer,
    filter: filterReducer,
    search: searchReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
