import { createSlice } from "@reduxjs/toolkit";

const screenerSlice = createSlice({
  name: "screener",
  initialState: {
    priceUpVolumeUpData: [],
    priceDownVolumeUpData: [],
    screenerLoading: false,
    promoterShareData: [],
  },
  reducers: {
    setPriceUpVolumeUpData(state, action) {
      state.priceUpVolumeUpData = action.payload;
    },
    setPriceDownVolumeUpData(state, action) {
      state.priceDownVolumeUpData = action.payload;
    },
    setScreenerLoading(state, action) {
      state.screenerLoading = action.payload;
    },
    setPromoterShareData(state, action) {
      state.promoterShareData = action.payload;
    },
  },
});

export const {
  setPriceUpVolumeUpData,
  setPriceDownVolumeUpData,
  setScreenerLoading,
  setPromoterShareData,
} = screenerSlice.actions;
export default screenerSlice.reducer;
