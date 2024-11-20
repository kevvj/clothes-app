'use client';
import { useState, useEffect } from 'react'
import Header from "../comp/Header"
import { useRouter } from 'next/navigation'
import PrincipalBox from "../comp/Principal-Box"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import {
    isLoggedIn, setIsLoggedIn,
    usernameGlobal, setUsernameGlobal,
    name, setName,
    email, setEmail,
    registrationDate, setRegistrationDate,
    idClient, setIdClient
} from '../globals/LogIn'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { useStateContext } from '../globals/StateContext'
import { profilePicture, setProfilePicture } from '../globals/ProfilePicture'

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

        const [isEditingName, setIsEditingName] = useState(false)
        const [isEditingUsername, setIsEditingUsername] = useState(false)
        const [isEditingEmail, setIsEditingEmail] = useState(false)

        const [newName, setNewName] = useState(name())
        const [newUsername, setNewUsername] = useState(usernameGlobal())
        const [newEmail, setNewEmail] = useState(email())

        const handleImageChange = async (event) => {
            const file = event.target.files[0]
            if (file) {
                const formData = new FormData()
                formData.append('file-upload', file)
                formData.append('clientId', idClient())

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

        const handleResetPasswordForm = () => {
            router.push('/user/passwordupdate')
        }

        const handleSignOut = () => {
            setIsLoggedIn(false)
        }

        const handleEditClick = (field) => {
            if (field === "name") setIsEditingName(true)
            if (field === "username") setIsEditingUsername(true)
            if (field === "email") setIsEditingEmail(true)
        }

        const handleInputChange = (e, field) => {
            if (field === "name") setNewName(e.target.value)
            if (field === "username") setNewUsername(e.target.value)
            if (field === "email") setNewEmail(e.target.value)
        }

        const handleSaveChange = (field) => {
            if (field === "name") {
                setName(newName)
                setIsEditingName(false)
            }
            if (field === "username") {
                setUsernameGlobal(newUsername)
                setIsEditingUsername(false)
            }
            if (field === "email") {
                setEmail(newEmail)
                setIsEditingEmail(false)
            }

            console.log(name(), usernameGlobal(), email())
        }

        const handleSaveGlobals = () => {
            

        }

        const [isClient, setIsClient] = useState(false)

        useEffect(() => {
            setIsClient(true)
        }, [])

        if (!isClient) {
            return null
        }


        return (
            <div className="user-section-container">
                <div className="user-section">
                    <div className="image-container">
                        {profilePicture() === "" ?
                            <FontAwesomeIcon icon={faCircleUser} className="profile-picture-update" /> : <img src={profilePicture()} alt="Profile" />}
                        <label htmlFor="file-upload" className="file-upload-label">
                            <FontAwesomeIcon icon={faPenToSquare} className="setimage-icon" />
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
                            {isEditingName ? (
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => handleInputChange(e, "name")}
                                />
                            ) : (
                                <p>{name()}</p>
                            )}
                            <button onClick={() => handleEditClick("name")}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            {isEditingName && (
                                <button onClick={() => handleSaveChange("name")}>Guardar</button>
                            )}
                        </div>

                        <div className="settings-item">
                            <h4>Nombre de usuario: </h4>
                            {isEditingUsername ? (
                                <input
                                    type="text"
                                    value={newUsername}
                                    onChange={(e) => handleInputChange(e, "username")}
                                />
                            ) : (
                                <p>{usernameGlobal()}</p>
                            )}
                            <button onClick={() => handleEditClick("username")}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            {isEditingUsername && (
                                <button onClick={() => handleSaveChange("username")}>Guardar</button>
                            )}
                        </div>

                        <div className="settings-item">
                            <h4>Correo Electrónico: </h4>
                            {isEditingEmail ? (
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => handleInputChange(e, "email")}
                                />
                            ) : (
                                <p>{email()}</p>
                            )}
                            <button onClick={() => handleEditClick("email")}>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            {isEditingEmail && (
                                <button onClick={() => handleSaveChange("email")}>Guardar</button>
                            )}
                        </div>

                        <div className="settings-item-button">
                            <button className="Button" onClick={handleResetPasswordForm}>
                                Cambiar contraseña
                            </button>
                        </div>

                        <div className="settings-item">
                            <a className="sign-out" onClick={handleSignOut} href="/">
                                Cerrar sesión
                            </a>
                        </div>
                    </div>
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