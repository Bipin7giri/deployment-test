import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import actions from "./actions";
import {
  getAgmSgmReq,
  getAllBrokerDataBySymbolReq,
  getBrokerStockBuyingReq,
  getBrokerStockSellingReq,
  getCapitalizationLogic,
  getDividendCheckerReq,
  getFilterMarketLiveDataReq,
  getFloorsheetDataReq,
  getHeatMapDataBySectorReq,
  getHeatMapDataReq,
  getLiveMarketData,
  getNepseChartDataReq,
  getNrbTransactionDataReq,
  getProductWiseLoanReq,
  getSectorChartDataReq,
  getStockBuyingBrokerBySymbolReq,
  getStockDetailsBySectorReq,
  getStockSellingBrokerBySymbolReq,
} from "./api";
import {
  setAgmSgmData,
  setAllBrokerDataBySymbol,
  setBrokerStockBuying,
  setBrokerStockSelling,
  setCapitalizationLogic,
  setDividendChecker,
  setFilterMarketLiveData,
  setFloorsheetData,
  setHeatMapData,
  setHeatMapDataBySector,
  setLiveMarketData,
  setLoading,
  setNepseChartData,
  setNrbSetorData,
  setProductWiseLoan,
  setSectorChartData,
  setStockBuyingBrokerBySymbol,
  setStockDetailsBySector,
  setStockSellingBrokerBySymbol,
} from "./marketSlice";

function* callMarketLiveData(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getLiveMarketData);
    yield put(
      setLiveMarketData({
        liveMarketData: response?.data?.data,
        statusCode: response?.data?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callFilterMarketLiveDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getFilterMarketLiveDataReq, {
      ltpMin: action.payload.ltpMin,
      ltpMax: action.payload.ltpMax,
      marketCapMin: action.payload.marketCapMin,
      marketCapMax: action.payload.marketCapMax,
      fiftyTwoWeekLow: action.payload.fiftyTwoWeekLow,
      fiftyTwoWeekHigh: action.payload.fiftyTwoWeekHigh,
      sectors: action.payload.sectors,
    });
    yield put(
      setFilterMarketLiveData({
        filterMarketData: response?.data?.data,
        statusCode: response?.data?.status,
        message: response?.data?.message,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callFloorsheetDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getFloorsheetDataReq, {
      page: action.payload.page,
      pageSize: action.payload.pageSize,
    });
    yield put(
      setFloorsheetData({
        floorsheet: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callBrokerStockBuyingReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getBrokerStockBuyingReq);
    yield put(
      setBrokerStockBuying({
        buy: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callBrokerStockSellingReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getBrokerStockSellingReq);
    yield put(
      setBrokerStockSelling({
        sell: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetAllBrokerDataBySymbolReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllBrokerDataBySymbolReq);
    yield put(
      setAllBrokerDataBySymbol({
        data: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callStockBuyingBrokerBySymbolReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStockBuyingBrokerBySymbolReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setStockBuyingBrokerBySymbol({
        data: response?.data?.data ? response?.data?.data : [],
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callCapitalizatonLogicReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getCapitalizationLogic);
    yield put(
      setCapitalizationLogic({
        data: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callStockSellingBrokerBySymbolReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStockSellingBrokerBySymbolReq, {
      symbol: action.payload.symbol,
    });
    yield put(
      setStockSellingBrokerBySymbol({
        data: response?.data?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callStockDetailsBySectorReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getStockDetailsBySectorReq, {
      sector: action.payload.sector,
    });
    yield put(
      setStockDetailsBySector({
        data: response?.data,
        statusCode: response?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetHeatMapDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getHeatMapDataReq, {});
    yield put(
      setHeatMapData({
        data: response?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetHeatMapDataBySectorReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getHeatMapDataBySectorReq, action.payload);
    yield put(
      setHeatMapDataBySector({
        data: response?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetSectorChartDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSectorChartDataReq, {
      sectorId: action.payload.sectorId,
      timeStamp: action.payload.timeStamp,
    });
    yield put(
      setSectorChartData({
        data: response?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetNepseChartDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getNepseChartDataReq, {
      // sectorId: action.payload.sectorId,
      // timeStamp: action.payload.timeStamp,
    });
    yield put(
      setNepseChartData({
        data: response?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetNrbTransactionSectorDataReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getNrbTransactionDataReq, {
      // sectorId: action.payload.sectorId,
      // timeStamp: action.payload.timeStamp,
    });
    yield put(
      setNrbSetorData({
        data: response?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetProductWiseLoanReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getProductWiseLoanReq, {
      sector: action.payload.sector,
    });
    yield put(
      setProductWiseLoan({
        data: response?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetDividendCheckerReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getDividendCheckerReq, {
      period: action.payload.period,
    });
    yield put(
      setDividendChecker({
        data: response?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetAgmSgmReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAgmSgmReq, {});
    yield put(
      setAgmSgmData({
        data: response?.data?.data,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

export function* marketLiveData() {
  yield takeLatest(actions.GET_LIVE_MARKET_DATA, callMarketLiveData);
}
export function* callCapitalizationLogic() {
  yield takeLatest(actions.GET_CAPITALIZATION_LOGIC, callCapitalizatonLogicReq);
}
export function* callFilterMarketLiveData() {
  yield takeLatest(
    actions.GET_FILTER_MARKET_LIVE_DATA,
    callFilterMarketLiveDataReq
  );
}
export function* callFloorsheetData() {
  yield takeLatest(actions.GET_FLOORSHEET_DATA, callFloorsheetDataReq);
}
export function* callBrokerStockBuying() {
  yield takeLatest(actions.GET_BROKER_STOCK_BUYING, callBrokerStockBuyingReq);
}
export function* callBrokerStockSelling() {
  yield takeLatest(actions.GET_BROKER_STOCK_SELLING, callBrokerStockSellingReq);
}
export function* callAllBrokerDataBySymbol() {
  yield takeLatest(
    actions.GET_ALL_BROKER_DATA_BY_SYMBOL,
    callGetAllBrokerDataBySymbolReq
  );
}
export function* callStockBuyingBrokerBySymbol() {
  yield takeLatest(
    actions.GET_STOCK_BUYING_BROKER_BY_SYMBOL,
    callStockBuyingBrokerBySymbolReq
  );
}
export function* callStockSellingBrokerBySymbol() {
  yield takeLatest(
    actions.GET_STOCK_SELLING_BROKER_BY_SYMBOL,
    callStockSellingBrokerBySymbolReq
  );
}
export function* callStockDetailsBySector() {
  yield takeLatest(
    actions.GET_STOCK_DETAILS_BY_SECTOR,
    callStockDetailsBySectorReq
  );
}
export function* callGetHeatMapData() {
  yield takeLatest(actions.GET_HEAT_MAP_DATA, callGetHeatMapDataReq);
}
export function* callGetHeatMapDataBySector() {
  yield takeLatest(
    actions.GET_HEAT_MAP_DATA_BY_SECTOR,
    callGetHeatMapDataBySectorReq
  );
}
export function* callGetSectorChartData() {
  yield takeLatest(actions.GET_SECTOR_CHART_DATA, callGetSectorChartDataReq);
}
export function* callGetNepseChartData() {
  yield takeLatest(actions.GET_NEPSE_CHART_DATA, callGetNepseChartDataReq);
}
export function* callGetNrbTransactionSectorData() {
  yield takeLatest(
    actions.GET_NRB_TRANSACTION_DATA,
    callGetNrbTransactionSectorDataReq
  );
}
export function* callGetProductWiseLoan() {
  yield takeLatest(actions.GET_PRODUCTWISE_LOAN, callGetProductWiseLoanReq);
}
export function* callGetDividendChecker() {
  yield takeLatest(actions.GET_DIVIDEND_CHECKER, callGetDividendCheckerReq);
}
export function* callGetAgmSgm() {
  yield takeLatest(actions.GET_AGM_SGM, callGetAgmSgmReq);
}

export default function* marketSaga() {
  yield all([
    fork(marketLiveData),
    fork(callFilterMarketLiveData),
    fork(callFloorsheetData),
    fork(callBrokerStockBuying),
    fork(callBrokerStockSelling),
    fork(callAllBrokerDataBySymbol),
    fork(callStockBuyingBrokerBySymbol),
    fork(callStockSellingBrokerBySymbol),
    fork(callCapitalizationLogic),
    fork(callStockDetailsBySector),
    fork(callGetHeatMapData),
    fork(callGetHeatMapDataBySector),
    fork(callGetSectorChartData),
    fork(callGetNepseChartData),
    fork(callGetNrbTransactionSectorData),
    fork(callGetProductWiseLoan),
    fork(callGetDividendChecker),
    fork(callGetAgmSgm),
  ]);
}
