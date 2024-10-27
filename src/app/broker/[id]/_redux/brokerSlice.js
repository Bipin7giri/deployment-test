import { createSlice } from "@reduxjs/toolkit";

const toolsSlice = createSlice({
    name: "broker",
    initialState: {
        loading: false,
        brokerDetails: [],

        brokerBreakDownTotalSelling: null,
        isLoadingbrokerBreakDownTotalSelling: false,
        isErrorbrokerBreakDownTotalSelling: false,

        brokerBreakDownTopFiveSymbol: null,
        isLoadingbrokerBreakDownTopFiveSymbol: false,
        isErrorbrokerBreakDownTopFiveSymbol: false,

        brokerBreakDownTopFiveId: null,
        isLoadingbrokerBreakDownTopFiveId: false,
        isErrorbrokerBreakDownTopFiveId: false,

        brokerHystoricBuy: [],
        brokerHystoricSell: [],
        brokerHystoricBuyBySym: [],
        brokerHystoricSellBySym: [],
        historicalInformationByBroker: [],
        historicalInformationByTopBuysellBroker: [],

        topBuyingBrokers: [],
        topSellingBroker: [],

        brokerChooseSymbol: null,

    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setBrokerDetails(state, action) {
            state.brokerDetails = action.payload;
        },

        // top selling
        setBrokerBreakDownTotalSellingLoading(state, action) {
            state.isLoadingbrokerBreakDownTotalSelling = action.payload
        },
        setBrokerBreakDownTotalSelling(state, action) {
            state.brokerBreakDownTotalSelling = action.payload;
        },
        setBrokerBreakDownTotalSellingError(state, action) {
            state.isErrorbrokerBreakDownTotalSelling = action.payload
        },
        // top five by company symbol
        setBrokerBreakDownBreakDownTopFiveSymbolLoading(state, action) {
            state.isLoadingbrokerBreakDownTopFiveSymbol = action.payload
        },
        setBrokerBreakDownBreakDownTopFiveSymbol(state, action) {
            state.brokerBreakDownTopFiveSymbol = action.payload;
        },
        setBrokerBreakDownBreakDownTopFiveSymbolError(state, action) {
            state.isErrorbrokerBreakDownTopFiveSymbol = action.payload
        },

        // top five by broker Id

        setBrokerBreakDownBreakDownTopFiveIdLoading(state, action) {
            state.isLoadingbrokerBreakDownTopFiveId = action.payload
        },
        setBrokerBreakDownBreakDownTopFiveId(state, action) {
            state.brokerBreakDownTopFiveId = action.payload;
        },
        setBrokerBreakDownBreakDownTopFiveIdError(state, action) {
            state.isErrorbrokerBreakDownTopFiveId = action.payload
        },
        setBrokerHystoricBuy(state, action) {
            state.brokerHystoricBuy = action.payload
        },
        setBrokerHystoricSell(state, action) {
            state.brokerHystoricSell = action.payload
        },
        setBrokerHystoricBuyBySym(state, action) {
            state.brokerHystoricBuyBySym = action.payload
        },
        setBrokerHystoricSellBySym(state, action) {
            state.brokerHystoricSellBySym = action.payload
        },
        setHistoricalInformationByBroker(state, action) {
            state.historicalInformationByBroker = action.payload
        },
        setHistoricalInformationByTopBuysellBroker(state, action) {
            state.historicalInformationByTopBuysellBroker = action.payload
        },
        setTopSellingBroker(state, action) {
            state.topSellingBroker = action.payload
        },
        setTopBuyingBroker(state, action) {
            state.topBuyingBrokers = action.payload
        },
        setBrokerChooseSymbol(state, action){
            state.brokerChooseSymbol = action.payload
        }



    }
});

export const {
    setLoading,
    setBrokerDetails,
    setBrokerBreakDownTotalSellingLoading,
    setBrokerBreakDownTotalSelling,
    setBrokerBreakDownTotalSellingError,

    setBrokerBreakDownBreakDownTopFiveSymbolLoading,
    setBrokerBreakDownBreakDownTopFiveSymbol,
    setBrokerBreakDownBreakDownTopFiveSymbolError,

    setBrokerBreakDownBreakDownTopFiveIdLoading,
    setBrokerBreakDownBreakDownTopFiveId,
    setBrokerBreakDownBreakDownTopFiveIdError,

    setBrokerHystoricBuy,
    setBrokerHystoricSell,
    setBrokerHystoricBuyBySym,
    setBrokerHystoricSellBySym,
    setHistoricalInformationByBroker,
    setHistoricalInformationByTopBuysellBroker,

    setTopSellingBroker,
    setTopBuyingBroker,

    setBrokerChooseSymbol,

} = toolsSlice.actions;

export default toolsSlice.reducer;