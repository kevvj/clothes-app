'use client'

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faFrog } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from 'react'
import { isLoggedIn, setIsLoggedIn } from '../globals/LogIn'
import { profilePicture, setProfilePicture } from '../globals/ProfilePicture'
import { useStateContext } from '../globals/StateContext'
import { useRouter } from 'next/navigation'



const NavBar = () => {

    return (
        <nav className="nav-container">
            <Link href="/">Ropa</Link>
            <Link href="">Accesorios</Link>
            <Link href="">Ofertas</Link>
            <Link href="">Nuevos productos</Link>
            <Link href="">Acerca de</Link>
            <Link href="">Contacto</Link>

        </nav>
    )
}



const TitleWS = () => {
    return (
        <h1 className="title"><FontAwesomeIcon icon={faFrog} size="1x"></FontAwesomeIcon> SomeThing</h1>
    )
}


const UserPanel = ({ Fav, CS, UserB, CartB }) => {
    const { cart, setCart } = useStateContext()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const router = useRouter()
    const OrdersButton = () => {
        

        router.push('/orders')
        console.log('?')


    }

    return (
        <div className="user-panel">
            <button className="Button">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="custom-icon" />

            </button>
            <button className="Button" onClick={() => OrdersButton()}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faHeart} className="custom-icon" />

                    <span className={Fav.length > 0 ? "notification-badge" : ""}>{Fav.length > 0 ? Fav.length : ""}</span>

                </div>
            </button>
            <button className="Button" onClick={CartB}>
                <div className="icon-container">
                    <FontAwesomeIcon icon={faCartShopping} className="custom-icon"></FontAwesomeIcon>

                    <span className={cart.length > 0 ? "notification-badge" : ""} >{cart.length > 0 ? cart.length : ""}</span>
                </div>
            </button>

            <button className="Button" onClick={() => UserB()}>
                <div className="icon-container">

                    {isLoggedIn() ?

                        profilePicture() === "" ?
                            <FontAwesomeIcon icon={faCircleUser} className="profile-picture" ></FontAwesomeIcon> :

                            isClient ?
                                <img src={profilePicture()}></img> : <FontAwesomeIcon icon={faCircleUser} className="profile-picture" ></FontAwesomeIcon>


                        :

                        <FontAwesomeIcon icon={faCircleUser} className="profile-picture" ></FontAwesomeIcon>}

                </div>
            </button >
        </div >
    )
}


const Header = ({ Fav, CS, UserB, CartB }) => {




    return (
        <div className="Header">
            <TitleWS></TitleWS>
            <NavBar></NavBar>
            <UserPanel Fav={Fav} CS={CS} UserB={UserB} CartB={CartB}></UserPanel>
        </div>
    )

}


export default Header