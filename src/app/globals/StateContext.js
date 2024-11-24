'use client'
import { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const StateProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    const [cartShopping, setCartShopping] = useState([])
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

    return (
        <StateContext.Provider value={
            { favorites, setFavorites, 
            cartShopping, setCartShopping, 
            cart, setCart, products, setProducts}}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext)

