import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
    selectCart,
    cart => cart.cartItems
)

export const selectTotal = createSelector(
    selectCart,
    cart => cart.cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
)

export const selectTotalQuantity = createSelector(
    selectCart,
    cart => cart.cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
)

export const selectCartOpened = createSelector(
    selectCart,
    cart => cart.cartOpened
)