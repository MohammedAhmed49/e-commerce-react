import { createContext, useState } from "react";

export const CartContext = createContext({
    cartOpened: false,
    setCartOpened: () => {},
    cartItems: [],
    addToCart: () => {}
});

export const CartContextProvider = ({ children }) => {
    const [cartOpened, setCartOpened] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const newCartItems = [...cartItems]
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

    const value = {cartOpened, setCartOpened, cartItems, addToCart};
    

    return( 
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
