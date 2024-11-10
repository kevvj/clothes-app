import { HeartButton } from "../actions/HeartButton";
import { CartSButton } from "../actions/CartButton";

export const SetView = ({ p }) => {
    return (
        <ClothesBox prod={p} CS={cartShopping} CSB={CartSButton} HB={HeartButton} Fav={favorites}></ClothesBox>
    )
}