'use client';
import { useState, useEffect, useRef } from 'react'
import Header from "../comp/Header"
import { useRouter } from 'next/navigation'
import PrincipalBox from "../comp/Principal-Box"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import {
    isLoggedIn, setIsLoggedIn,
    usernameGlobal, setUsernameGlobal,
    name, setName,
    email, setEmail,
    idClient,
    userType,
} from '../globals/LogIn'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-regular-svg-icons"
import { profilePicture, setProfilePicture } from '../globals/ProfilePicture'
import { useStateContext } from '../globals/StateContext'
import { fetchProducts } from '../utils/mockData/Products'

export default function Home() {
    const { favorites, setFavorites } = useStateContext()
    const { cartShopping, setCartShopping } = useStateContext()
    const { products, setProducts } = useStateContext([])
    const { cart, setCart } = useStateContext()

    const [isClient, setIsClient] = useState(false)
    const router = useRouter()

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
            setIsClient(true)
        }

        loadProducts()

    }, [])

    if (!isClient) {
        return null;
    }

    const UserPanelButton = () => {

        if (!isLoggedIn()) {
            router.push('/login')
        } else {

        }
        console.log(isLoggedIn())
    }

    const UserSection = () => {

        const handleSignOut = () => {
            setIsLoggedIn(false)
        }



        const ComunUser = () => {

            const [image, setImage] = useState("./img/Racist_Cat.webp")

            const [isEditingName, setIsEditingName] = useState(false)
            const [isEditingUsername, setIsEditingUsername] = useState(false)
            const [isEditingEmail, setIsEditingEmail] = useState(false)

            const [newName, setNewName] = useState(name())
            const [newUsername, setNewUsername] = useState(usernameGlobal())
            const [newEmail, setNewEmail] = useState(email())

            const [isClient, setIsClient] = useState(false)

            useEffect(() => {
                setIsClient(true)
            }, [])

            if (!isClient) {
                return null;
            }


            const handleImageChange = async (event) => {
                const file = event.target.files[0]
                if (file) {
                    const formData = new FormData()
                    formData.append('file-upload', file)
                    formData.append('clientId', idClient())

                    try {
                        const response = await fetch('http://localhost:3001/upload-img-client', {
                            method: 'POST',
                            body: formData,
                        })

                        const data = await response.json()
                        if (response.ok) {
                            setProfilePicture(`http://localhost:3001/${data.filePath}`)
                            setImage(profilePicture)


                            console.log("Imagen subida:", data.filePath)
                        } else {
                            console.error("Error al subir la imagen:", data.message)
                        }
                    } catch (error) {
                        console.error("Error al subir el archivo:", error)
                    }
                }
            }

            const handleResetPasswordForm = () => {
                router.push('/user/passwordupdate')
            }



            const handleEditClick = (field) => {
                if (field === "name") setIsEditingName(true)
                if (field === "username") setIsEditingUsername(true)
                if (field === "email") setIsEditingEmail(true)
            }

            const handleInputChange = (e, field) => {
                const value = e.target.value;
                if (field === "name" && value !== newName) {
                    setNewName(value);
                }
                if (field === "username" && value !== newUsername) {
                    setNewUsername(value);
                }
                if (field === "email" && value !== newEmail) {
                    setNewEmail(value);
                }
            }

            const handleSaveChange = async (field) => {
                let newValue = ""
                let newField = ""

                if (field === "name") {
                    setName(newName)
                    setIsEditingName(false)
                    newValue = newName
                    newField = "nombre"
                }
                if (field === "username") {
                    setUsernameGlobal(newUsername)
                    setIsEditingUsername(false)
                    newValue = newUsername
                    newField = "nombre_usuario"
                }
                if (field === "email") {
                    setEmail(newEmail)
                    setIsEditingEmail(false)
                    newValue = newEmail
                    newField = "email"
                }

                const userData = {
                    clientId: idClient(),
                    field: newField,
                    newValue
                }

                console.log("Id:", userData.clientId, "Columna:", userData.field, "Nuevo valor:", userData.newValue)


                try {
                    const response = await fetch('http://localhost:3001/update-client', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData),
                    })

                    const data = await response.json()
                    if (response.ok) {
                        console.log("Dato actualizado:", data.field)
                    } else {
                        console.error("Error al actualizar", data.error)
                    }
                } catch (error) {
                    console.error("Error al actualizar datos", error)
                }
            }

            return (
                <div className="user-section-container">
                    <div className="user-section">
                        <div className="image-container">
                            {profilePicture() === "" ?
                                <FontAwesomeIcon icon={faCircleUser} className="profile-picture-update" /> :
                                isClient ?
                                    <img src={profilePicture()} alt="Profile" /> : <FontAwesomeIcon icon={faCircleUser} className="profile-picture-update" />}


                            <label htmlFor="file-upload" className="file-upload-label">
                                <FontAwesomeIcon icon={faPenToSquare} className="setimage-icon" />
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="file-upload"
                                    accept=".jpg,.jpeg,.png"
                                    className="file-upload-input"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <div className="data-settings-container">
                            <div className="settings-item">
                                <h4>Nombres: </h4>
                                {isEditingName ? (
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => handleInputChange(e, "name")}
                                    />
                                ) : (
                                    <p>{isClient && name()}</p>
                                )}
                                <button onClick={() => handleEditClick("name")}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                {isEditingName && (
                                    <button onClick={() => handleSaveChange("name")}>Guardar</button>
                                )}
                            </div>

                            <div className="settings-item">
                                <h4>Nombre de usuario: </h4>
                                {isEditingUsername ? (
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => handleInputChange(e, "username")}
                                    />
                                ) : (
                                    <p>{isClient && usernameGlobal()}</p>
                                )}
                                <button onClick={() => handleEditClick("username")}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                {isEditingUsername && (
                                    <button onClick={() => handleSaveChange("username")}>Guardar</button>
                                )}
                            </div>

                            <div className="settings-item">
                                <h4>Correo Electrónico: </h4>
                                {isEditingEmail ? (
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => handleInputChange(e, "email")}
                                    />
                                ) : (
                                    <p>{isClient && email()}</p>
                                )}
                                <button onClick={() => handleEditClick("email")}>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                {isEditingEmail && (
                                    <button onClick={() => handleSaveChange("email")}>Guardar</button>
                                )}
                            </div>

                            <div className="settings-item-button">
                                <button className="Button" onClick={handleResetPasswordForm}>
                                    Cambiar contraseña
                                </button>
                            </div>

                            <div className="settings-item">
                                <a className="sign-out" onClick={handleSignOut} href="/">
                                    Cerrar sesión
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        const AdminUser = () => {
            const [productId, setProductId] = useState('')
            const [product, setProduct] = useState(null)
            const [error, setError] = useState('')
            const [isEditingName, setIsEditingName] = useState(false)
            const [newName, setNewName] = useState('')
            const [isEditingPrice, setIsEditingPrice] = useState(false)
            const [newPrice, setNewPrice] = useState('')
            const [isEditingDescription, setIsEditingDescription] = useState(false)
            const [newDescription, setNewDescription] = useState('')
            const [isEditingCategory, setIsEditingCategory] = useState(false)
            const [newCategory, setNewCategory] = useState('')
            const [image, setImage] = useState('')
            const [allProducts, setAllProducts] = useState([])

            const [isClient, setIsClient] = useState(false)

            const [newProduct, setNewProduct] = useState({
                nombre: '',
                descripcion: '',
                precio: '',
                categoria: '',
                imagen: null
            })
            const [addProductError, setAddProductError] = useState('')


            useEffect(() => {
                if (!productId) {
                    setAllProducts(products)
                }
                setIsClient(true)
            }, [productId, products])

            if (!isClient) {
                return null;
            }

            const handleProductIdChange = (e) => {
                setProductId(e.target.value)
            }

            const handleNewProductChange = (e) => {
                const { name, value, files } = e.target
                if (name === 'imagen') {
                    setNewProduct((prev) => ({ ...prev, imagen: files[0] }))
                } else {
                    setNewProduct((prev) => ({ ...prev, [name]: value }))
                }
            }

            const handleAddProduct = async () => {
                if (!newProduct.nombre || !newProduct.descripcion || !newProduct.precio || !newProduct.categoria) {
                    setAddProductError('Todos los campos son obligatorios')
                    return
                }

                const formData = new FormData()
                formData.append('nombre', newProduct.nombre)
                formData.append('descripcion', newProduct.descripcion)
                formData.append('precio', newProduct.precio)
                formData.append('categoria', newProduct.categoria)
                if (newProduct.imagen) {
                    formData.append('image', newProduct.imagen)
                }

                try {
                    const response = await fetch('http://localhost:3001/add-product', {
                        method: 'POST',
                        body: formData
                    })

                    if (response.ok) {
                        const data = await response.json()
                        console.log('Producto agregado:', data)
                        setAddProductError('')
                        setNewProduct({
                            nombre: '',
                            descripcion: '',
                            precio: '',
                            categoria: '',
                            imagen: null
                        })
                        alert('Producto agregado exitosamente')
                    } else {
                        const errorData = await response.json()
                        setAddProductError(errorData.message || 'Error al agregar el producto')
                    }
                } catch (err) {
                    setAddProductError('Error al agregar el producto')
                    console.error(err)
                }
            }

            const handleGetProduct = async () => {
                if (!productId) {
                    setError("Por favor ingrese un ID de producto")
                    setProduct(null)
                    return
                }

                try {
                    const response = await fetch(`http://localhost:3001/product/${productId}`)
                    const data = await response.json()

                    if (response.ok) {
                        setProduct(data)
                        setNewName(data.nombre)
                        setNewPrice(data.precio)
                        setNewDescription(data.descripcion)
                        setNewCategory(data.categoria)
                        setImage(`http://localhost:3001/${data.imagen}`)
                        setError('')
                    } else {
                        setError('Producto no encontrado')
                        setProduct(null)
                    }
                } catch (err) {
                    setError('Error al obtener los datos del producto')
                    setProduct(null)
                }
            }

            const handleInputChange = (e, field) => {
                if (field === "name") setNewName(e.target.value)
                if (field === "price") setNewPrice(e.target.value)
                if (field === "description") setNewDescription(e.target.value)
                if (field === "category") setNewCategory(e.target.value)
            }

            const handleSaveChange = async (field) => {
                let newValue = ""
                let newField = ""

                if (field === "name") {
                    setProduct(prevState => ({ ...prevState, nombre: newName }))
                    newValue = newName
                    newField = "nombre"
                    setIsEditingName(false)
                }
                if (field === "price") {
                    setProduct(prevState => ({ ...prevState, precio: newPrice }))
                    newValue = newPrice
                    newField = "precio"
                    setIsEditingPrice(false)
                }
                if (field === "description") {
                    setProduct(prevState => ({ ...prevState, descripcion: newDescription }))
                    newValue = newDescription
                    newField = "descripcion"
                    setIsEditingDescription(false)
                }
                if (field === "category") {
                    setProduct(prevState => ({ ...prevState, categoria: newCategory }))
                    newValue = newCategory
                    newField = "categoria"
                    setIsEditingCategory(false)
                }

                const productData = {
                    productId,
                    field: newField,
                    newValue
                }

                try {
                    const response = await fetch('http://localhost:3001/update-product', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(productData),
                    })

                    const data = await response.json()
                    if (response.ok) {
                        console.log("Dato actualizado:", data.field)
                    } else {
                        console.error("Error al actualizar", data.error)
                    }
                } catch (error) {
                    console.error("Error al actualizar datos", error)
                }
            }

            const handleImageChange = async (event) => {
                const file = event.target.files[0]
                if (file) {
                    const formData = new FormData()
                    formData.append('file-upload', file)
                    formData.append('productId', productId)

                    try {
                        const response = await fetch('http://localhost:3001/upload-img-product', {
                            method: 'POST',
                            body: formData,
                        })

                        const data = await response.json()
                        if (response.ok) {
                            setImage(`http://localhost:3001/${data.filePath}`)
                            console.log("Imagen subida:", data.filePath)
                        } else {
                            console.error("Error al subir la imagen:", data.message)
                        }
                    } catch (error) {
                        console.error("Error al subir el archivo:", error)
                    }
                }
            }

            return (
                <div className="admin-container">
                    <div className="admin-section">
                        <div className="search-container">
                            <div className="search-product">
                                <input
                                    type="text"
                                    placeholder="Ingrese el ID del producto"
                                    value={productId}
                                    onChange={handleProductIdChange}
                                />
                                <button onClick={handleGetProduct}>Buscar</button>
                            </div>

                            {error && <p className="error-message">{error}</p>}

                            {productId === '' ? (
                                <div className="product-list">
                                    <h3>Lista de productos</h3>
                                    {allProducts.length > 0 ? (
                                        allProducts.map((prod) => (
                                            <div key={prod.id} className="product-item">
                                                <p><strong>Nombre:</strong> {prod.name}</p>
                                                <p><strong>Precio:</strong> ${prod.price}</p>
                                                <p><strong>Descripción:</strong> {prod.description}</p>
                                                <p><strong>Categoría:</strong> {prod.category}</p>
                                                <p><strong>ID:</strong> {prod.id}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No hay productos disponibles.</p>
                                    )}
                                </div>
                            ) : product ? (
                                <div className="product-details">
                                    <h3>Detalles del Producto</h3>

                                    <p><strong>Nombre:</strong>
                                        {isEditingName ? (
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => handleInputChange(e, "name")}
                                            />
                                        ) : (
                                            newName
                                        )}
                                        <button onClick={() => setIsEditingName(true)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        {isEditingName && (
                                            <button onClick={() => handleSaveChange("name")}>Guardar</button>
                                        )}
                                    </p>

                                    <p><strong>Precio:</strong>
                                        {isEditingPrice ? (
                                            <input
                                                type="number"
                                                value={newPrice}
                                                onChange={(e) => handleInputChange(e, "price")}
                                            />
                                        ) : (
                                            newPrice
                                        )}
                                        <button onClick={() => setIsEditingPrice(true)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        {isEditingPrice && (
                                            <button onClick={() => handleSaveChange("price")}>Guardar</button>
                                        )}
                                    </p>

                                    <p><strong>Descripción:</strong>
                                        {isEditingDescription ? (
                                            <textarea
                                                value={newDescription}
                                                onChange={(e) => handleInputChange(e, "description")}
                                            />
                                        ) : (
                                            newDescription
                                        )}
                                        <button onClick={() => setIsEditingDescription(true)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        {isEditingDescription && (
                                            <button onClick={() => handleSaveChange("description")}>Guardar</button>
                                        )}
                                    </p>

                                    <p><strong>Categoría:</strong>
                                        {isEditingCategory ? (
                                            <input
                                                type="text"
                                                value={newCategory}
                                                onChange={(e) => handleInputChange(e, "category")}
                                            />
                                        ) : (
                                            newCategory
                                        )}
                                        <button onClick={() => setIsEditingCategory(true)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        {isEditingCategory && (
                                            <button onClick={() => handleSaveChange("category")}>Guardar</button>
                                        )}
                                    </p>

                                    <div className="product-image-container">
                                        {image ? (
                                            <img src={image} alt="Producto" className="product-image" />
                                        ) : (
                                            <p>No hay imagen del producto.</p>
                                        )}
                                    </div>

                                    <label htmlFor="product-image-upload" className="file-upload-product-label">
                                        Subir imagen
                                        <input
                                            type="file"
                                            id="product-image-upload"
                                            name="file-upload"
                                            accept=".jpg,.jpeg,.png"
                                            className="file-upload-product-input"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <p>No se encontró el producto.</p>
                            )}

                            {/* pon eso que te pido aqui en esta parte */}
                            <div className="add-product-section">
                                <h3>Agregar nuevo producto</h3>
                                <div className="add-product-form">
                                    <input
                                        type="text"
                                        name="nombre"
                                        placeholder="Nombre del producto"
                                        value={newProduct.nombre}
                                        onChange={handleNewProductChange}
                                    />
                                    <textarea
                                        name="descripcion"
                                        placeholder="Descripción del producto"
                                        value={newProduct.descripcion}
                                        onChange={handleNewProductChange}
                                    />
                                    <input
                                        type="number"
                                        name="precio"
                                        placeholder="Precio"
                                        value={newProduct.precio}
                                        onChange={handleNewProductChange}
                                    />
                                    <input
                                        type="text"
                                        name="categoria"
                                        placeholder="Categoría"
                                        value={newProduct.categoria}
                                        onChange={handleNewProductChange}
                                    />
                                    <input
                                        type="file"
                                        name="imagen"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={handleNewProductChange}
                                    />
                                    <button onClick={handleAddProduct}>Agregar producto</button>
                                </div>
                                {addProductError && <p className="error-message">{addProductError}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <>



                {userType() && userType() === "comun" && <ComunUser></ComunUser>}
                {userType() && userType() === "admin" && (<> <AdminUser></AdminUser> <ComunUser></ComunUser></>)}

            </>
        )
    }

    return (
        <>

            <Header Fav={favorites} CS={cartShopping} UserB={UserPanelButton} />
            <UserSection />

        </>
    )
}