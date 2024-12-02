import { useEffect, useState } from 'react'
import { idClient } from '../globals/LogIn'
import { useStateContext } from '../globals/StateContext'
import { fetchProducts } from '../utils/mockData/Products'

const UserOrders = () => {
    const { products, setProducts } = useStateContext([])
    const [orders, setOrders] = useState([])
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

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3001/get-orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id_cliente })
                })

                const data = await response.json()
                if (response.ok) {
                    setOrders(data.orders)
                } else {
                    console.error('Error al obtener los pedidos:', data.message)
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error)
            }
        }

        loadProducts()
        fetchOrders()
    }, [id_cliente])

    return (
        <div className="user-orders">
            <div className="orders-container">
                {orders.length > 0 ? orders.map((order) => {
                    const product = products.find((p) => p.id === order.id_producto)

                    return (
                        <div key={order.id_pedido} className="order-item">
                            <div className='product-items'>
                                {product ? (
                                    <>
                                        <div className='product-title'>
                                            <img src={`http://localhost:3001/${product.image}`} alt={product.name} className=""></img>
                                            <h3>{product.name}</h3>
                                        </div>
                                        <div className='item-description'>
                                            <p>{product.description}</p>
                                            {order.precio_unitario} USD (Cantidad: {order.cantidad})
                                            <p>Pedido el: {new Date(order.fecha_pedido).toLocaleDateString()}</p>
                                        </div>
                                    </>
                                ) : (
                                    'Producto no encontrado'
                                )}
                            </div>
                        </div>
                    )
                }) : <div><h1>No tiene ningún pedido registrado <span>🤧</span></h1></div>}
            </div>
        </div>
    )
}

export default UserOrders
