import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    const router = useRouter();

    const users = [
        { id: 1, username: "user", password: "password" },
        { id: 2, username: "user2", password: "password2" },
        { id: 3, username: "user3", password: "password3" },
    ];



    const handleSubmitForm = (event) => {
        event.preventDefault()

        const user = users.find(u => u.username === event.target.username.value)

        if (user && user.password === event.target.password.value) {

            setIsLoggedIn(true)
            router.push('/')
        } else {
            setIsLoggedIn(false)
        }
    }

    const handleRegisterClick = () => {
        
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        router.push('/login')
    }




    return (
        <div className="user-form-content">

            <div className="user-form">

                <button className="left-button" onClick={handleSubmit}>←</button>

                <form onSubmit={handleSubmitForm}>



                    <h2>Registrar</h2>

                    <div>
                        <p>Nombres</p>
                        <input
                            type='text'
                            values={username}
                            name="username"
                            placeholder='Escriba su nombre'
                            onChange={({ target }) => setUsername(target.value)}
                        ></input>
                    </div>

                    <div>
                        <p>Apellidos</p>
                        <input
                            type='text'
                            values={username}
                            name="username"
                            placeholder='Escriba su apellido'
                            onChange={({ target }) => setUsername(target.value)}
                        ></input>
                    </div>

                    <div>
                        <p>Pais</p>
                        <input
                            type='text'
                            values={username}
                            name="username"
                            placeholder='Escriba su pais'
                            onChange={({ target }) => setUsername(target.value)}
                        ></input>
                    </div>


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

                    <div className = "button-form-conteiner">
                        <button type = "submit" className="Button" onClick = {handleRegisterClick}>Registrar</button>

                        <button type = "button" className="Button" >Iniciar Sesion</button>
                    </div>


                    {isLoggedIn === false && <p className="error">Usuario o contraseña incorrecta</p>}
                </form>

            </div>



        </div>
    )
}

export default UserForm