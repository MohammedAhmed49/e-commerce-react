import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [process.env.NODE_ENV === 'development' && logger, sagaMiddleware].filter(Boolean);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const persistReducter = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistReducter, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistore = persistStore(store);
