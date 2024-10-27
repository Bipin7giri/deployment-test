import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  getPriceUpVolumeUpData,
  getPriceDownVolumeUpData,
  getPromoterShareData,
} from "./api";
import actions from "./actions";
import {
  setPriceUpVolumeUpData,
  setPriceDownVolumeUpData,
  setScreenerLoading,
  setPromoterShareData,
} from "./screenerSlice";

function* getPriceUpVolumeUpDataReq(action) {
  try {
    yield put(setScreenerLoading(true));
    const priceUpVolumeUpData = yield call(getPriceUpVolumeUpData);
    yield put(setPriceUpVolumeUpData(priceUpVolumeUpData));
    yield put(setScreenerLoading(false));
  } catch (err) {
    console.error("Error fetching price up volume up data:", err);
    yield put(setScreenerLoading(false));
  }
}

function* getPriceDownVolumeUpDataReq(action) {
  try {
    yield put(setScreenerLoading(true));
    const priceDownVolumeUpData = yield call(getPriceDownVolumeUpData);
    yield put(setPriceDownVolumeUpData(priceDownVolumeUpData));
    yield put(setScreenerLoading(false));
  } catch (err) {
    console.error("Error fetching price down volume up data:", err);
    yield put(setScreenerLoading(false));
  }
}

function* getPromoterShareDataReq(action) {
  try {
    yield put(setScreenerLoading(true));
    const data = yield call(getPromoterShareData);
    yield put(setPromoterShareData(data));
    yield put(setScreenerLoading(false));
  } catch (err) {
    console.error("Error fetching promoter share data:", err);
    yield put(setScreenerLoading(false));
  }
}

export function* callGetPriceUpVolumeUpDataReq() {
  yield takeLatest(
    actions.GET_PRICE_UP_VOLUME_UP_DATA,
    getPriceUpVolumeUpDataReq
  );
}

export function* callGetPriceDownVolumeUpDataReq() {
  yield takeLatest(
    actions.GET_PRICE_DOWN_VOLUME_UP_DATA,
    getPriceDownVolumeUpDataReq
  );
}

export function* callGetPromoterShareDataReq() {
  yield takeLatest(actions.GET_PROMOTER_SHARE_DATA, getPromoterShareDataReq);
}

export default function* screenerSaga() {
  yield all([
    fork(callGetPriceUpVolumeUpDataReq),
    fork(callGetPriceDownVolumeUpDataReq),
    fork(callGetPromoterShareDataReq),
  ]);
}
