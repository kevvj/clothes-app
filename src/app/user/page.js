'use client';

import Header from "../comp/Header";
import { useRouter } from 'next/navigation'
import PrincipalBox from "../comp/Principal-Box"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


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
                <div className="user-section">

                    <img src="./img/Racist_Cat.webp"></img>

                    <div className="data-settings-container">
                        <div className="settings-item">

                            <h4>Nombres: </h4>
                            <p>Kevin José</p>
                            <button>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </button>

                        </div>

                        <div className="settings-item">

                            <h4>Apellidos: </h4>
                            <p>Tapias Villalba</p>
                            <button>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </button>

                        </div>

                        <div className="settings-item">

                            <h4>Nombre de usuario: </h4>
                            <p>Inge Kevin</p>
                            <button>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </button>

                        </div>

                        <div className="settings-item">

                            <h4>Correo Electronico: </h4>
                            <p>Kevinjvillalba774@gmail.com</p>
                            <button>
                                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                            </button>

                        </div>

                        <div className="settings-item-button"><button className="Button">Cambiar contraseña</button></div>
                        

                        {/* <div className="settings-item">
                            <h4>Cambiar Contraseña:</h4>
                            <form className="password-change-form">
                                <input type="password" placeholder="Nueva contraseña" />
                                <input type="password" placeholder="Confirmar contraseña" />
                                <button type="submit">Actualizar</button>
                            </form>
                        </div> */}

                    </div>



                    {/* <form action="/ruta/donde/quieras/subir" method="POST" enctype="multipart/form-data">
                        <label for="file-upload">Selecciona un archivo:</label>
                        <input type="file" id="file-upload" name="file-upload" accept=".jpg,.jpeg,.png" />
                        <button type="submit">Subir archivo</button>
                    </form> */}
                </div>


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