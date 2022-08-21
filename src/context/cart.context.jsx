import { createContext, useState } from "react";

export const CartContext = createContext({
    cartOpened: false,
    setCartOpened: () => {}
});

export const CartContextProvider = ({ children }) => {
    const [cartOpened, setCartOpened] = useState(false);
    const value = {cartOpened, setCartOpened};
    
    return( 
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
