'use client'

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faFrog } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { useState } from 'react'



const NavBar = () => {
    return (
        <nav className="nav-container">
            <Link href="">Ropa</Link>
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


const UserPanel = ({ Fav, CS, UserB }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(true)


    return (
        <div className="user-panel">
            <button className="Button">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="custom-icon" />

            </button>
            <button className="Button">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faHeart} className="custom-icon" />

                    <span className={Fav.length > 0 ? "notification-badge" : ""}>{Fav.length > 0 ? Fav.length : ""}</span>

                </div>
            </button>
            <button className="Button">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faCartShopping} className="custom-icon"></FontAwesomeIcon>

                    <span className={CS.length > 0 ? "notification-badge" : ""} >{CS.length > 0 ? CS.length : ""}</span>
                </div>
            </button>

            <button className="Button" onClick={() => UserB()}>
                <div className="icon-container">

                    {isLoggedIn ?
                        <img  src="./img/Racist_Cat.webp"></img>
                        : <FontAwesomeIcon  icon={faCircleUser} className="profile-picture" ></FontAwesomeIcon>}

                </div>
            </button >
        </div >
    )
}


const Header = ({ Fav, CS, UserB }) => {




    return (
        <div className="Header">
            <TitleWS></TitleWS>
            <NavBar></NavBar>
            <UserPanel Fav={Fav} CS={CS} UserB={UserB}></UserPanel>
        </div>
    )

}


export default Header