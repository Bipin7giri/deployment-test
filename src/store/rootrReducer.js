import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/app/(auth)/_redux/authSlice";
import homeReducer from "@/app/(home)/redux/homeSlice";
import watchListReducer from "@/app/watchlist/_redux/watchListSlice";
import portfolioReducer from "@/app/(portfolio)/portfolio/_redux/portfolioSlice";
import toolsReducer from "@/app/(tools)/_redux/toolsSlice";
import economyReducer from "@/app/economy/redux/economySlice";
import marketReducer from "@/app/(market)/_redux/marketSlice";
import brokerReducer from "@/app/broker/[id]/_redux/brokerSlice";
import companyReducer from "../app/company/[id]/redux/companySlice";
import companyCompareReducer from "@/app/(tools)/stock-compare/_redux/stockCompareSlice";
import screenerReducer from "@/app/(screener)/_redux/screenerSlice";

// import companyReducer from "../pages/company/redux/companySlice";
// import screenerReducer from "../pages/Screener/redux/screenerSlice";
// import economyReducer from "../pages/Economy/redux/economySlice";
// import toolsReducer from "../pages/Tools/redux/toolsSlice";
import paymentReducer from "@/app/(payment)/payment-details/[title]/_redux/paymentSlice";
// import noteReducer from '../pages/Note/redux/noteSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  company: companyReducer,
  tools: toolsReducer,
  screener: screenerReducer,
  economy: economyReducer,
  portfolio: portfolioReducer,
  market: marketReducer,
  watchList: watchListReducer,
  payment: paymentReducer,
  broker: brokerReducer,
  companyCompare: companyCompareReducer,
  // note: noteReducer,
});

export default rootReducer;
