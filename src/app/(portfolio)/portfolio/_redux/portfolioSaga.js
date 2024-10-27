import { all, call, fork, put, take, takeEvery, takeLatest, } from "redux-saga/effects";
import actions from './action'
import { setLoading, setUser, setShareHolder, setPostPortfolio, setShareHolderByUserId, setBrokerInfo, setActiveStockCompany, setPortfolioHolderByShid, setDeletePortfoiloData, setPortfolioSell, setDeletePortfolioHlder, setShareType, setIsSellLoading, setOverallPortfolioLoading, setIsCSVUpload, setPortfolioVsInflation, } from "./portfolioSlice"
import { addShareHolder, deletePortfolioByShareHolderId, deletePortfolioHolderInfoReq, getBrokerInformation, getPortfolioHolderByShid, getShareTypeReq, getStockActiveCompanyName, getUserById, portfolioSellReq, portfolioVsInflationReq, postCsvImportReq, postEditPortfolioReq, postPortfolio, shareHolderByUserID } from './api'

function* callUserReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getUserById, {
            userId: action.payload,
        })
        yield put(
            setUser({
                user: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callAddShareHolderReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(addShareHolder, {
            full_name: action.payload.name,
            is_main: true,
            type: action.payload.investor,
            broker_id: action.payload.brokerInfo,
            user_id: action.payload.user_id,
        });
        yield put(
            setShareHolder({
                statusCode: response?.data?.status,
                message: response?.data?.message,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callPostPortfolioReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(postPortfolio, {
            user_id: action.payload.user_id,
            sector: "string",
            symbol: action.payload.symbol,
            no_of_stocks: action.payload.no_of_stocks,
            buy_amount: action.payload.buy_amount,
            company_name: action.payload.company,
            share_type: action.payload.share_type,
            buy_date: action.payload.buy_date,
            ltp: 100,
            share_holder_id: action.payload.share_holder_id,
        });
        yield put(
            setPostPortfolio({
                statusCode: response?.data?.status,
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callShareHolderByUserIdReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(shareHolderByUserID, {
            user_id: action.payload.user_id,
        });
        yield put(
            setShareHolderByUserId({
                ShareHolderByUserId: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    } catch (err) {
        yield put(setLoading(false));
    }
}

function* callBrokerInfomatrionReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getBrokerInformation);
        yield put(
            setBrokerInfo({
                brokerInfo: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callActiveCompanyNameReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getStockActiveCompanyName);
        yield put(
            setActiveStockCompany({
                activeStock: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPortfolioHolderByShildReq(action) {
    try {
        yield put(setOverallPortfolioLoading(true));
        const response = yield call(getPortfolioHolderByShid, {
            id: action.payload.id,
        });
        yield put(
            setPortfolioHolderByShid({
                portfolioHolder: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setOverallPortfolioLoading(false));
    }
    catch (err) {
        yield put(setOverallPortfolioLoading(false));
    }
}

function* callDeletePortfolioByShidReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(deletePortfolioByShareHolderId, {
            id: action.payload,
        });
        yield put(
            setDeletePortfoiloData({
                deletePortfolio: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPortfolioSellReq(action) {
    try {
        yield put(setIsSellLoading(true));
        const response = yield call(portfolioSellReq, {
            user_id: action.payload.currentUser,
            sector: "string",
            symbol: action.payload.symbol,
            no_of_stocks: action.payload.no_of_stocks,
            buy_amount: action.payload.buy_amount,
            company_name: action.payload.symbol,
            share_type: 1,
            buy_date: action.payload.buy_date,
            ltp: action.payload.ltp,
            capital_gain_tax: action.payload.capital_gain_tax,
            share_holder_id: action.payload.share_holder_id,
        });
        yield put(
            setPortfolioSell({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setIsSellLoading(false));
    }
    catch (err) {
        yield put(setIsSellLoading(false));
    }
}

function* callDeletePortfolioHolderReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(deletePortfolioHolderInfoReq, {
            id: action.payload.id,
        });
        yield put(
            setDeletePortfolioHlder({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callShareTypeReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(getShareTypeReq);
        yield put(
            setShareType({
                data: response?.data?.data,
                statusCode: response?.data?.status,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPostCsvReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(postCsvImportReq,
            action.payload.transformedData,
        );
        yield put(
            // setPostPortfolio({
            //     statusCode: response?.data?.status,
            //     data: response?.data?.data,
            // }),
            setIsCSVUpload({
                isCSVUpload: true,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPostEditPortfolioReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(postEditPortfolioReq, {
            id: action.payload.id,
            symbol: action.payload.updatedValues.symbol,
            // company: action.payload.updatedValues.company,
            share_type: action.payload.updatedValues.share_type,
            buy_date: action.payload.updatedValues.buy_date,
            no_of_stocks: action.payload.updatedValues.no_of_stocks,
            buy_amount: action.payload.updatedValues.buy_amount,
        });
        yield put(
            setPostPortfolio({
                statusCode: response?.data?.status,
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}

function* callPortfolioVsInflationReq(action) {
    try {
        yield put(setLoading(true));
        const response = yield call(portfolioVsInflationReq, {
            id: action.payload.id,
        });
        yield put(
            setPortfolioVsInflation({
                statusCode: response?.data?.status,
                data: response?.data?.data,
            })
        );
        yield put(setLoading(false));
    }
    catch (err) {
        yield put(setLoading(false));
    }
}


export function* userData() {
    yield takeLatest(actions.GET_BY_USER_ID, callUserReq);
}
export function* shareHolderDetail() {
    yield takeLatest(actions.ADD_SHARE_HOLDER, callAddShareHolderReq);
}
export function* postPortfolioDetail() {
    yield takeLatest(actions.POST_PORTFOLIO, callPostPortfolioReq);
}
export function* getShareHolderByUserId() {
    yield takeLatest(actions.GET_SHARE_HOLDER_BY_USER_ID, callShareHolderByUserIdReq);
}
export function* getBrokerInfo() {
    yield takeLatest(actions.GET_BROKER_INFO, callBrokerInfomatrionReq);
}
export function* getActiveStockCompanyName() {
    yield takeLatest(actions.GET_ACTIVE_COMPANY_NAME, callActiveCompanyNameReq);
}
export function* getUserPortfolioHolderByShid() {
    yield takeLatest(actions.GET_PORTFOLIO_BY_SHID, callPortfolioHolderByShildReq);
}
export function* deletePortfoioDataByShareHid() {
    yield takeLatest(actions.DELETE_PORTFOLIO_BY_SHID, callDeletePortfolioByShidReq);
}
export function* callPortfolioSell() {
    yield takeLatest(actions.POST_PORTFOLIO_SELL, callPortfolioSellReq);
}
export function* callDeletePortfolioHolderInfo() {
    yield takeLatest(actions.DELETE_PORTFOLIO_HOLDER_INFO, callDeletePortfolioHolderReq);
}
export function* callGetShareTypeReq() {
    yield takeLatest(actions.GET_SHARE_TYPE, callShareTypeReq);
}
export function* callPostCsv() {
    yield takeLatest(actions.POST_CSV_IMPORT, callPostCsvReq);
}
export function* callPostEditPortfolio() {
    yield takeLatest(actions.POST_EDIT_PORTFOLIO, callPostEditPortfolioReq);
}
export function* callPortfolioVsInflation() {
    yield takeLatest(actions.PORTFOLIO_VS_INFLATION, callPortfolioVsInflationReq);
}

export default function* portfolioSaga() {
    yield all([
        fork(userData),
        fork(shareHolderDetail),
        fork(postPortfolioDetail),
        fork(getShareHolderByUserId),
        fork(getBrokerInfo),
        fork(getActiveStockCompanyName),
        fork(getUserPortfolioHolderByShid),
        fork(deletePortfoioDataByShareHid),
        fork(callPortfolioSell),
        fork(callDeletePortfolioHolderInfo),
        fork(callGetShareTypeReq),
        fork(callPostCsv),
        fork(callPostEditPortfolio),
        fork(callPortfolioVsInflation),


    ])
}
