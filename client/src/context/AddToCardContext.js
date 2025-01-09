import { useContext, createContext } from "react";
import { useState } from "react";

const AddToCartContext = createContext()


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    return (
        <AddToCartContext.Provider value={[cart, setCart]}>
            {children}
        </AddToCartContext.Provider>

    )
}


const useCart = () => useContext(AddToCartContext)

export { useCart, CartProvider }