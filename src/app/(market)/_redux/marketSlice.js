import { createSlice } from "@reduxjs/toolkit";

const marketSlice = createSlice({
  name: "market",
  initialState: {
    loading: false,
    liveMarketData: [],
    filterMarketLiveData: [],
    floorsheetData: [],
    floorsheetDataPagnitation: [],
    brokerStockBuying: [],
    brokerStockSelling: [],
    allBrokerDataBySymbol: [],
    stockBuyingBrokerBySymbol: [],
    stockSellingBrokerBySymbol: [],
    capitalizationLogic: [],
    stockDetailsBysector: [],
    heatMapData: [],
    heatMapDataBySector: [],
    sectorChartData: [],
    nepseChartData: [],
    nrbSectorData: [],
    productWiseLoan: [],
    choosedTechnicalSymbol: null,
    previousTechnicalSymbol: null,
    choosedTechnicalSector: null,
    dividendChecker: [],
    agmSgmData: [],
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setLiveMarketData(state, action) {
      state.liveMarketData = action.payload?.liveMarketData?.live_data;
    },
    setFilterMarketLiveData(state, action) {
      state.filterMarketLiveData = action.payload;
    },
    setFloorsheetData(state, action) {
      state.floorsheetData = action.payload;
    },
    setFloorsheetDataPagnitation(state, action) {
      state.floorsheetDataPagnitation = action.payload;
    },
    setBrokerStockBuying(state, action) {
      state.brokerStockBuying = action.payload;
    },
    setBrokerStockSelling(state, action) {
      state.brokerStockSelling = action.payload;
    },
    setAllBrokerDataBySymbol(state, action) {
      state.allBrokerDataBySymbol = action.payload;
    },
    setStockBuyingBrokerBySymbol(state, action) {
      state.stockBuyingBrokerBySymbol = action.payload;
    },
    setStockSellingBrokerBySymbol(state, action) {
      state.stockSellingBrokerBySymbol = action.payload;
    },
    setCapitalizationLogic(state, action) {
      state.capitalizationLogic = action.payload;
    },
    setStockDetailsBySector(state, action) {
      state.stockDetailsBysector = action.payload;
    },
    setHeatMapData(state, action) {
      state.heatMapData = action.payload;
    },
    setHeatMapDataBySector(state, action) {
      state.heatMapDataBySector = action.payload;
    },
    setSectorChartData(state, action) {
      state.sectorChartData = action.payload;
    },
    setNepseChartData(state, action) {
      state.nepseChartData = action.payload;
    },
    setNrbSetorData(state, action) {
      state.nrbSectorData = action.payload;
    },
    setProductWiseLoan(state, action) {
      state.productWiseLoan = action.payload;
    },
    setPreviousTechnicalSymbol(state, action) {
      state.previousTechnicalSymbol = action.payload;
    },
    setChoosedTechinicalSymbol(state, action) {
      state.choosedTechnicalSymbol = action.payload;
    },
    setChoosedTechinicalSector(state, action) {
      state.choosedTechnicalSector = action.payload;
    },
    setDividendChecker(state, action) {
      state.dividendChecker = action.payload;
    },
    setAgmSgmData(state, action) {
      state.agmSgmData = action.payload;
    },
  },
});

export const {
  setLoading,
  setLiveMarketData,
  setFilterMarketLiveData,
  setFloorsheetData,
  setFloorsheetDataPagnitation,
  setBrokerStockBuying,
  setBrokerStockSelling,
  setAllBrokerDataBySymbol,
  setStockBuyingBrokerBySymbol,
  setStockSellingBrokerBySymbol,
  setCapitalizationLogic,
  setStockDetailsBySector,
  setHeatMapData,
  setHeatMapDataBySector,
  setSectorChartData,
  setNepseChartData,
  setNrbSetorData,
  setProductWiseLoan,
  setPreviousTechnicalSymbol,
  setChoosedTechinicalSymbol,
  setChoosedTechinicalSector,
  setDividendChecker,
  setAgmSgmData,
} = marketSlice.actions;

export default marketSlice.reducer;
