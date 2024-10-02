

const aimg = "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"
const products = [
    { id: 1, name: "product 1", price: 19.99, image: aimg },
    { id: 2, name: "product 2", price: 49.99, image: aimg },
    { id: 3, name: "product 3", price: 199.99, image: aimg },
    { id: 4, name: "product 4", price: 19.99, image: aimg },
]




const ClothesBox = () => {
    return (
        <div className="c-container">
            <h1 className="">Our Products</h1>

            <div className="card-container">

            {products.map((product) => (
                    <div key={product.id} className="card">

                        <div className="card-content">

                            <img src={product.image} alt={product.name} className=""></img>

                            <h2 className="">{product.name}</h2>

                            <p>$ {product.price}</p>

                        </div>

                        <div className="card-footer">

                            <button className = "Button">Add to cart</button>

                            <button className = "Button">💟</button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClothesBox