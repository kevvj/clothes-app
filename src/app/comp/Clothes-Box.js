'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { faHeart as HeartS } from "@fortawesome/free-solid-svg-icons";

import { AddToCart } from "../utils/actions/CartButton";
import { useStateContext } from '../globals/StateContext'



const ClothesBox = ({ prod, HB, Fav, setFavorites }) => {

    const { cart, setCart } = useStateContext()



    return (
        <div className="c-container">


            <div className="card-container">

                {prod.map((product) => (
                    <div key={product.id} className="card">

                        <div className="card-content">

                            <img src={product.image} alt={product.name} className=""></img>

                            <h2 className="">{product.name}</h2>

                            <p>$ {product.price}</p>

                        </div>

                        <div className="card-footer">

                            <button className="Button" onClick={() => AddToCart(product.id, 1, setCart)}>

                            {cart && cart.some(item => item.id_producto === product.id) ? "Pagar en carrito" : "Añadir al carrito"}


                            </button>

                            <button className="Button" onClick={() => HB(product.id, setFavorites)}>


                                <FontAwesomeIcon className={Fav.includes(product.id) ? "Heart" : "noHeart"} icon={Fav.includes(product.id) ? HeartS : faHeart} size="1x" />

                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClothesBox