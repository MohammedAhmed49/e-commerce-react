import { createContext, useEffect, useState } from "react";
import PRODUCTS from '../shop-data.json';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({
    products: [],
    setProducts: () => {}
});

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products, setProducts};

    useEffect(() => {
        const getData = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            console.log(categoriesMap);
        }

        getData();
    }, [])

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}