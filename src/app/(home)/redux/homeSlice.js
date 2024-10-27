import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    marketLiveHomeData: {},
    isMarketLiveHomeDataLoading: true,
    isMarketLiveDataHomeError: false,
    loading: false,
    nepseIndex: [],
    subIndex: [],
    isSubIndexloading: false,
    statusCode: null,
    isNepeseIndexError: false,
    isSubIndexError: false,
    news: [],
    gainer: [],
    loser: [],
    isGainerAndLoserError: false,
    marketSummary: [],
    isMarketSummaryError: false,
    gainerStatus: false,
    volume: [],
    turnOver: [],
    isDropDownLoading: false,
    transcation: [],
    analysis: [],
    companies: [],
    inflation: [],
    isInflationLoading: false,
    isInflationError: false,
    interest: [],
    isInterestLoading: false,
    isInterestError: false,
    nepseLineChartData: [],
    isNepeseLineChartDataError: false,
    NRBdata: [],
    notification: [],
    sectorWiseRecentYearsQuater: [],
    subscriptionDetails: [],
    companyChartData: [],
    limitedLiveData: [],
    searchedLiveData: [],
    limitedLiveDataBySector: [],
    count: 0,
    fearGreedData: [],
    opinionQuestion: {},
    updatedPollOptions: [],
    watchlistData: [],
    saralPickData: [],
  },
  reducers: {
    setMarketLiveData(state, action) {
      state.marketLiveHomeData = action.payload.marketLiveHomeData;
    },
    setMarketLiveDataLoading(state, action) {
      state.isMarketLiveHomeDataLoading = action.payload;
    },
    setMarketLiveDataError(state, action) {
      state.isMarketLiveDataHomeError = true;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    setNepseIndex(state, action) {
      let tempPayload = [...action.payload.nepseIndex];
      tempPayload.sort(function (a, b) {
        if (a.sindex === "NEPSE Index") {
          return -1; // "NEPSE Index" comes before other elements
        } else if (b.sindex === "NEPSE Index") {
          return 1; // "NEPSE Index" comes after other elements
        } else {
          return 0; // Maintain the original order
        }
      });
      state.nepseIndex = tempPayload;
    },
    setSubIndex(state, action) {
      state.subIndex = action.payload.subIndex;
    },
    setSubIndexLoading(state, action) {
      state.isSubIndexloading = action.payload;
    },
    setNews(state, action) {
      state.news = action.payload.news;
    },
    setAnalysis(state, action) {
      state.analysis = action.payload.analysis;
    },
    setGainer(state, action) {
      state.gainer = action.payload.gainer;
    },
    setGainerStatus(state, action) {
      state.gainerStatus = action.payload.status;
    },
    setLoser(state, action) {
      state.loser = action.payload.loser;
    },
    setMarketSummary(state, action) {
      state.marketSummary = action.payload.summary;
    },

    setVolume(state, action) {
      state.volume = action.payload.volume;
    },
    setTurnOver(state, action) {
      state.turnOver = action.payload.turnOver;
    },

    setTranscation(state, action) {
      state.transcation = action.payload.transcation;
    },

    setCompanies(state, action) {
      state.companies = action.payload.companies;
    },

    setNepseLineChart(state, action) {
      state.nepseLineChartData = action.payload.nepseLineChartData;
    },
    setNepseChartDataError(state, action) {
      state.isNepeseLineChartDataError = true;
    },

    setMarketSummaryError(state) {
      state.isMarketSummaryError = true;
    },

    setIsDropDownLoading(state, action) {
      state.isDropDownLoading = action.payload;
    },
    setGainerLoserError(state) {
      state.isGainerAndLoserError = true;
    },
    setSubIndexError(state, action) {
      state.isSubIndexError = true;
    },

    setNepseIndexError(state, action) {
      state.isNepeseIndexError = true;
    },
    setInflation(state, action) {
      state.inflation = action.payload;
    },
    setIsInflationLoading(state, action) {
      state.isInflationLoading = action.payload;
    },
    setInflationError(state) {
      state.isInflationError = true;
    },
    setInterestLoading(state, action) {
      state.isInterestLoading = action.payload;
    },
    setInterest(state, action) {
      state.interest = action.payload;
    },
    setInterestError(state) {
      state.isInterestError = true;
    },
    setNRBdata(state, action) {
      state.NRBdata = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
    setSectorWiseRecentYearsQuater(state, action) {
      state.sectorWiseRecentYearsQuater = action.payload;
    },
    setSubscriptionDetails(state, action) {
      state.subscriptionDetails = action.payload;
    },
    setCompanyChartData(state, action) {
      state.companyChartData = action.payload;
    },
    setLimitedLiveData(state, action) {
      state.limitedLiveData = action.payload;
    },
    setSearchedLiveData(state, action) {
      state.searchedLiveData = action.payload;
    },
    setLimitedLiveDataBySector(state, action) {
      state.limitedLiveDataBySector = action.payload;
    },
    setCount(state, action) {
      state.count = action.payload;
    },
    setFearGreedData(state, action) {
      state.fearGreedData = action.payload;
    },
    setOpinionQuestion(state, action) {
      state.opinionQuestion = action.payload;
    },
    setUpatedPollOptions(state, action) {
      state.updatedPollOptions = action.payload;
    },
    setWatchlistData(state, action) {
      state.watchlistData = action.payload;
    },
    setSaralPickData(state, action) {
      state.saralPickData = action.payload;
    },
  },
});

export const {
  setMarketLiveData,
  setMarketLiveDataLoading,
  setMarketLiveDataError,
  setNepseIndex,
  setLoading,
  setNepseIndexError,
  setSubIndex,
  setSubIndexError,
  setNews,
  setGainer,
  setLoser,
  setGainerLoserError,
  setGainerStatus,
  setMarketSummary,
  setMarketSummaryError,
  setVolume,
  setTurnOver,
  setIsDropDownLoading,
  setTranscation,
  setAnalysis,
  setCompanies,
  setInflationError,
  setInflation,
  setIsInflationLoading,
  setInterest,
  setInterestLoading,
  setInterestError,
  setNepseLineChart,
  setNepseChartDataError,
  setSubIndexLoading,
  setNRBdata,
  setNotification,
  setSectorWiseRecentYearsQuater,
  setSubscriptionDetails,
  setCompanyChartData,
  setLimitedLiveData,
  setSearchedLiveData,
  setLimitedLiveDataBySector,
  setCount,
  setFearGreedData,
  setOpinionQuestion,
  setUpatedPollOptions,
  setWatchlistData,
  setSaralPickData,
} = homeSlice.actions;
export default homeSlice.reducer;
