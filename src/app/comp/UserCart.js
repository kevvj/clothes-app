
import { useEffect, useState } from 'react'
import { idClient } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'
import { fetchCart } from '../utils/mockData/fetchCart'

const UserCart = () => {

    const {carrito, setCarrito} = useStateContext()

    const id_cliente = idClient()
    
    useEffect(() => {
        fetchCart(setCarrito)
      }, [id_cliente])

    return (
        <div className="user-cart">
            <div className="cart-items-container">
                {carrito.map((item) => (
                    <div key={item.id_producto} className="cart-items">
                        {item.nombre_producto} - {item.precio} USD (Cantidad: {item.cantidad})
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserCart