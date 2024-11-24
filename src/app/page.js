'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from "./comp/Header"
import PrincipalBox from "./comp/Principal-Box"
import { SetView } from './utils/renderers/SetView'
import {fetchProducts } from './utils/mockData/Products'
import { CartSButton } from './utils/actions/CartButton'
import { HeartButton } from './utils/actions/HeartButton'
import { fetchCart } from './utils/mockData/fetchCart'


import {isLoggedIn, setIsLoggedIn} from './globals/LogIn'
import { useStateContext } from './globals/StateContext'


export default function Home() {
  const {favorites, setFavorites} = useStateContext()
  const {cartShopping, setCartShopping} = useStateContext()

  const [products, setProducts] = useState([])
  const {cart, setCart} = useStateContext()
  useEffect(() => {
      const loadProducts = async () => {
          const data = await fetchProducts()
          const transformedData = data.map(product => ({
              id: product.id_producto,     
              name: product.nombre,      
              price: parseFloat(product.precio),
              image: product.imagen,      
              description: product.descripcion || "", 
              category: product.categoria || ""
          }))
          setProducts(transformedData)
      }

      loadProducts()
      fetchCart(setCart)

  }, [])


  const router = useRouter()

  const UserPanelButton = () => {

    if(!isLoggedIn()){
      router.push('/login')
    }else{
      router.push('/user')
    }
    
    console.log(isLoggedIn())
  }

  const UserCartButton = () =>{
    if(!isLoggedIn()){
      router.push('/login')
    }else{
      router.push('/cart')
    }
    console.log('huevos')
  }

  return (
    <>
      <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} CartB = {UserCartButton}/>
      <PrincipalBox  />
      
      <SetView 

      p={products} cartShopping={cartShopping} CartSButton={CartSButton} HeartButton={HeartButton} favorites={favorites} setCartShopping={setCartShopping} setFavorites={setFavorites}
      
      />

    </>
  );
}

