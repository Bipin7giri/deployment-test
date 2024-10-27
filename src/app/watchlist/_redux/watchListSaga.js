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
import { myWatchList, postWatchList, deleteMyWatchList } from "./api";
import {
  setMyWatchList,
  setLoading,
  setDeleteWatchList,
} from "./watchListSlice";

function* getMyWatchList(action) {
  try {
    yield put(setLoading(true));
    const { data } = yield call(myWatchList, {
      user_id: action.payload.user_id,
    });
    yield put(setMyWatchList(data?.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* addWatchList(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(postWatchList, {
      data: action.payload,
    });
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

function* deleteWatchList(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(deleteMyWatchList, {
      id: action.payload,
    });
    yield put(
      setDeleteWatchList({
        statusCode: response?.data?.status,
        data: response?.data?.data,
      })
    );
    // yield put(setMyWatchList(data?.data));
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

export function* myWatchListData() {
  yield takeLatest(actions.GET_WATCH_LIST_REQ, getMyWatchList);
}

export function* addWatchListData() {
  yield takeLatest(actions.ADD_WATCH_LIST_REQ, addWatchList);
}

export function* deleteWatchListData() {
  yield takeLatest(actions.DELETE_WATCH_LIST_REQ, deleteWatchList);
}

export default function* watchListSaga() {
  yield all([
    fork(myWatchListData),
    fork(addWatchListData),
    fork(deleteWatchListData),
  ]);
}
