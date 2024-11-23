import { fetchProducts } from '../utils/mockData/Products'
import { useEffect, useState } from 'react'


const PrincipalBox = () => {

    const [products, setProducts] = useState([])

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

    }, [])

    const a = async () => {
        console.log(products)
    }

    return (
        <div className="PB-container">
            <div className="recommendations">
                <h2>¡Espectacular Venta de Verano!</h2>
                <h3>Obtén un 30% de descuento en todas las colecciones de verano</h3>
                <div className="date">
                    <p>La oferta termina el:</p>
                    <span>12/10/2024</span>
                </div>
                <p>¡Apresúrate! La oferta terminara pronto.</p>
                <button className="Button" onClick={a}>Comprar ahora</button>
            </div>
        </div>

    );
}


export default PrincipalBox