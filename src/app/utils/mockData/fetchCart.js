import { useStateContext } from '../../globals/StateContext'
import { idClient } from '../../globals/LogIn'
export const fetchCart = async (setCart) => {
    const id_cliente = idClient()
    
    try {
      const response = await fetch("http://localhost:3001/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_cliente }),
      })

      if (!response.ok) {
        console.log('error')
      }

      const data = await response.json()

      if(data.cart){
        setCart(data.cart)
      }else{
        setCart([])
      }
      

      console.log(data.cart)
    } catch (error) {
      console.error("Error al obtener el carrito:", error)
    }
  }