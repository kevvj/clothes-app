'use client';
import Header from "./comp/Header";
import { useState } from 'react';
import PrincipalBox from "./comp/Principal-Box";
import { products, products2 } from "./utils/mockData/Products";
import {UserPanelButton} from "./utils/actions/UserPanelButton"
import { SetView } from "./utils/renderers/SetView";



export default function Home() {

  const [favorites, setFavorites] = useState([])
  const [cartShopping, setCartShopping] = useState([])

  

  return (
    <>
      <Header Fav = {favorites} CS={cartShopping} UserB={UserPanelButton}></Header>
      <PrincipalBox></PrincipalBox>
      <SetView p={products}></SetView>
    </>


  );
}

