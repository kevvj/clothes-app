import { useState } from 'react';
import { useRouter } from 'next/navigation';

const UserForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            console.log("Response status: ", response.status)

            if (response.ok) {
                console.log("registro exitoso")
                router.push('/login')
            } else {
                const data = await response.json();
                console.error("Error en el registro:", data.message || "Error desconocido");
            }
        } catch (error) {
            console.error("Error en la solicitud de registro: ", error)
        }
    };

    return (
        <div className="user-form-content">
            <div className="user-form">
                <button className="left-button" onClick={() => router.push('/login')}>←</button>

                <form onSubmit={handleSubmitForm}>
                    <h2>Registrar</h2>

                    <div>
                        <p>Nombres</p>
                        <input
                            type='text'
                            value={firstName}
                            name="firstName"
                            placeholder='Escriba su nombre'
                            onChange={({ target }) => setFirstName(target.value)}
                        />
                    </div>

                    <div>
                        <p>Apellidos</p>
                        <input
                            type='text'
                            value={lastName}
                            name="lastName"
                            placeholder='Escriba su apellido'
                            onChange={({ target }) => setLastName(target.value)}
                        />
                    </div>

                    <div>
                        <p>Correo electronico</p>
                        <input
                            type='text'
                            value={email}
                            name="email"
                            placeholder='Escriba su país'
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </div>

                    <div>
                        <p>Usuario</p>
                        <input
                            type='text'
                            value={username}
                            name="username"
                            placeholder='Escriba su usuario'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>

                    <div>
                        <p>Contraseña</p>
                        <input
                            type='password'
                            value={password}
                            name="password"
                            placeholder='Escriba su contraseña'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>

                    <div className="button-form-conteiner">
                        <button type="submit" className="Button">Registrar</button>
                        <button type="button" className="Button" onClick={() => router.push('/login')}>Iniciar Sesión</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;
