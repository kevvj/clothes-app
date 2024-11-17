'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from "./comp/Header"
import PrincipalBox from "./comp/Principal-Box"
import { SetView } from './utils/renderers/SetView'
import { products } from './utils/mockData/Products'
import { CartSButton } from './utils/actions/CartButton'
import { HeartButton } from './utils/actions/HeartButton'


import {isLoggedIn, setIsLoggedIn} from './globals/LogIn'
import { useStateContext } from './globals/StateContext'


export default function Home() {
  const {favorites, setFavorites} = useStateContext()
  const {cartShopping, setCartShopping} = useStateContext()


  const router = useRouter()

  const UserPanelButton = () => {

    if(!isLoggedIn()){
      router.push('/login')
    }else{
      router.push('/user')
    }
    
    console.log(isLoggedIn())
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

