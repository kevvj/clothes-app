
'use client'

import Header from "@/app/comp/Header"
import { useState, useEffect } from "react"
import { useStateContext } from "@/app/globals/StateContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as HeartS } from "@fortawesome/free-solid-svg-icons"
import { AddToCart } from "../../utils/actions/CartButton"
import { HeartButton } from '../../utils/actions/HeartButton'


export default function Home() {
    const [category, setCategory] = useState()
    const { cart, setCart } = useStateContext()
    const { favorites, setFavorites } = useStateContext()
    const { cartShopping, setCartShopping } = useStateContext()

    useEffect(() => {
        async function fetchCategory() {
            const categoria = "Ropa Deportiva"
            try {
                const response = await fetch('http://localhost:3001/products-by-category', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ categoria })

                })

                const data = await response.json()

                const transformedData = data.products.map(product => ({
                    id: product.id_producto,     
                    name: product.nombre,      
                    price: parseFloat(product.precio),
                    image: product.imagen,      
                    description: product.descripcion || "", 
                    category: product.categoria || ""
                }))
                if (response.ok) {
                    setCategory(transformedData)
                } else {
                    console.log('Error en la base de datos: ', data.message)
                }
            } catch (error) {
                console.log("Error en el try", error)
            }
        }

        fetchCategory()
    }, [])


    return (
        <>
            <Header />


            <div className="c-container">
                <div className="card-container">
                    {category && category.map((product) => (
                        <div key={product.id} className="card">

                            <div className="card-content">

                                <img src={`http://localhost:3001/${product.image}`} alt={product.name} className=""></img>

                                <h2 className="">{product.name}</h2>

                                <p>$ {product.price}</p>

                            </div>

                            <div className="card-footer">

                                <button className="Button" onClick={() => AddToCart(product.id, 1, setCart)}>

                                    {cart && cart.some(item => item.id_producto === product.id) ? "Añadir mas de esto" : "Añadir al carrito"}


                                </button>

                                <button className="Button" onClick={() => HeartButton(product.id, setFavorites)}>


                                    <FontAwesomeIcon className={favorites.includes(product.id) ? "Heart" : "noHeart"} icon={favorites.includes(product.id) ? HeartS : faHeart} size="1x" />

                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}