import { CART_ACTION_TYPES } from "./cart.types";

const INITIAL_STATE = {
    cartOpened: false,
    cartItems: [],
    totalQuantity: 0,
    cartTotal: 0
}

export const cartReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload
            }

        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return {
                ...state,
                cartOpened: !state.cartOpened
            }

        case CART_ACTION_TYPES.UPDATE_TOTAL:
            return {
                ...state,
                cartTotal: payload
            }

        case CART_ACTION_TYPES.UPDATE_TOTAL_QUANTITY:
            return {
                ...state,
                totalQuantity: payload
            }
        default:
            return state;
    }
}