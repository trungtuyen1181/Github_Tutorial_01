import { createStore } from "redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "redux-store",
  storage: storage,
  keyPrefix: "tut",
};

const store = createStore(persistReducer(persistConfig, reducers));
persistStore(store);
export default store;
