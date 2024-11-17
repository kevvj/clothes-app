'use client';

import Header from "../comp/Header";
import { useRouter } from 'next/navigation'
import PrincipalBox from "../comp/Principal-Box"


import { isLoggedIn, setIsLoggedIn } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'

export default function Home() {

    const { favorites, setFavorites } = useStateContext()
    const { cartShopping, setCartShopping } = useStateContext()


    const router = useRouter()

    const UserPanelButton = () => {

        if (!isLoggedIn()) {
            router.push('/login')
        } else {

        }

        console.log(isLoggedIn())
    }

    const UserSection = () => {
        return (
            <div className="user-section-container">
                <div className="user-section">parte del usuario en proceso...</div>
            </div>
        )
    }

    return (
        <>

            <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} />
            <UserSection />

        </>
    )
}