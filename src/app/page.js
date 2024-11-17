'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from "./comp/Header"
import PrincipalBox from "./comp/Principal-Box"
import { SetView } from './utils/renderers/SetView'
import { products } from './utils/mockData/Products'
import { CartSButton } from './utils/actions/CartButton'
import { HeartButton } from './utils/actions/HeartButton'


export default function Home() {
  const [favorites, setFavorites] = useState([])
  const [cartShopping, setCartShopping] = useState([])

  const [isLogin, setIsLogin] = useState(null)

  const router = useRouter()

  const UserPanelButton = () => {
    router.push('/login')
  }

  return (
    <>
      <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} />
      <PrincipalBox />
      
      <SetView 

      p={products} cartShopping={cartShopping} CartSButton={CartSButton} HeartButton={HeartButton} favorites={favorites} setCartShopping={setCartShopping} setFavorites={setFavorites}
      
      />

    </>
  );
}

