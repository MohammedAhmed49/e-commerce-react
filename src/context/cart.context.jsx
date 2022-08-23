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

export const CartContextProvider = ({ children }) => {
    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartTotal, serCartTotal] = useState(0);

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        serCartTotal(newTotal);
    }, [cartItems]);

    const addToCart = (product) => {
        const newCartItems = [...cartItems]
        setTotalQuantity(totalQuantity + 1);
        let found = false;

        for (let item of newCartItems) {
            if (item.id === product.id) {
                found = true;
                item.quantity++;
                setCartItems(newCartItems);
                return;
            }
        }

        if (!found) {
            const newItem = {...product, quantity: 1};
            setCartItems([...cartItems, newItem]);
        }
    }

    const removeCartItem = (id) => {
        const newItems = cartItems.filter(item => item.id !== id);
        setCartItems(newItems);
    }

    const increaseItemQuantity = (id) => {
        const newCartItems = [...cartItems];
        const cartItem = newCartItems.find(item => item.id === id);
        cartItem.quantity++;
        setCartItems(newCartItems);
    }

    const decreaseItemQuantity = (id) => {
        const newCartItems = [...cartItems];
        const cartItem = newCartItems.find(item => item.id === id);
        if (cartItem.quantity <= 1) {
            removeCartItem(id);
        } else {
            cartItem.quantity--;
            setCartItems(newCartItems);
        }
    }

    const value = {cartOpened, setCartOpened, cartItems, addToCart, totalQuantity, removeCartItem, increaseItemQuantity, decreaseItemQuantity, cartTotal};
    

    return( 
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
