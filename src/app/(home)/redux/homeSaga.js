import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  getMarketDataHomeLive,
  getAnalysis,
  getCompany,
  getGainer,
  getInflation,
  getLoser,
  getMarketSummary,
  getNepseIndex,
  getNews,
  getSubIndex,
  getTranscation,
  getTurnOver,
  getVolume,
  getInterest,
  getChartData,
  getChartDataToday,
  getNRBIndicator,
  getNotificationReq,
  getSectorwiseRecentYearQuaterReq,
  getSubscriptionDetailsReq,
  getCompanyChartDataReq,
  getLimitedLiveDataReq,
  getFearGreedDataReq,
  getOpinionQuestionReq,
  voteOpinionPollReq,
  getWatchlistDataReq,
  getSearchedLiveDataReq,
  getLimitedLiveDataBySectorReq,
  getSaralPickDataReq,
} from "@/app/(home)/redux/api";
import actions from "@/app/(home)/redux/actions";

import {
  setMarketLiveData,
  setMarketLiveDataLoading,
  setMarketLiveDataError,
  setAnalysis,
  setCompanies,
  setGainer,
  setGainerLoserError,
  setInflation,
  setIsInflationLoading,
  setInflationError,
  setInterest,
  setInterestLoading,
  setInterestError,
  setIsDropDownLoading,
  setLoading,
  setLoser,
  setMarketSummary,
  setMarketSummaryError,
  setNepseChartDataError,
  setNepseIndex,
  setNepseIndexError,
  setNepseLineChart,
  setNews,
  setSubIndex,
  setSubIndexError,
  setTranscation,
  setTurnOver,
  setVolume,
  setSubIndexLoading,
  setNRBdata,
  setNotification,
  setSectorWiseRecentYearsQuater,
  setGainerStatus,
  setSubscriptionDetails,
  setCompanyChartData,
  setLimitedLiveData,
  setCount,
  setFearGreedData,
  setOpinionQuestion,
  setUpatedPollOptions,
  setWatchlistData,
  setSearchedLiveData,
  setLimitedLiveDataBySector,
  setSaralPickData,
} from "@/app/(home)/redux/homeSlice";

function* marketDataHomeLive() {
  try {
    yield put(setMarketLiveDataLoading(true));
    const response = yield call(getMarketDataHomeLive);

    yield put(
      setMarketLiveData({
        marketLiveHomeData: response.data.data,
      })
    );
    yield put(setMarketLiveDataLoading(false));
  } catch (err) {
    yield put(setMarketLiveDataLoading(false));
    yield put(setMarketLiveDataError());
  }
}

function* callNEPSEindexReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getNepseIndex);
    yield put(
      setNepseIndex({
        nepseIndex: response?.data?.data,
        statusCode: response?.data?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    yield put(setScreenerError());
  }
}

function* callSubIndexReq() {
  try {
    yield put(setSubIndexLoading(true));
    const response = yield call(getSubIndex);
    yield put(
      setSubIndex({
        subIndex: response.data.data,
        statusCode: response.data.status,
      })
    );
    yield put(setSubIndexLoading(false));
  } catch (err) {
    setSubIndexLoading(false);
    yield put(setSubIndexError());
  }
}
function* callNewsReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getNews);
    yield put(
      setNews({
        news: response.data.data,
        statusCode: response.data.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    // yield put(setNew());
  }
}

function* callAnalysisReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAnalysis);
    yield put(
      setAnalysis({
        analysis: response.data.data,
        statusCode: response.data.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
    // yield put(setNew());
  }
}

function* callGainerReq(action) {
  try {
    yield put(setIsDropDownLoading(true));
    const gainer = yield call(getGainer);
    yield put(
      setGainer({
        gainer: gainer?.data?.data,
        statusCode: gainer?.data?.status,
      })
    );
    yield put(setGainerStatus({ status: true }));
    yield put(setIsDropDownLoading(false));
  } catch (err) {
    yield put(setGainerLoserError());
    yield put(setGainerStatus({ status: false }));
    yield put(setIsDropDownLoading(false));
  }
}

function* callLoserReq(action) {
  try {
    yield put(setIsDropDownLoading(true));
    const loser = yield call(getLoser);
    yield put(
      setLoser({
        loser: loser?.data?.data,
        statusCode: loser?.data?.status,
      })
    );
    yield put(setIsDropDownLoading(false));
  } catch (err) {
    yield put(setGainerLoserError());
    yield put(setIsDropDownLoading(false));
  }
}

function* callVolumeReq(action) {
  try {
    yield put(setIsDropDownLoading(true));
    const volume = yield call(getVolume);
    yield put(
      setVolume({
        volume: volume?.data?.data,
        statusCode: volume?.data?.status,
      })
    );
    yield put(setIsDropDownLoading(false));
  } catch (err) {
    yield put(setGainerLoserError());
    yield put(setIsDropDownLoading(false));
  }
}

function* callTurnOverReq(action) {
  try {
    yield put(setIsDropDownLoading(true));
    const turnOver = yield call(getTurnOver);
    yield put(
      setTurnOver({
        turnOver: turnOver?.data?.data,
        statusCode: turnOver?.data?.status,
      })
    );
    yield put(setIsDropDownLoading(false));
  } catch (err) {
    yield put(setGainerLoserError());
    yield put(setIsDropDownLoading(false));
  }
}

function* callTranscationReq(action) {
  try {
    yield put(setIsDropDownLoading(true));
    const transcation = yield call(getTranscation);
    yield put(
      setTranscation({
        transcation: transcation?.data?.data,
        statusCode: transcation?.data?.status,
      })
    );
    yield put(setIsDropDownLoading(false));
  } catch (err) {
    yield put(setGainerLoserError());
    yield put(setIsDropDownLoading(false));
  }
}

function* callMarketSummaryReq() {
  try {
    yield put(setLoading(true));
    const summary = yield call(getMarketSummary);
    yield put(
      setMarketSummary({
        summary: summary?.data?.data,
        statusCode: summary?.data?.status,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setMarketSummaryError());
    yield put(setLoading(false));
  }
}

function* callCompaniesReq(action) {
  try {
    const companies = yield call(getCompany);
    yield put(
      setCompanies({
        companies: companies.data.data,
        statusCode: companies.status.data,
      })
    );
  } catch (err) {}
}

function* callInflationReq() {
  try {
    yield put(setIsInflationLoading(true));
    const inflation = yield call(getInflation);
    yield put(
      setInflation({
        inflation: inflation?.data?.data,
        statusCode: inflation?.data?.status,
      })
    );
    yield put(setIsInflationLoading(false));
  } catch (err) {
    yield put(setInflationError());
    yield put(setIsInflationLoading(false));
  }
}
function* callIterestReq() {
  try {
    yield put(setInterestLoading(true));
    const interest = yield call(getInterest);

    yield put(
      setInterest({
        interest: interest?.data?.data,
        statusCode: interest?.data?.status,
      })
    );
    yield put(setInterestLoading(false));
  } catch (err) {
    yield put(setInterestError());
    yield put(setInterestLoading(false));
  }
}

function* getNepseLineChartDataReq(action) {
  try {
    const lineChartData = yield call(getChartData, {
      timeStamp: action.payload.timeStamp,
      type: action.payload.type,
    });
    yield put(
      setNepseLineChart({ nepseLineChartData: lineChartData?.data?.data })
    );
  } catch (err) {
    yield put(setNepseChartDataError());
  }
}

function* getNepseLineChartDataTodayReq(action) {
  try {
    const response = yield call(getChartDataToday, {
      type: action.payload.type,
    });
    yield put(setNepseLineChart({ nepseLineChartData: response?.data?.data }));
  } catch (err) {
    yield put(setNepseChartDataError());
  }
}

function* callGetNRBIndicatorReq(action) {
  try {
    const respond = yield call(getNRBIndicator);
    yield put(setNRBdata({ NRB: respond?.data?.data }));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetNotificationReq(action) {
  try {
    yield put(setLoading(true));
    const respond = yield call(getNotificationReq, {
      user_id: action.payload.user_id,
    });
    yield put(setNotification({ noti: respond?.data?.data }));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetSectorwiseRecentYearQuaterReq(action) {
  try {
    yield put(setLoading(true));
    const respond = yield call(getSectorwiseRecentYearQuaterReq, {
      sector: action.payload.sector,
    });
    yield put(setSectorWiseRecentYearsQuater(respond?.data?.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetSubscriptionDetailsReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(getSubscriptionDetailsReq);
    yield put(setSubscriptionDetails(response.data.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetCompanyChartDataReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getCompanyChartDataReq, action.payload);
    yield put(setCompanyChartData(data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetLimitedLiveDataReq(action) {
  try {
    // yield put(setLoading(true));
    const data = yield call(getLimitedLiveDataReq, action.payload);
    yield put(setLimitedLiveData(data.liveData));
    yield put(setCount(data.count));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetSearchedLiveDataReq(action) {
  try {
    // yield put(setLoading(true));
    const data = yield call(getSearchedLiveDataReq, action.payload);
    yield put(setSearchedLiveData(data.liveData));
    yield put(setCount(data.count));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetLimitedLiveDataBySectorReq(action) {
  try {
    // yield put(setLoading(true));
    const data = yield call(getLimitedLiveDataBySectorReq, action.payload);
    yield put(setLimitedLiveDataBySector(data.liveData));
    yield put(setCount(data.count));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetFearGreedDataReq(action) {
  try {
    // yield put(setLoading(true));
    const data = yield call(getFearGreedDataReq);
    yield put(setFearGreedData(data[0]));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callGetOpinionQuestionReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(getOpinionQuestionReq);
    yield put(setOpinionQuestion(data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* callVoteOpinionPollReq(action) {
  try {
    yield put(setLoading(true));
    const data = yield call(voteOpinionPollReq, action.payload);
    yield put(setUpatedPollOptions(data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetWatchlistDataReq(action) {
  try {
    // yield put(setLoading(true));
    const data = yield call(getWatchlistDataReq, action.payload);
    yield put(setWatchlistData(data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}
function* callGetSaralPickDataReq() {
  try {
    // yield put(setLoading(true));
    const data = yield call(getSaralPickDataReq);
    yield put(setSaralPickData(data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

export function* marketHomeLiveData() {
  yield takeLatest(actions.GET_MARKET_DATA_HOME_LIVE, marketDataHomeLive);
}

export function* nepseIndexLive() {
  yield takeLatest(actions.GET_NEPESE_INDEX_REQ, callNEPSEindexReq);
}

export function* subIndexLive() {
  yield takeLatest(actions.GET_SUB_INDEX_REQ, callSubIndexReq);
}
export function* news() {
  yield takeLatest(actions.GET_NEWS_REQ, callNewsReq);
}
export function* analysis() {
  yield takeLatest(actions.GET_ANALYSIS_REQ, callAnalysisReq);
}
export function* gainerAndLoser() {
  yield takeLatest(actions.GET_GAINER_REQ, callGainerReq);
}

export function* marketSummary() {
  yield takeLatest(actions.GET_MARKET_SUMMARY_REQ, callMarketSummaryReq);
}

export function* loser() {
  yield takeLatest(actions.GET_LOOSER_REQ, callLoserReq);
}

export function* volume() {
  yield takeLatest(actions.GET_VOLUME_REQ, callVolumeReq);
}
export function* turnOver() {
  yield takeLatest(actions.GET_TURNOVER_REQ, callTurnOverReq);
}

export function* transaction() {
  yield takeLatest(actions.GET_TRANSCATION_REQ, callTranscationReq);
}

export function* companies() {
  yield takeLatest(actions.GET_COMPANY_REQ, callCompaniesReq);
}

export function* inflation() {
  yield takeLatest(actions.GET_INFLATION_REQ, callInflationReq);
}
export function* interest() {
  yield takeLatest(actions.GET_INTEREST_REQ, callIterestReq);
}

export function* nepseLineChart() {
  yield takeLatest(
    actions.GET_NEPSE_LINE_CHART_DATA_REQ,
    getNepseLineChartDataReq
  );
}

export function* nepseLineChartToday() {
  yield takeLatest(
    actions.GET_NEPSE_LINE_CHART_DATA_TODAY_REQ,
    getNepseLineChartDataTodayReq
  );
}

export function* getNRBIndicatorReq() {
  yield takeLatest(actions.GET_NRB_INDICATOR, callGetNRBIndicatorReq);
}

export function* callGetNotification() {
  yield takeLatest(actions.GET_NOTIFICATION, callGetNotificationReq);
}

export function* callGetSectorwiseRecentYearQuater() {
  yield takeLatest(
    actions.SECTORWISE_RECENT_YEAR_QUATER,
    callGetSectorwiseRecentYearQuaterReq
  );
}
export function* callGetSubscriptionDetails() {
  yield takeLatest(
    actions.GET_SUBSCRIPTION_DETAILS,
    callGetSubscriptionDetailsReq
  );
}
export function* callGetComapnyChartData() {
  yield takeLatest(actions.GET_COMPANY_CHARTDATA, callGetCompanyChartDataReq);
}
export function* callGetLimitedLiveData() {
  yield takeLatest(actions.GET_LIMITED_LIVE_DATA, callGetLimitedLiveDataReq);
}
export function* callGetSearchedLiveData() {
  yield takeLatest(actions.GET_SEARCHED_LIVE_DATA, callGetSearchedLiveDataReq);
}
export function* callGetLimitedLiveDataBySector() {
  yield takeLatest(
    actions.GET_LIMITED_LIVE_DATA_BY_SECTOR,
    callGetLimitedLiveDataBySectorReq
  );
}
export function* callGetFearGreedData() {
  yield takeLatest(actions.GET_FEAR_GREED_DATA, callGetFearGreedDataReq);
}
export function* callGetOpinionQuestion() {
  yield takeLatest(actions.GET_OPINION_QUESTION, callGetOpinionQuestionReq);
}
export function* callVoteOpinionPoll() {
  yield takeLatest(actions.VOTE_OPINION_POLL, callVoteOpinionPollReq);
}
export function* callGetWatchlistData() {
  yield takeLatest(actions.GET_WATCHLIST_DATA, callGetWatchlistDataReq);
}
export function* callGetSaralPickData() {
  yield takeLatest(actions.GET_SARAL_PICK_DATA, callGetSaralPickDataReq);
}

export default function* homeSaga() {
  yield all([
    fork(marketHomeLiveData),
    fork(nepseIndexLive),
    fork(subIndexLive),
    fork(news),
    fork(gainerAndLoser),
    fork(marketSummary),
    fork(loser),
    fork(volume),
    fork(turnOver),
    fork(transaction),
    fork(analysis),
    fork(companies),
    fork(inflation),
    fork(interest),
    fork(nepseLineChart),
    fork(nepseLineChartToday),
    fork(getNRBIndicatorReq),
    fork(callGetSectorwiseRecentYearQuater),
    fork(callGetNotification),
    fork(callGetSubscriptionDetails),
    fork(callGetComapnyChartData),
    fork(callGetLimitedLiveData),
    fork(callGetSearchedLiveData),
    fork(callGetLimitedLiveDataBySector),
    fork(callGetFearGreedData),
    fork(callGetOpinionQuestion),
    fork(callVoteOpinionPoll),
    fork(callGetWatchlistData),
    fork(callGetSaralPickData),
  ]);
}
