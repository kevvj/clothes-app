'use client';  

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "./comp/Header";
import PrincipalBox from "./comp/Principal-Box";

export default function Home() {
  const [favorites, setFavorites] = useState([]);
  const [cartShopping, setCartShopping] = useState([]);


  const router = useRouter()

  const UserPanelButton = () => {
     router.push('/login');
  };

  return (
    <>
      <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} />
      <PrincipalBox />
    </>
  );
}

