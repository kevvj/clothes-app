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



    const handleSubmit = (event) => {
        event.preventDefault()

        const user = users.find(u => u.username === event.target.username.value)

        if( user && user.password === event.target.password.value){
            
            setIsLoggedIn(true)
            router.push('/')
        }else{
            setIsLoggedIn(false)
        }
    }


    return (
        <div className="user-form-content">


            <form onSubmit={handleSubmit}>

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

                <button className="Button">Ingresar</button>

                {isLoggedIn ===false && <p className = "error">Usuario o contraseña incorrecta</p>}
            </form>

        </div>
    )
}

export default UserForm