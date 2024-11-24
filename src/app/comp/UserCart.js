
import { useEffect, useState } from 'react'
import { idClient } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'
import { fetchCart } from '../utils/mockData/fetchCart'
import { fetchProducts } from '../utils/mockData/Products'

const UserCart = () => {
    const { products, setProducts } = useStateContext([])
    const { cart, setCart } = useStateContext()
    const id_cliente = idClient()

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts()
            const transformedData = data.map(product => ({
                id: product.id_producto,
                name: product.nombre,
                price: parseFloat(product.precio),
                image: product.imagen,
                description: product.descripcion || "",
                category: product.categoria || ""
            }))
            setProducts(transformedData)
        }

        loadProducts()
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
                {cart.length > 0 ? cart.map((item) => {
                    const product = products.find((p) => p.id === item.id_producto)

                    console.log(products)

                    return (
                        <div key={item.id_producto} className="cart-items">
                            <div className='product-items'>
                                {product ? (
                                    <>
                                        <div className='product-title'>

                                            <img src={product.image} alt={product.name} className=""></img>
                                            <h3>{product.name}</h3>
                                        </div>
                                        <div className='item-description'>
                                            <p>{product.description}</p>
                                            {item.precio} USD (Cantidad: {item.cantidad})
                                        </div>

                                    </>
                                ) : (
                                    'Producto no encontrado'
                                )}
                            </div>

                            <div className='cart-items-buttons'>
                                <button className='Button'>pagar</button>
                                <button className='Button' onClick={() => deleteProduct(item.id_producto)}>borrar</button>
                            </div>
                        </div>
                    )
                }) : <div><h1>No tiene ningun producto en el carrito <span>🤧</span></h1> </div>}
            </div>
        </div>
    )
}

export default UserCart