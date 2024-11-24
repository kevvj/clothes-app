import { AddToCart } from "../utils/actions/CartButton";
import { useStateContext } from "../globals/StateContext";

const PrincipalBox = () => {

    const { cart, setCart } = useStateContext()

    const but = () =>{
        AddToCart(5,3)

        console.log(cart)
    }

    return (
        <div className="PB-container">
            <div className="recommendations">
                <h2>¡Espectacular Venta de Verano!</h2>
                <h3>Obtén un 30% de descuento en todas las colecciones de verano</h3>
                <div className="date">
                    <p>La oferta termina el:</p>
                    <span>12/10/2024</span>
                </div>
                <p>¡Apresúrate! La oferta terminara pronto.</p>
                <button className="Button" onClick={but}>Comprar ahora</button>
            </div>
        </div>

    )
}


export default PrincipalBox