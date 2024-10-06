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

const UserPanel = () => {
    return (
        <div className="user-panel">
            <button className="Button">
                <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />

            </button>
            <button className="Button">
                <FontAwesomeIcon icon={faHeart} size="1x" />
            </button>
            <button className="Button">
                <FontAwesomeIcon icon={faCartShopping} size="1x"></FontAwesomeIcon>
            </button>
        </div>
    )
}

const TitleWS = () => {
    return (
        <h1 className="title"><FontAwesomeIcon icon={faFrog} size="1x"></FontAwesomeIcon> Sindrome Sapo</h1>
    )
}


const Header = () => {
    return (
        <div className="Header">
            <TitleWS></TitleWS>
            <NavBar></NavBar>
            <UserPanel></UserPanel>
        </div>
    )

}


export default Header