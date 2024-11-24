
import { useEffect, useState } from 'react'
import { idClient } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'
import { fetchCart } from '../utils/mockData/fetchCart'

const UserCart = () => {

    const { cart, setCart } = useStateContext()

    const id_cliente = idClient()

    useEffect(() => {
        fetchCart(setCart)
    }, [id_cliente])

    const deleteProduct = async (id_producto) => {
        if (!id_cliente || !id_producto) {
            console.error('Faltan datos para eliminar el producto del carrito.');
            return
        }

        try {
            const response = await fetch('http://localhost:3001/remove-from-cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_cliente, id_producto }),
            })

            const data = await response.json();

            if (response.ok) {
                console.log(data.message)
                fetchCart(setCart)
            } else {
                console.error('Error al eliminar el producto:', data.message)
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error)
        }
    }

    return (
        <div className="user-cart">
            <div className="cart-items-container">
                {cart.map((item) => (
                    <div key={item.id_producto} className="cart-items">
                        <div>{item.nombre_producto} - {item.precio} USD (Cantidad: {item.cantidad})</div>

                        <div>
                            <button >pagar</button>
                            <button onClick={() => deleteProduct(item.id_producto)}>borrar</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserCart