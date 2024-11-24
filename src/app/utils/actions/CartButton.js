import { idClient } from "@/app/globals/LogIn"
import { fetchCart } from "../mockData/fetchCart"


export const CartSButton = (ProductId, setCartShopping) => {

    setCartShopping(prev =>
        prev.includes(ProductId) ? prev.filter(id => id !== ProductId) : [...prev, ProductId])

}

export const AddToCart =  async  (id_producto,cantidad, setCart) =>{
    const id_cliente = idClient()

    if (!id_cliente) {
        console.error("Error: No se encontró el ID del cliente.")
        return
    }
    
    const newProduct = {
        id_cliente,
        id_producto,
        cantidad
    }

    try {
        const response = await fetch('http://localhost:3001/add-to-cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al añadir al carrito:", errorData.message)
            return
        }

        const data = await response.json();
        console.log("Producto añadido o actualizado en el carrito:", data.message)
    } catch (error) {
        console.error("Error al realizar la solicitud:", error)
    }

    fetchCart(setCart)
}

