export const loggerMW = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('Type: ', action.type);
    console.log('Payload: ', action.payload);
    console.log('Current state: ', store.getState());

    next(action);

    console.log('Next state: ', store.getState());
}