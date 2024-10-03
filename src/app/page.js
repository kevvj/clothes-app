import Image from "next/image";
import styles from "./page.module.css";
import ClothesBox from "./Clothes-Box";
import Head from 'next/head';

export default function Home() {
  return (


    <div>

      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <ClothesBox></ClothesBox>

    </div>


  );
}
