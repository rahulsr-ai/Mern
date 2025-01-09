import { useContext, createContext } from "react";
import { useState } from "react";

const SearchContext = createContext()


const SearchProvider = ({ children }) => {
    const [search, setsearch] = useState({
        keyword: "",
        products: []
    });
    return (
        <SearchContext.Provider value={[search, setsearch]}>
            {children}
        </SearchContext.Provider>

    )
}


const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider}