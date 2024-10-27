import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootrReducer";
import rootSaga from "./rootSaga";
import Logger from "redux-logger";
// import { decryptMessage, encryptMessage } from "../hashing";

const persistConfig = {
  key: "root", // Change this to a unique key
  storage,
  whitelist: ["auth"], // Add other reducer keys to persist if needed
  // transforms: [
  //   {
  //     in: state => ({
  //       ...state,
  //       // Encrypt the sensitive part of your state
  //       isLoggedIn: encryptMessage(state.isLoggedIn),
  //     }),
  //     out: (state, key) => {
  //       if (key === 'root') {
  //         // Decrypt the sensitive part when retrieving from storage
  //         return {
  //           ...state,
  //           isLoggedIn: decryptMessage(state.isLoggedIn),
  //         };
  //       }
  //       return state;
  //     },
  //   },
  // ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [sagaMiddleware, Logger],
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
