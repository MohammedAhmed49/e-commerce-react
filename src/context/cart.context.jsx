import { useReducer } from "react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
    cartOpened: false,
    setCartOpened: () => {},
    cartItems: [],
    addToCart: () => {},
    totalQuantity: 0,
    removeItem: (id) => {},
    increaseItemQuantity: (id) => {},
    decreaseItemQuantity: (id) => {},
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    UPDATE_TOTAL: 'UPDATE_TOTAL',
    UPDATE_TOTAL_QUANTITY: 'UPDATE_TOTAL_QUANTITY'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

        if ( type === CART_ACTION_TYPES.SET_CART_ITEMS ) {
            return {
                ...state,
                cartItems: payload
            }
        }

        else if ( type === CART_ACTION_TYPES.TOGGLE_CART_OPEN ) {
            return {
                ...state,
                cartOpened: !state.cartOpened
            }
        }

        else if ( type === CART_ACTION_TYPES.UPDATE_TOTAL ) {
            return {
                ...state,
                cartTotal: payload
            }
        }

        else if ( type === CART_ACTION_TYPES.UPDATE_TOTAL_QUANTITY ) {
            return {
                ...state,
                totalQuantity: payload
            }
        }
        
        throw new Error(`Unhandled type ${type} in cartReducer`);
}

const INITIAL_STATE = {
    cartOpened: false,
    cartItems: [],
    totalQuantity: 0,
    cartTotal: 0
}

export const CartContextProvider = ({ children }) => {
    // const [cartOpened, setCartOpened] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [totalQuantity, setTotalQuantity] = useState(0);
    // const [cartTotal, serCartTotal] = useState(0);

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const { cartOpened, cartItems, totalQuantity, cartTotal } = state;

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        const newTotalQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        
        setCartTotal(newTotal);
        setTotalQuantity(newTotalQuantity);
    }, [cartItems]);

    const addToCart = (product) => {
        const newCartItems = [...state.cartItems];

        for (let item of newCartItems) {
            if (item.id === product.id) {
                item.quantity++;
                dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
                return;
            }
        }
        const newItem = {...product, quantity: 1};

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: [...state.cartItems, newItem]});
    }

    const removeCartItem = (id) => {
        const newItems = state.cartItems.filter(item => item.id !== id);

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newItems});
    }

    const increaseItemQuantity = (id) => {
        const newCartItems = [...state.cartItems];
        const cartItem = newCartItems.find(item => item.id === id);
        cartItem.quantity++;

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
    }

    const decreaseItemQuantity = (id) => {
        const newCartItems = [...state.cartItems];
        const cartItem = newCartItems.find(item => item.id === id);
        if (cartItem.quantity <= 1) {
            const newItems = state.cartItems.filter(item => item.id !== id);
            dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newItems});
        } else {
            cartItem.quantity--;
            dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
        }
    }

    const setCartOpened = () => {
        dispatch({type: CART_ACTION_TYPES.TOGGLE_CART_OPEN});
    }

    const setCartTotal = (total) => {
        dispatch({type: CART_ACTION_TYPES.UPDATE_TOTAL, payload: total});
    }

    const setTotalQuantity = (total) => {
        dispatch({type: CART_ACTION_TYPES.UPDATE_TOTAL_QUANTITY, payload: total});
    }

    const value = {cartOpened, setCartOpened, cartItems, addToCart, totalQuantity, removeCartItem, increaseItemQuantity, decreaseItemQuantity, cartTotal};
    

    return( 
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
