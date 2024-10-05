'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useState } from 'react';
import { faHeart as HeartS } from "@fortawesome/free-solid-svg-icons";

const aimg = "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
const products = [
    { id: 1, name: "product 1", price: 19.99, image: aimg },
    { id: 2, name: "product 2", price: 49.99, image: aimg },
    { id: 3, name: "product 3", price: 199.99, image: aimg },
    { id: 4, name: "product 4", price: 19.99, image: aimg },
    { id: 5, name: "product 5", price: 19.99, image: aimg },
    { id: 6, name: "product 6", price: 49.99, image: aimg },
    { id: 7, name: "product 7", price: 199.99, image: aimg },
    { id: 8, name: "product 8", price: 19.99, image: aimg },
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
            <h1 className="title">Our Products</h1>

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

                                
                                <FontAwesomeIcon className={favorites.includes(product.id) ? "Heart":"noHeart"} icon={favorites.includes(product.id) ? HeartS:faHeart} size="1x" />

                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClothesBox