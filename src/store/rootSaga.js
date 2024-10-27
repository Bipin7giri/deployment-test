import authSaga from "@/app/(auth)/_redux/authSaga";
import portfolioSaga from "@/app/(portfolio)/portfolio/_redux/portfolioSaga";
import homeSaga from "@/app/(home)/redux/homeSaga";
import companySaga from "../app/company/[id]/redux/companySaga";
import watchListSaga from "@/app/watchlist/_redux/watchListSaga";
import toolsSaga from "@/app/(tools)/_redux/toolsSaga";
import { all } from "redux-saga/effects";
import marketSaga from "@/app/(market)/_redux/marketSaga";
import brokerSaga from "@/app/broker/[id]/_redux/brokerSaga";
import companyCompareSaga from "@/app/(tools)/stock-compare/_redux/stockCompareSaga";
import paymentSaga from "@/app/(payment)/payment-details/[title]/_redux/paymentSagas";
import economySaga from "@/app/economy/redux/economySaga";
import screenerSaga from "@/app/(screener)/_redux/screenerSaga";

// import companyCompareSaga from "../app/StockCompare/redux/stockCompareSaga";
// import screenerSaga from "../pages/Screener/redux/screenerSaga";
// import economySaga from "../pages/Economy/redux/economySaga";
// import watchList from "../pages/watchList/redux/watchListSaga";
// import paymentSaga from "../pages/Payment/redux/paymentSagas";
// import noteSaga from "../pages/Note/redux/noteSagas";

export default function* rootSaga() {
  // yield all([authSaga(), homeSaga(), screenerSaga(),
  // economySaga(), portfolioSaga(), toolsSaga(), watchList(),
  // paymentSaga(), brokerSaga(), noteSaga()  ]);
  yield all([
    homeSaga(),
    authSaga(),
    watchListSaga(),
    portfolioSaga(),
    companySaga(),
    marketSaga(),
    toolsSaga(),
    brokerSaga(),
    economySaga(),
    companyCompareSaga(),
    paymentSaga(),
    screenerSaga(),
  ]);
}
