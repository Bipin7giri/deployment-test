import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: {
    loading: false,
    myWatchList: [],
    isMyWatchListError: false,
    deleteWatchList: [],
  },

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setMyWatchList(state, action) {
      const data = action.payload;
      const tableData = data?.map((item, id) => {
        return {
          sno: id + 1,
          symbol: item.symbol,
          id: item.id,
          ltp: item.lastTradedPrice,
          change: item.schange,
          previousPrice: item.previousClose,
        };
      });
      state.myWatchList = tableData;
    },
    setDeleteWatchList(state, actions) {
      state.deleteWatchList = actions.payload;
    },
  },
});

export const { setLoading, setMyWatchList, setDeleteWatchList } =
  watchListSlice.actions;

export default watchListSlice.reducer;
