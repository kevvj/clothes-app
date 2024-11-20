import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    isLoggedIn, setIsLoggedIn,
    idClient,setIdClient,
    usernameGlobal, setUsernameGlobal,
    name, setName,
    email, setEmail,
    registrationDate, setRegistrationDate
} from '../globals/LogIn'

import { profilePicture, setProfilePicture } from '../globals/ProfilePicture'

const UserForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter();

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        try {

            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            if (response.ok) {
                setIsLoggedIn(true)
                router.push('/');
                console.log(data.message)

                const pic = "http://localhost:3001/"+ data.user.porfilepic

                setUsernameGlobal(data.user.username)
                setName(data.user.name)
                setEmail(data.user.email)
                setRegistrationDate(data.user.registration_date)
                setIdClient(data.user.id)

                
                 if (data.user.porfilepic) {
                    setProfilePicture(pic)
                }else{
                    setProfilePicture("")
                }
                

                console.log("Nombre de usuario: ",usernameGlobal(), "Nombre del cliente: ",name(), "Correo electronico: ",email(),"Fecha de registro: ", registrationDate(),"ID del cliente: ",idClient(), "foto de perfil: ",profilePicture())


            } else {
                setIsLoggedIn(false)
                console.error(data.message)
            }

        } catch (error) {

            console.error("Error en la solicitud de login:", error);

        }
    }

    const handleRegisterClick = () => {
        router.push('/register')
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        router.push('/')

        ////////////////////////////////////


    }




    return (
        <div className="user-form-content">

            <div className="user-form">

                <button className="left-button" onClick={handleSubmit}>←</button>

                <form onSubmit={handleSubmitForm}>



                    <h2>Iniciar Sesion</h2>

                    <div>
                        <p>Usuario</p>
                        <input
                            type='text'
                            values={username}
                            name="username"
                            placeholder='Escriba su usuario'
                            onChange={({ target }) => setUsername(target.value)}
                        ></input>
                    </div>

                    <div>
                        <p>Contraseña</p>
                        <input
                            type='password'
                            values={password}
                            name="password"
                            placeholder='Escriba su contraseña'
                            onChange={({ target }) => setPassword(target.value)}
                        ></input>
                    </div>

                    <div className="button-form-conteiner">
                        <button type="submit" className="Button">Ingresar</button>
                        <button type="button" className="Button" onClick={handleRegisterClick}>Registrar</button>
                    </div>


                    {isLoggedIn === false && <p className="error">Usuario o contraseña incorrecta</p>}
                </form>

            </div>



        </div>
    )
}

export default UserForm