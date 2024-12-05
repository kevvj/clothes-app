'use client'
import { useState, useEffect, useRef } from 'react'
import Header from "../comp/Header"
import { useRouter } from 'next/navigation'
import {isLoggedIn, setIsLoggedIn, userType,} from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'
import { fetchProducts } from '../utils/mockData/Products'
import ComunUser from '../comp/ComunUser'
import AdminUser from '../comp/AdminUser';

export default function Home() {
    const { favorites, setFavorites } = useStateContext()
    const { cartShopping, setCartShopping } = useStateContext()
    const { products, setProducts } = useStateContext([])
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts()
            const transformedData = data.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                price: parseFloat(product.precio),
                image: product.imagen,
                description: product.descripcion || "",
                category: product.categoria || ""
            }))
            setProducts(transformedData)
            setIsClient(true)
        }

        loadProducts()

    }, [])

    if (!isClient) {
        return null;
    }

    const UserPanelButton = () => {

        if (!isLoggedIn()) {
            router.push('/login')
        } else {

        }
        console.log(isLoggedIn())
    }

    const UserSection = () => {

        const handleSignOut = () => {
            setIsLoggedIn(false)
        }

        return (
            <>



                {userType() && userType() === "comun" && <ComunUser></ComunUser>}
                {userType() && userType() === "admin" && (<> <AdminUser></AdminUser> <ComunUser></ComunUser></>)}

            </>
        )
    }

    return (
        <>

            <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} />
            <UserSection />

        </>
    )
}