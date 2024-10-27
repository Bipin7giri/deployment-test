import { all, call, fork, put, take, takeEvery, takeLatest, } from "redux-saga/effects";
import actions from './action'
import { getCompanyBySectorReq, getCompanyCompareReq, getCompanyLineChartData, getCompanyRecentQuaterReq } from "./api";
import { setCompanyBySector, setCompanyCompare, setCompanyLineChartData, setCompanyRecentQuater, setLoading } from "./stockCompareSlice";

function* callGetCompanyCompareReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getCompanyCompareReq, {
            symbol: action.payload.symbol,
            quarter: action.payload.quarter,
        });
        yield put(
            setCompanyCompare({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetCompanyBySectorReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getCompanyBySectorReq, {
            sector: action.payload.sector,
            // quarter: action.payload.quarter,
        });
        yield put(
            setCompanyBySector({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetCompanyRecentQuaterReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getCompanyRecentQuaterReq, {
            sector: action.payload.sector,
        });
        yield put(
            setCompanyRecentQuater({
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetCompanyLineChartDataReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getCompanyLineChartData, {
            symbol: action.payload.symbol,
        });
        yield put(
            setCompanyLineChartData({
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

export function* callGetCompanyCompare() {
    yield takeLatest(actions.GET_COMPANY_COMPARE, callGetCompanyCompareReq);
}
export function* callGetCompanyBySector() {
    yield takeLatest(actions.GET_COMPANY_BY_SECTOR, callGetCompanyBySectorReq);
}
export function* callGetCompanyRecentQuater() {
    yield takeLatest(actions.GET_COMPANY_RECENT_QUATER, callGetCompanyRecentQuaterReq);
}
export function* callGetCompanyLineChartData() {
    yield takeLatest(actions.GET_COMPANY_LINE_CHART_DATA, callGetCompanyLineChartDataReq);
}

export default function* companyCompareSaga() {
    yield all([
        fork(callGetCompanyCompare),
        fork(callGetCompanyBySector),
        fork(callGetCompanyRecentQuater),
        fork(callGetCompanyLineChartData),

    ])
}
