import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";


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


const UserPanel = ({Fav}) => {
     

    return (
        <div className="user-panel">
            <button className="Button">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="custom-icon" />

            </button>
            <button className="Button">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faHeart} className="custom-icon" />
                    <span className= {Fav.length > 0 ? "notification-badge":""}>{Fav.length > 0 ? Fav.length:""}</span>
                    
                </div>
            </button>
            <button className="Button">
                <div className="icon-container">
                    <FontAwesomeIcon icon={faCartShopping} className="custom-icon"></FontAwesomeIcon>
                    <span className="notification-badge">2</span>
                </div>
            </button>
        </div>
    )
}


const Header = ({Fav}) => {

   

    
    return (
        <div className="Header">
            <TitleWS></TitleWS>
            <NavBar></NavBar>
            <UserPanel Fav={Fav}></UserPanel>
        </div>
    )

}


export default Header