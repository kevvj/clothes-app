import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    isLoggedIn, setIsLoggedIn,
    idClient,setidClient,
    usernameGlobal, setUsernameGlobal,
    name, setName,
    email, setEmail,
    registrationDate, setRegistrationDate
} from '../globals/LogIn'

const PasswordUpdate = () => {

    return (
        <div className="user-form-content">

            <div className="user-form">

                <button className="left-button" >←</button>

                <form>



                    <h2>Cambiar contraseña</h2>

                    <div>
                        <p>Contraseña antigua</p>
                        <input
                            type='password'
                            values={""}
                            name="password"
                            placeholder='Contraseña actual'
                            onChange={""}
                        ></input>
                    </div>

                    <div>
                        <p>Contraseña nueva</p>
                        <input
                            type='password'
                            values={""}
                            name="password"
                            placeholder='Nueva contraseña'
                            onChange={""}
                        ></input>
                    </div>

                    <div>
                        <p>Confirmar contraseña nueva</p>
                        <input
                            type='password'
                            values={""}
                            name="password"
                            placeholder='Confirmar contraseña'
                            onChange={""}
                        ></input>
                    </div>

                    <div className="button-form-conteiner">
                        <button type="submit" className="Button">Ingresar</button>
                        <button type="button" className="Button">Registrar</button>
                    </div>


                    {isLoggedIn === false && <p className="error">Usuario o contraseña incorrecta</p>}
                </form>

            </div>



        </div>
    )
}

export default PasswordUpdate