import { createSlice } from "@reduxjs/toolkit";
import actions from "./action";

const toolsSlice = createSlice({
    name: "tools",
    initialState: {
        loading: false,
        ipoData: [],
        auctionData: [],
        calculateBuy: {},
        calculateSell: {},
        calenderData: [],
        promoCodeRequest: [],
        scrennerV2Data: [],
        screenerFilterList: [],
        saveScreener: [],
        getAllSavedScreener: [],
        screenerByID: [],
        isSavedOrLoadedScreener: false,
        sectorRotation: [],


    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setIpoData(state, action) {
            state.ipoData = action.payload;
        },
        setAuctionData(state, action) {
            state.auctionData = action.payload;
        },
        setCalculateBuy(state, action) {
            state.calculateBuy = action.payload;
        },
        setCalculateSell(state, action) {
            state.calculateSell = action.payload;
        },
        setCalenderData(state, action) {
            state.calenderData = action.payload;
        },
        setPromoCodeRequest(state, action) {
            state.promoCodeRequest = action.payload;
        },
        setScrennerV2Data(state, action) {
            state.scrennerV2Data = action.payload;
        },
        setScreenerFilterList(state, action) {
            state.screenerFilterList = action.payload;
        },
        setSaveScreener(state, action) {
            state.saveScreener = action.payload;
        },
        setAllGetSavedScreener(state, action) {
            state.getAllSavedScreener = action.payload;
        },
        setScreenerByID(state, action) {
            state.screenerByID = action.payload;
        },
        updateScreenerById(state, action) {
            const updatedScreener = state.getAllSavedScreener.data.map((sc) => {
                return sc.id === action.payload.data.id ? action.payload.data : sc;
            })
            state.getAllSavedScreener.data = updatedScreener;
        },
        filterScreenerById(state, action) {
            const filteredScreener = state.getAllSavedScreener.data.filter((sc) => {
                return sc.id !== action.payload.id;
            })
            state.getAllSavedScreener.data = filteredScreener;
        },
        setSavedOrLoaded(state, action) {
            state.isSavedOrLoadedScreener = action.payload;
        },
        setSectorRotation(state, action) {
            state.sectorRotation = action.payload;
        },
    }
});

export const {
    setLoading,
    setIpoData,
    setAuctionData,
    setCalculateBuy,
    setCalculateSell,
    setCalenderData,
    setPromoCodeRequest,
    setScrennerV2Data,
    setScreenerFilterList,
    setSaveScreener,
    setAllGetSavedScreener,
    setScreenerByID,
    setSavedOrLoaded,
    filterScreenerById,
    updateScreenerById,
    setSectorRotation,


} = toolsSlice.actions;

export default toolsSlice.reducer;