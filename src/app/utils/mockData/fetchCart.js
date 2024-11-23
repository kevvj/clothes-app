import { useStateContext } from '../../globals/StateContext'
import { idClient } from '../../globals/LogIn'
export const fetchCart = async (setCarrito) => {
    const id_cliente = idClient()
    
    try {
      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_cliente }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()
      setCarrito(data.cart)

      console.log(data.cart)
    } catch (error) {
      console.error("Error al obtener el carrito:", error)
    }
  }