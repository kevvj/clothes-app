import { useState, useEffect } from "react" 
import { 
    isLoggedIn, setIsLoggedIn, 
    usernameGlobal, setUsernameGlobal, 
    name, setName, 
    email, setEmail, 
    idClient, 
    userType,
    address,setAddress
} from '../globals/LogIn' 
import { profilePicture, setProfilePicture } from '../globals/ProfilePicture' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"


const ComunUser = () => {

    const [image, setImage] = useState("./img/Racist_Cat.webp") 

    const [isEditingName, setIsEditingName] = useState(false) 
    const [isEditingUsername, setIsEditingUsername] = useState(false) 
    const [isEditingEmail, setIsEditingEmail] = useState(false) 
    const [isEditingAddress, setIsEditingAddress] = useState(false) // Nueva variable para la dirección

    const [newName, setNewName] = useState(name()) 
    const [newUsername, setNewUsername] = useState(usernameGlobal()) 
    const [newEmail, setNewEmail] = useState(email()) 
    const [newAddress, setNewAddress] = useState(address()) // Inicializa la dirección si la tienes en el estado global

    const [isClient, setIsClient] = useState(false) 

    useEffect(() => { 
        setIsClient(true) 
    }, []) 

    if (!isClient) { 
        return null; 
    }

    const handleSignOut = () => { 
        setIsLoggedIn(false) 
    }

    const handleImageChange = async (event) => { 
        const file = event.target.files[0] 
        if (file) { 
            const formData = new FormData() 
            formData.append('file-upload', file) 
            formData.append('clientId', idClient()) 

            try { 
                const response = await fetch('http://localhost:3001/upload-img-client', { 
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

    const handleEditClick = (field) => { 
        if (field === "name") setIsEditingName(true) 
        if (field === "username") setIsEditingUsername(true) 
        if (field === "email") setIsEditingEmail(true) 
        if (field === "address") setIsEditingAddress(true) // Editar dirección
    }

    const handleInputChange = (e, field) => { 
        const value = e.target.value; 
        if (field === "name" && value !== newName) { 
            setNewName(value); 
        } 
        if (field === "username" && value !== newUsername) { 
            setNewUsername(value); 
        } 
        if (field === "email" && value !== newEmail) { 
            setNewEmail(value); 
        }
        if (field === "address" && value !== newAddress) { // Cambiar dirección
            setNewAddress(value);
        }
    }

    const handleSaveChange = async (field) => { 
        let newValue = "" 
        let newField = "" 

        if (field === "name") { 
            setName(newName) 
            setIsEditingName(false) 
            newValue = newName 
            newField = "nombre" 
        } 
        if (field === "username") { 
            setUsernameGlobal(newUsername) 
            setIsEditingUsername(false) 
            newValue = newUsername 
            newField = "nombre_usuario" 
        } 
        if (field === "email") { 
            setEmail(newEmail) 
            setIsEditingEmail(false) 
            newValue = newEmail 
            newField = "email" 
        }
        if (field === "address") { // Guardar dirección
            setAddress(newAddress)
            setIsEditingAddress(false)
            newValue = newAddress
            newField = "direccion"
        }

        const userData = { 
            clientId: idClient(), 
            field: newField, 
            newValue 
        }

        console.log("Id:", userData.clientId, "Columna:", userData.field, "Nuevo valor:", userData.newValue)

        try { 
            const response = await fetch('http://localhost:3001/update-client', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json' 
                }, 
                body: JSON.stringify(userData), 
            }) 

            const data = await response.json() 
            if (response.ok) { 
                console.log("Dato actualizado:", data.field) 
            } else { 
                console.error("Error al actualizar", data.error) 
            } 
        } catch (error) { 
            console.error("Error al actualizar datos", error) 
        } 
    }

    return ( 
        <div className="user-section-container"> 
            <div className="user-section"> 
                <div className="image-container"> 
                    {profilePicture() === "" ? 
                        <FontAwesomeIcon icon={faCircleUser} className="profile-picture-update" /> : 
                        isClient ? 
                            <img src={profilePicture()} alt="Profile" /> : <FontAwesomeIcon icon={faCircleUser} className="profile-picture-update" />} 

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
                            <p>{isClient && name()}</p> 
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
                            <p>{isClient && usernameGlobal()}</p> 
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
                            <p>{isClient && email()}</p> 
                        )} 
                        <button onClick={() => handleEditClick("email")}> 
                            <FontAwesomeIcon icon={faPenToSquare} /> 
                        </button> 
                        {isEditingEmail && ( 
                            <button onClick={() => handleSaveChange("email")}>Guardar</button> 
                        )} 
                    </div> 

                    {/* Agregar sección de Dirección */}
                    <div className="settings-item"> 
                        <h4>Dirección: </h4> 
                        {isEditingAddress ? ( 
                            <input 
                                type="text" 
                                value={newAddress} 
                                onChange={(e) => handleInputChange(e, "address")} 
                            /> 
                        ) : ( 
                            <p>{isClient && newAddress}</p> // Mostrar dirección si está disponible
                        )} 
                        <button onClick={() => handleEditClick("address")}> 
                            <FontAwesomeIcon icon={faPenToSquare} /> 
                        </button> 
                        {isEditingAddress && ( 
                            <button onClick={() => handleSaveChange("address")}>Guardar</button> 
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

export default ComunUser
