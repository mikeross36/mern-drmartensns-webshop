import { combineReducers } from "redux";
import { shoppingCartReducer } from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({ shoppingCart: shoppingCartReducer });

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export const removePersistedData = () => {
  persistor.pause();
  persistor.flush().then(() => persistor.purge);
};

export type RootState = ReturnType<typeof store.getState>;
