import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import actions from "./action";
import { postSubscription } from "./api";
import { setLoading, setPaymentDetails } from "./paymentSlice";

function* callAddSubscriptionReq(action) {
  try {
    yield put(setLoading(true));
    const response = yield call(postSubscription, { formData: action.payload });
    yield put(
      setPaymentDetails({
        message: response?.data?.message,
      })
    );
    yield put(setLoading(false));
  } catch (err) {
    yield put(setLoading(false));
  }
}

export function* addSubscriptionReq() {
  yield takeLatest(actions.ADD_SUBSCRIPTION, callAddSubscriptionReq);
}

export default function* paymentSaga() {
  yield all([fork(addSubscriptionReq)]);
}
