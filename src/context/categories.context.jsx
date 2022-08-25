import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesContextProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        const getData = async () => {
            const categories = await getCategoriesAndDocuments();
            setCategoriesMap(categories);
        }
        getData();
    }, [])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}