'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import { faHeart as HeartS } from "@fortawesome/free-solid-svg-icons";

const aimg = "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
const products = [
    { id: 1, name: "Straps", price: 4.99, image: "https://suplementosolimpicos.com/wp-content/uploads/2022/08/STRAPS-3.png" },
    { id: 2, name: "Zapatos deportivos", price: 49.99, image: "https://ae01.alicdn.com/kf/S43619d07a6204d7dba3bb3d4be5c7c76T/Zapatillas-de-deporte-de-moda-para-hombre-zapatos-casuales-para-gimnasio-trotar-tenis-entrenador-planos-suaves.jpg" },
    { id: 3, name: "Camiseta de compresion", price: 30.99, image: "https://s7d7.scene7.com/is/image/GTMSportswear/2611TU?qlt=80,0&resMode=sharp2&fmt=png-alpha&hei=500&wid=500&layer=1&op_colorize=181818" },
    { id: 4, name: "Cinturon", price: 70.99, image: "https://gravityec.com/wp-content/uploads/2024/01/CPN.webp" },
    { id: 5, name: "Camiseta Blanca Poison", price: 999.99, image: "https://images-na.ssl-images-amazon.com/images/I/51dRXn4pwdS._AC_UL600_SR600,600_.jpg" },
    { id: 6, name: "producto 6", price: 49.99, image: aimg },
    { id: 7, name: "producto 7", price: 199.99, image: aimg },
    { id: 8, name: "producto 8", price: 19.99, image: aimg },
]




const ClothesBox = () => {


    const [favorites, setFavorites] = useState([])

    const HeartButton = (ProductId) => {

        setFavorites(prev =>
            prev.includes(ProductId) ? prev.filter(id => id !== ProductId) : [...prev, ProductId])

        console.log(favorites)

    }

    return (
        <div className="c-container">


            <div className="card-container">

                {products.map((product) => (
                    <div key={product.id} className="card">

                        <div className="card-content">

                            <img src={product.image} alt={product.name} className=""></img>
                            
                            <h2 className="">{product.name}</h2>

                            <p>$ {product.price}</p>

                        </div>

                        <div className="card-footer">

                            <button className="Button">Add to cart</button>

                            <button className="Button" onClick={() => HeartButton(product.id)}>


                                <FontAwesomeIcon className={favorites.includes(product.id) ? "Heart" : "noHeart"} icon={favorites.includes(product.id) ? HeartS : faHeart} size="1x" />

                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClothesBox