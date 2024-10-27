import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import {
  getEconomyChartData,
  getMOFAnnual,
  getHighlightImportExoprt,
  getCalculatedHighlight,
} from "../redux/api";
import {
  setExpenditureAndRevenue,
  setExpenditureAndRevenueError,
  setExpenditureAndRevenueLoading,
  setExportBreakDown,
  setImportAndExport,
  setImportAndExportLoading,
  setImportBreakDown,
  setMofAnnual,
  setMofAnnualError,
  setMofAnnualLoading,
  setremittancesAndDebt,
  setHightlightImport,
  setHighlightImportError,
  setHightLightLoading,
  setCalculatedHighLight,
  setCalculateHightLoading,
} from "./economySlice";
import economyActions from "./actions";

function* getMOFAnnualReq(action) {
  try {
    yield put(setMofAnnualLoading(true));
    const res = yield call(getMOFAnnual);
    yield put(
      setMofAnnual({
        mofAnnual: res?.data?.data,
      })
    );
    yield put(setMofAnnualLoading(false));
  } catch (err) {
    yield put(setMofAnnualError(true));
    yield put(setMofAnnualLoading(false));
  }
}
// EconomyChartData
function* getEconomyChartDataReq(action) {
  try {
    yield put(setExpenditureAndRevenueLoading(true));
    const [
      revenueandexpenditure,
      importAndExport,
      remittancesAndDebt,
      importBreakDown,
      exportBreakDown,
    ] = yield call(getEconomyChartData, {
      chartData: action.payload,
    });
    yield put(
      setExpenditureAndRevenue({
        data: revenueandexpenditure,
      })
    );
    yield put(
      setImportAndExport({
        data: importAndExport,
      })
    );
    yield put(
      setremittancesAndDebt({
        data: remittancesAndDebt,
      })
    );
    yield put(
      setImportBreakDown({
        data: importBreakDown,
      })
    );
    yield put(
      setExportBreakDown({
        data: exportBreakDown,
      })
    );
    yield put(setExpenditureAndRevenueLoading(false));

    yield put(setImportAndExportLoading(false));
  } catch (err) {
    yield put(setExpenditureAndRevenueError(true));
    yield put(setExpenditureAndRevenueLoading(false));
  }
}

function* getImportExport() {
  try {
    yield put(setHightLightLoading(true));
    const res = yield call(getHighlightImportExoprt);
    yield put(setHightlightImport(res.data));
    yield put(setHightLightLoading(false));
  } catch (err) {
    yield put(setHighlightImportError(true));
    yield put(setHightLightLoading(false));
  }
}

function* getCalculated() {
  try {
    yield put(setCalculateHightLoading(true));
    const res = yield call(getCalculatedHighlight);
    yield put(setCalculatedHighLight(res.data));
    yield put(setCalculateHightLoading(false));
  } catch (err) {
    yield put(setExpenditureAndRevenueError(true));
    yield put(setExpenditureAndRevenueLoading(false));
  }
}

// **************************--------------*********************

export function* MOFAnnual() {
  yield takeLatest(economyActions.GET_MOF_ANNUAL_REQ, getMOFAnnualReq);
}

export function* highlightimportexport() {
  yield takeLatest(
    economyActions.GET_Highlights_Import_Export,
    getImportExport
  );
}

export function* calculatedimportexport() {
  yield takeLatest(economyActions.GET_Calculated_HighLights, getCalculated);
}

export function* economyChartData() {
  yield takeLatest(
    economyActions.GET_ECONOMY_CHARTDATA_REQ,
    getEconomyChartDataReq
  );
}
export default function* economySaga() {
  yield all([
    fork(MOFAnnual),
    fork(economyChartData),
    fork(highlightimportexport),
    fork(calculatedimportexport),
  ]);
}
