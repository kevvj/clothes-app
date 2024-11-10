import { HeartButton } from "../actions/HeartButton";
import { CartSButton } from "../actions/CartButton";

import ClothesBox from "@/app/comp/Clothes-Box";

export const SetView = ({ p, cartShopping, CartSButton, HeartButton, favorites, setCartShopping, setFavorites }) => {
    return (
        <ClothesBox prod={p} CS={cartShopping} CSB={CartSButton} HB={HeartButton} Fav={favorites} setCartShopping={setCartShopping} setFavorites={setFavorites}></ClothesBox>
    )
}