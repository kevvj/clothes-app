'use client';
import { useState } from 'react'
import Header from "../comp/Header";
import { useRouter } from 'next/navigation'
import PrincipalBox from "../comp/Principal-Box"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import { isLoggedIn, setIsLoggedIn } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'

import {profilePicture, setProfilePicture} from '../globals/ProfilePicture'

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
        const [image, setImage] = useState("./img/Racist_Cat.webp")

        const handleImageChange = async (event) => {
            const file = event.target.files[0]
            if (file) {
                const formData = new FormData()
                formData.append('file-upload', file) 
                formData.append('clientId', 3) 

                try {
                    const response = await fetch('http://localhost:3001/upload', {
                        method: 'POST',
                        body: formData,
                    })

                    const data = await response.json()
                    if (response.ok) {
                        setProfilePicture(`http://localhost:3001/${data.filePath}`)
                        setImage(profilePicture)


                        console.log("Imagen subida:", data.filePath)
                    } else {
                        console.error("Error al subir la imagen:", data.message)
                    }
                } catch (error) {
                    console.error("Error al subir el archivo:", error)
                }
            }
        }



        return (
            <div className="user-section-container">

                <div className="user-section">

                    <div className="image-container">


                        <img src={profilePicture()} />

                        <label htmlFor="file-upload" className="file-upload-label">
                            <FontAwesomeIcon icon={faPenToSquare} className='setimage-icon' />
                            <input
                                type="file"
                                id="file-upload"
                                name="file-upload"
                                accept=".jpg,.jpeg,.png"
                                className="file-upload-input"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>






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