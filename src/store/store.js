import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// const loggerMW = (store) => (next) => (action) => {
//     if (!action.type) {
//         return next(action);
//     }

//     console.log('Type: ', action.type);
//     console.log('Payload: ', action.payload);
//     console.log('Current state: ', store.getState());

//     next(action);

//     console.log('Next state: ', store.getState());
// }

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);