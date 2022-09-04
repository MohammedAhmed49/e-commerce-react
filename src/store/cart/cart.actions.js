import { createAction } from "../../utils/reducer/reducer.util";
import { CART_ACTION_TYPES } from "./cart.types";

const addToCartHelper = (cartItems, product) => {
    const newCartItems = [...cartItems];
    console.log(newCartItems);
    for (let item of newCartItems) {
        
        if (item.id === product.id) {
            item.quantity++;
            console.log(newCartItems);
            return newCartItems;
        }
    }

    const newItem = {...product, quantity: 1};
    return [...cartItems, newItem];
}

const removeCartItemHelper = (cartItems, id) => cartItems.filter(item => item.id !== id);


const decreaseItemQuantityHelper = (cartItems, id) => {
    const newCartItems = [...cartItems];
    const cartItem = newCartItems.find(item => item.id === id);

    if (cartItem.quantity <= 1) {
        const newItems = cartItems.filter(item => item.id !== id);
        return newItems;
    } else {
        cartItem.quantity--;
        return newCartItems;
    }
}


export const removeCartItem = (cartItems, id) =>
createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItemHelper(cartItems, id));


export const addToCart = (cartItems, product) =>
createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addToCartHelper(cartItems, product));

export const decreaseItemQuantity = (cartItems, id) =>
createAction(CART_ACTION_TYPES.SET_CART_ITEMS, decreaseItemQuantityHelper(cartItems, id));

export const setCartOpened = () => createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN);