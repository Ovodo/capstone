import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./slice-reducers/UserReducer";

// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

// import { useDispatch, useSelector } from 'react-redux'

// const persistConfig = {
//   key: "root",
//   storage,
// };

const allReducers = combineReducers({
  user: UserReducer,
});

// const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: allReducers,
  // middleware: [thunk],
  // devTools: process.env.NODE_ENV !== "production",
});
// export const persistor = persistStore(store);
