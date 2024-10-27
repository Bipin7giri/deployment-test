import { all, call, fork, put, take, takeEvery, takeLatest, } from "redux-saga/effects";
import actions from './action'
import { getBrokerDetailsReq, getBrokerBreakDownTopFiveSymbolReq, getBrokerBreakDownTopFiveIdReq, getBrokerBreakDownTotalSellingReq, getBrokerHistoricBuyReq, getBrokerHistoricSellReq, getBrokerHistoricBuyBySymReq, getBrokerHistoricSellBySymReq, getHistoricalInformationByBrokerReq, getHistoricalInformationByTopBuysellBrokerReq, getTopSellingBrokerNameReq, getTopBuyingBrokerNameReq } from "./api";
import {
    setBrokerDetails, setLoading, setBrokerBreakDownTotalSellingLoading, setBrokerBreakDownBreakDownTopFiveSymbolLoading, setBrokerBreakDownBreakDownTopFiveSymbol,
    setBrokerBreakDownBreakDownTopFiveId,
    setBrokerHystoricBuy,
    setBrokerHystoricSell,
    setBrokerHystoricBuyBySym,
    setBrokerHystoricSellBySym,
    setHistoricalInformationByBroker,
    setHistoricalInformationByTopBuysellBroker,
    setTopSellingBroker,
    setTopBuyingBroker
} from "./brokerSlice";

function* callGetBrokerDetailsReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerDetailsReq, {
            brokerNo: action.payload.brokerNo,
        });
        yield put(
            setBrokerDetails({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetBrokerBreakDownTotalSellingReq(action) {
    try {
        yield put(setBrokerBreakDownTotalSellingLoading(true));
        const response = yield call(getBrokerBreakDownTotalSellingReq, {
            brokerNo: action.payload.brokerNo,
        });
        // yield put(
        //     setBrokerBreakDownTotalSelling({
        //         data: response?.data?.data,
        //         statusCode: response?.data?.status,
        //     })
        // );
        yield put(setBrokerBreakDownTotalSellingLoading(false));
    } catch (err) {
        yield put(setBrokerBreakDownTotalSellingLoading(false));
    }
}

function* callGetBrokerBreakDownTopFiveSymbolReq(action) {
    try {
        yield put(setBrokerBreakDownBreakDownTopFiveSymbolLoading(true));
        const response = yield call(getBrokerBreakDownTopFiveSymbolReq, {
            companySymbol: action.payload.companySymbol,
        });
        yield put(
            setBrokerBreakDownBreakDownTopFiveSymbol({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setBrokerBreakDownBreakDownTopFiveSymbolLoading(false));
    } catch (err) {
        yield put(setBrokerBreakDownBreakDownTopFiveSymbolLoading(false));
    }
}

function* callGetBrokerBreakDownTopFiveIdReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerBreakDownTopFiveIdReq, {
            brokerNo: parseInt(action.payload.brokerNo),
        });
        yield put(
            setBrokerBreakDownBreakDownTopFiveId({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}


function* callGetBrokerHistoricBuyReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerHistoricBuyReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
        });
        yield put(
            setBrokerHystoricBuy({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetBrokerHistoricSellReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerHistoricSellReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
        });
        yield put(
            setBrokerHystoricSell({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetBrokerHistoricBuyBySymReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerHistoricBuyBySymReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
            symbol: action.payload.symbol,
        });
        yield put(
            setBrokerHystoricBuyBySym({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetBrokerHistoricSellBySymReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerHistoricSellBySymReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
            symbol: action.payload.symbol,
        });
        yield put(
            setBrokerHystoricSellBySym({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetHistoricalInformationByBrokerReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getHistoricalInformationByBrokerReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
            broker: action.payload.broker,
        });
        yield put(
            setHistoricalInformationByBroker({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetHistoricalInformationByTopBuysellBrokerReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getHistoricalInformationByTopBuysellBrokerReq, {
            fromDate: action.payload.fromDate,
            toDate: action.payload.toDate,
            broker: action.payload.broker,
        });
        yield put(
            setHistoricalInformationByTopBuysellBroker({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}


function* callGetTopSellingBrokerNameReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getTopSellingBrokerNameReq, {});
        yield put(
            setTopSellingBroker({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetTopBuyingBrokerNameReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getTopBuyingBrokerNameReq, {});
        yield put(
            setTopBuyingBroker({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

export function* callGetBrokerDetails() {
    yield takeLatest(actions.GET_BROKER_DETAILS, callGetBrokerDetailsReq);
}
export function* callGetBrokerBreakDownTotalSelling() {
    yield takeLatest(actions.GET_BROKER_BREAKDOWN_TOTAL_SELLING, callGetBrokerBreakDownTotalSellingReq);
}
export function* callGetBrokerBreakDownTopFiveSymbol() {
    yield takeLatest(actions.GET_BROKER_BREAKDOWN_TOP_FIVE_SYMBOL, callGetBrokerBreakDownTopFiveSymbolReq);
}
export function* callGetBrokerBreakDownTopFiveId() {
    yield takeLatest(actions.GET_BROKER_BREAKDOWN_TOP_FIVE_BROKER_ID, callGetBrokerBreakDownTopFiveIdReq);
}
export function* callGetBrokerHistoricBuy() {
    yield takeLatest(actions.GET_BROKER_HISTORIC_BUY, callGetBrokerHistoricBuyReq);
}
export function* callGetBrokerHistoricSell() {
    yield takeLatest(actions.GET_BROKER_HISTORIC_SELL, callGetBrokerHistoricSellReq);
}
export function* callGetBrokerHistoricBuyBySym() {
    yield takeLatest(actions.GET_BROKER_HISTORIC_BUY_BY_SYM, callGetBrokerHistoricBuyBySymReq);
}
export function* callGetBrokerHistoricSellBySym() {
    yield takeLatest(actions.GET_BROKER_HISTORIC_SELL_BY_SYM, callGetBrokerHistoricSellBySymReq);
}
export function* callGetHistoricalInformationByBroker() {
    yield takeLatest(actions.GET_HISTORICAL_INFORMATION_BY_BROKER, callGetHistoricalInformationByBrokerReq);
}
export function* callGetHistoricalInformationByTopBuysellBroker() {
    yield takeLatest(actions.GET_HISTORICAL_INFORMATION_BY_TOP_BUYSELL_BROKER, callGetHistoricalInformationByTopBuysellBrokerReq);
}
export function* callGetTopSellingBrokerName() {
    yield takeLatest(actions.GET_TOP_SELLING_BROKER_NAME, callGetTopSellingBrokerNameReq);
}
export function* callGetTopBuyingBrokerName() {
    yield takeLatest(actions.GET_TOP_BUYING_BROKER_NAME, callGetTopBuyingBrokerNameReq);
}

export default function* brokerSaga() {
    yield all([
        fork(callGetBrokerDetails),
        fork(callGetBrokerBreakDownTotalSelling),
        fork(callGetBrokerBreakDownTopFiveSymbol),
        fork(callGetBrokerBreakDownTopFiveId),
        fork(callGetBrokerHistoricBuy),
        fork(callGetBrokerHistoricSell),
        fork(callGetBrokerHistoricBuyBySym),
        fork(callGetBrokerHistoricSellBySym),
        fork(callGetHistoricalInformationByBroker),
        fork(callGetHistoricalInformationByTopBuysellBroker),        
        fork(callGetTopSellingBrokerName),
        fork(callGetTopBuyingBrokerName),

    ])
}
