import { createSlice } from "@reduxjs/toolkit";

const economySlice = createSlice({
  name: "economy",
  initialState: {
    mofAnnual: [],
    isMofLoading: false,
    isMofError: false,
    expenditureAndRevenue: [],
    isExpenditureAndRevenueError: false,
    isExpenditureAndRevenueLoading: false,
    importAndExport: [],
    isImportAndExportError: false,
    isImportAndExportLoading: false,
    remittancesAndDebt: [],
    isremittancesAndDebtError: false,
    isremittancesAndDebtLoading: false,
    importBreakDown: [],
    isimportBreakDownError: false,
    isimportBreakDownLoading: false,
    exportBreakDown: [],
    isexportBreakDownError: false,
    isexportBreakDownLoading: false,
    highlightsImport: [],
    highlightsImportError: false,
    highlightsLoding: false,
    calculatedHighLight: [],
    calculatedHighLightLoading: false,
    calculatedHighLightError: false,
  },
  reducers: {
    setMofAnnual(state, action) {
      state.mofAnnual = action.payload.mofAnnual;
    },
    setMofAnnualLoading(state, action) {
      state.isMofLoading = action.payload;
    },
    setMofAnnualError(state, action) {
      state.isMofError = true;
    },

    setExpenditureAndRevenue(state, action) {
      state.expenditureAndRevenue = action.payload.data;
    },
    setExpenditureAndRevenueError(state, action) {
      state.isExpenditureAndRevenueError = true;
    },
    setExpenditureAndRevenueLoading(state, action) {
      state.isExpenditureAndRevenueLoading = action.payload;
    },
    setImportAndExport(state, action) {
      state.importAndExport = action.payload.data;
    },
    setImportAndExportError(state, action) {
      state.isImportAndExportError = true;
    },
    setImportAndExportLoading(state, action) {
      state.isImportAndExportLoading = action.payload;
    },
    setremittancesAndDebt(state, action) {
      state.remittancesAndDebt = action.payload.data;
    },
    setremittancesAndDebtError(state, action) {
      state.isremittancesAndDebtError = true;
    },
    setremittancesAndDebtLoading(state, action) {
      state.isremittancesAndDebtLoading = action.payload;
    },
    setImportBreakDown(state, action) {
      state.importBreakDown = action.payload.data;
    },
    setImportBreakDownError(state, action) {
      state.isImportAndExportError = true;
    },
    setImportBreakDownLoading(state, action) {
      state.isimportBreakDownLoading = action.payload;
    },
    setExportBreakDown(state, action) {
      state.exportBreakDown = action.payload.data;
    },
    setExportBreakDownError(state, action) {
      state.isexportBreakDownError = true;
    },
    setExportBreakDownLoading(state, action) {
      state.isexportBreakDownLoading = action.payload;
    },
    // highlight Import
    setHightlightImport(state, action) {
      const data = action.payload;
      const finalData = [];
      for (const key in data) {
        finalData.push(data[key]);
      }
      state.highlightsImport =finalData;
    },
    setHighlightImportError(state) {
      state.highlightsImportError = true;
    },
    setHightLightLoading(state, action) {
      state.highlightsLoding = action.payload;
    },
    // Calculated Import
    setCalculatedHighLight(state, action) {
      const data = action.payload;
      let ob = [];
      for (let i = 0; i < data.length; i++) {
        ob.push(Object.values(data[i]));
      }
      const mergedArr = ob.reduce((acc, val) => acc.concat(val), []);
      state.calculatedHighLight = mergedArr;
    },
    setCalculateHightLoading(state,action) {
      state.calculatedHighLightLoading = action.payload;
    },
    setCalculatedHighLightError(state) {
      state.calculatedHighLightError = true;
    },
  },
});

export const {
  setMofAnnual,
  setMofAnnualError,
  setMofAnnualLoading,
  setExpenditureAndRevenue,
  setExpenditureAndRevenueError,
  setExpenditureAndRevenueLoading,
  setImportAndExport,
  setImportAndExportError,
  setImportAndExportLoading,
  setremittancesAndDebt,
  setremittancesAndDebtError,
  setremittancesAndDebtLoading,
  setImportBreakDown,
  setImportBreakDownError,
  setImportBreakDownLoading,
  setExportBreakDown,
  setExportBreakDownError,
  setExportBreakDownLoading,
  setHightlightImport,
  setHighlightImportError,
  setHightLightLoading,
  setCalculatedHighLight,
  setCalculateHightLoading,
  setCalculatedHighLightError,
} = economySlice.actions;
export default economySlice.reducer;
