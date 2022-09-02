import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean);

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
};

const persistReducter = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistReducter, undefined, composeEnhancers);

export const persistore = persistStore(store);
