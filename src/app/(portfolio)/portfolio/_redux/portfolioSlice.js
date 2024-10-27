import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    loading: false,
    user: [],
    shareHolder: [],
    postPortfolio: [],
    shareHolderByUserId: [],
    brokerInfo: [],
    activeStockCompany: [],
    portfolioHolderByShid: [],
    shareHolderId: null,
    deletePortfoioData: [],
    portfolioSell: [],
    deletePortfolioHlder: [],
    shareType: [],
    isSellLooding: false,
    overallPortfolioLoading: false,
    isCSVUpload: false,
    portfolioVsInflation: [],
    selectedPortfolioHolder: null,
    selectedPortfolioHolderName: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setOverallPortfolioLoading(state, action) {
      state.overallPortfolioLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setShareHolder(state, action) {
      state.shareHolder = action.payload;
    },
    setPostPortfolio(state, action) {
      state.postPortfolio = action.payload;
    },
    setShareHolderByUserId(state, action) {
      state.shareHolderByUserId = action.payload;
    },
    setBrokerInfo(state, action) {
      state.brokerInfo = action.payload;
    },
    setActiveStockCompany(state, action) {
      state.activeStockCompany = action.payload;
    },
    setPortfolioHolderByShid(state, action) {
      state.portfolioHolderByShid = action.payload;
    },
    setShareHolderId(state, action) {
      state.shareHolderId = action.payload;
    },
    setDeletePortfoiloData(state, action) {
      state.deletePortfoioData = action.payload;
    },
    setPortfolioSell(state, action) {
      state.portfolioSell = action.payload;
    },
    setDeletePortfolioHlder(state, action) {
      state.deletePortfolioHlder = action.payload;
    },
    setShareType(state, action) {
      state.shareType = action.payload;
    },
    setIsSellLoading(state, action) {
      state.isSellLooding = action.payload;
    },
    setIsCSVUpload(state, action) {
      state.isCSVUpload = action.payload.isCSVUpload;
    },
    setPortfolioVsInflation(state, action) {
      state.portfolioVsInflation = action.payload;
    },
    setSelectedPortfolioHolder(state, action) {
      state.selectedPortfolioHolder = action.payload;
    },
    setSelectedPortfolioHolderName(state, action) {
      state.selectedPortfolioHolderName = action.payload;
    },
  },
});

export const {
  setLoading,
  setOverallPortfolioLoading,
  setUser,
  setShareHolder,
  setPostPortfolio,
  setShareHolderByUserId,
  setBrokerInfo,
  setActiveStockCompany,
  setPortfolioHolderByShid,
  setShareHolderId,
  setDeletePortfoiloData,
  setPortfolioSell,
  setDeletePortfolioHlder,
  setShareType,
  setIsSellLoading,
  setIsCSVUpload,
  setPortfolioVsInflation,
  setSelectedPortfolioHolder,
  setSelectedPortfolioHolderName,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
