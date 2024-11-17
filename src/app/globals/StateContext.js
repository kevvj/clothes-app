'use client'
import { createContext, useContext, useState } from 'react'

const StateContext = createContext()

export const StateProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    const [cartShopping, setCartShopping] = useState([])

    return (
        <StateContext.Provider value={{ favorites, setFavorites, cartShopping, setCartShopping }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext)

