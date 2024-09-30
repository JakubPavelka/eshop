import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  lowToHigh: boolean | undefined;
  highToLow: boolean | undefined;
}

interface Filter {
  filterPrice: FilterState;
  filterRating: FilterState;
}

const initialState: Filter = {
  filterPrice: {
    lowToHigh: undefined,
    highToLow: undefined,
  },
  filterRating: {
    lowToHigh: undefined,
    highToLow: undefined,
  },
};

const itemsFilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    lowToHighReducer: (
      state,
      action: PayloadAction<"filterPrice" | "filterRating">
    ) => {
      const type = action.payload;

      const resetFilters = () => {
        state.filterPrice.lowToHigh = undefined;
        state.filterPrice.highToLow = undefined;
        state.filterRating.lowToHigh = undefined;
        state.filterRating.highToLow = undefined;
      };

      resetFilters();

      if (type === "filterPrice") {
        state.filterPrice.lowToHigh = true;
      } else if (type === "filterRating") {
        state.filterRating.lowToHigh = true;
      }
    },

    highToLowReducer: (
      state,
      action: PayloadAction<"filterPrice" | "filterRating">
    ) => {
      const type = action.payload;

      const resetFilters = () => {
        state.filterPrice.lowToHigh = undefined;
        state.filterPrice.highToLow = undefined;
        state.filterRating.lowToHigh = undefined;
        state.filterRating.highToLow = undefined;
      };

      resetFilters();

      if (type === "filterPrice") {
        state.filterPrice.highToLow = true;
      } else if (type === "filterRating") {
        state.filterRating.highToLow = true;
      }
    },

    resetFilterReducer: (state) => {
      state.filterPrice.lowToHigh = undefined;
      state.filterPrice.highToLow = undefined;

      state.filterRating.lowToHigh = undefined;
      state.filterRating.highToLow = undefined;
    },
  },
});

export const { lowToHighReducer, highToLowReducer, resetFilterReducer } =
  itemsFilterSlice.actions;
export default itemsFilterSlice.reducer;
