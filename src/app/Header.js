import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";


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
        <h1 className="title"><FontAwesomeIcon icon={faFrog} size="1x"></FontAwesomeIcon> Sindrome Sapo</h1>
    )
}


const UserPanel = ({ Fav, CS }) => {


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

            <button className="Button">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faCircleUser} className="custom-icon"></FontAwesomeIcon>
                </div>
            </button>
        </div>
    )
}


const Header = ({ Fav , CS }) => {




    return (
        <div className="Header">
            <TitleWS></TitleWS>
            <NavBar></NavBar>
            <UserPanel Fav={Fav} CS={CS}></UserPanel>
        </div>
    )

}


export default Header