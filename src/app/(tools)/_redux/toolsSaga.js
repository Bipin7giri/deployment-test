import { all, call, fork, put, take, takeEvery, takeLatest, } from "redux-saga/effects";
import actions from './action'
import {
    setAuctionData, filterScreenerById, setAllGetSavedScreener, setCalculateBuy,
    setCalculateSell, setCalenderData, setIpoData, setLoading, setPromoCodeRequest,
    setSaveScreener, setSavedOrLoaded, setScreenerByID, setScrennerV2Data, updateScreenerById,
    setSectorRotation
} from "./toolsSlice"
import {
    delScreenerById, getAllIpoDataReq, getAuctionData, getAllSavedScrennerReq,
    getBuyCalculateReq, getCalenderInfoReq, getSavedScrennerByIDReq, getSellCalculateReq,
    postPromoCodeRequestReq, postScreenerV2Req, saveScrennerReq, updateScreenerV2,
    getSectorRotation
} from './api'

function* callAllIpoData(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getAllIpoDataReq, {
            // userId: action.payload,
        });
        yield put(
            setIpoData({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}
function* callAuctionData(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getAuctionData);
        yield put(
            setAuctionData({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callBuyCalculateReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBuyCalculateReq, {
            unit: action.payload.units,
            price: action.payload.buyAmount,
        });
        yield put(
            setCalculateBuy({
                data: response?.data,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callSellCalculateReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getSellCalculateReq, {
            unit: action.payload.units,
            buyingPrice: action.payload.buyAmount,
            sellingPrice: action.payload.sellAmount,
            capitalGain: action.payload.picked,
        });
        yield put(
            setCalculateSell({
                data: response?.data,
            })
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetCalenderInfoReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getCalenderInfoReq, {
            period: action?.payload?.period,
        });
        yield put(
            setCalenderData({
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPostPromoCodeRequestReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(postPromoCodeRequestReq, {
            user_id: action?.payload?.user_id,
            name: action?.payload?.name,
            social_links: action?.payload?.social_links,
            background: action?.payload?.background,
            contact_no: action?.payload?.contact_no,
        });
        yield put(
            setPromoCodeRequest({
                data: response?.data,
            })
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPostScreenerV2Req(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(postScreenerV2Req, { action });
        yield put(
            setScrennerV2Data({
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callUpdateScreenerV2(action) {
    try {
        yield put(setLoading(true));
        yield call(updateScreenerV2, { action });

        yield put(
            updateScreenerById({
                data: action.payload,
            })
        );
        yield put(
            setSavedOrLoaded(true)
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callSaveScrennerReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(saveScrennerReq, { action });
        yield put(
            setSaveScreener({
                data: response?.data?.data,
            })
        );
        yield put(
            setSavedOrLoaded(true)
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callGetAllSavedScrennerReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getAllSavedScrennerReq, {
            user_id: action?.payload?.user_id,
        });
        yield put(
            setAllGetSavedScreener({
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}


function* callGetSavedScrennerByIDReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getSavedScrennerByIDReq, {
            id: action?.payload?.id,
        });
        yield put(
            setScreenerByID({
                data: response?.data?.data,
            })
        );
        yield put(
            setSavedOrLoaded(true)
        );
        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}
function* callDeleteScreenerByID(action) {
    try {
        yield put(setLoading(true));
        yield call(delScreenerById, {
            id: action?.payload?.id,
        });
        yield put(
            filterScreenerById({
                id: action?.payload?.id
            })
        );

        yield put(setLoading(false))
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callSectorRotationReq() {
    try {
        yield put(setLoading(true));
        const data = yield call(getSectorRotation);
        const sectorRotationData = data.map((item, index) => {
            return {
                sno: index + 1,
                index: item.sindex,
                oldIndex: item.oldindex,
                currentIndex: item.newindex,
                todaysGain: item.todayGain,
                ranking: item.ranking,
                monthlyGain: ((item.subindicesdifference / item.oldindex) * 100).toFixed(2),
            }
        })
        yield put(setSectorRotation(sectorRotationData));
        yield put(setLoading(false));
    } catch (err) {
        setLoading(false);
    }
}


export function* allIpoDataReq() {
    yield takeLatest(actions.GET_ALL_IPO_DATA, callAllIpoData);
}
export function* auctionDataReq() {
    yield takeLatest(actions.GET_AUCTION_DATA, callAuctionData);
}
export function* buyCalculateReq() {
    yield takeLatest(actions.GET_BUY_CALCULATE, callBuyCalculateReq);
}
export function* sellCalculateReq() {
    yield takeLatest(actions.GET_SELL_CALCULATE, callSellCalculateReq);
}
export function* callGetCalenderInfo() {
    yield takeLatest(actions.GET_CALENDER_INFO, callGetCalenderInfoReq);
}
export function* callPostPromoCodeRequest() {
    yield takeLatest(actions.POST_PROMO_CODE_REQUEST, callPostPromoCodeRequestReq);
}
export function* callPostScreenerV2() {
    yield takeLatest(actions.POST_SCREENER_V2, callPostScreenerV2Req);
}
export function* callSaveScrenner() {
    yield takeLatest(actions.SAVE_SCREENER, callSaveScrennerReq);
}
export function* callUpdateScreener() {
    yield takeLatest(actions.UPDATE_SCREENER, callUpdateScreenerV2);
}
export function* callGetAllSavedScrenner() {
    yield takeLatest(actions.GET_ALL_SAVED_SCREENER, callGetAllSavedScrennerReq);
}
export function* getSavedScrennerByID() {
    yield takeLatest(actions.GET_SAVED_SCREENER_BY_ID, callGetSavedScrennerByIDReq);
}
export function* deleteScreenerById() {
    yield takeLatest(actions.DELETE_SCREENER_BY_ID, callDeleteScreenerByID);
}
export function* screenRotation() {
    yield takeLatest(actions.GET_SECTOR_ROTATION, callSectorRotationReq);
}

export default function* portfolioSaga() {
    yield all([
        fork(allIpoDataReq),
        fork(auctionDataReq),
        fork(buyCalculateReq),
        fork(sellCalculateReq),
        fork(callGetCalenderInfo),
        fork(callPostPromoCodeRequest),
        fork(callPostScreenerV2),
        fork(callSaveScrenner),
        fork(callGetAllSavedScrenner),
        fork(callUpdateScreener),
        fork(getSavedScrennerByID),
        fork(deleteScreenerById),
        fork(screenRotation),
    ])
}
