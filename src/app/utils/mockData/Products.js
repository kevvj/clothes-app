

export const fetchProducts = async () => {
  try {
    const response = await fetch('http://localhost:3001/products');
    const data = await response.json();

    return data

  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export const fetchProductsById = () =>{
  
}





const aimg = "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"

export const products = [
  { id: 1, name: "Straps", price: 4.99, image: "https://suplementosolimpicos.com/wp-content/uploads/2022/08/STRAPS-3.png", description: "", category: ""},
  { id: 2, name: "Zapatos deportivos", price: 49.99, image: "https://ae01.alicdn.com/kf/S43619d07a6204d7dba3bb3d4be5c7c76T/Zapatillas-de-deporte-de-moda-para-hombre-zapatos-casuales-para-gimnasio-trotar-tenis-entrenador-planos-suaves.jpg" , description: "", category: ""},
  { id: 3, name: "Camiseta de compresion", price: 30.99, image: "https://s7d7.scene7.com/is/image/GTMSportswear/2611TU?qlt=80,0&resMode=sharp2&fmt=png-alpha&hei=500&wid=500&layer=1&op_colorize=181818" , description: "", category: ""},
  { id: 4, name: "Cinturon", price: 70.99, image: "https://gravityec.com/wp-content/uploads/2024/01/CPN.webp" , description: "", category: ""},
]

export const products2 = [
  { id: 11, name: "producto 11", price: 19.99, image: aimg , description: "", category: ""},
  { id: 7, name: "producto 7", price: 199.99, image: aimg , description: "", category: ""},
  { id: 8, name: "producto 8", price: 19.99, image: aimg , description: "", category: ""},
  { id: 9, name: "producto 9", price: 49.99, image: aimg , description: "", category: ""},
]
