



export const CartSButton = (ProductId, setCartShopping) => {

    setCartShopping(prev =>
        prev.includes(ProductId) ? prev.filter(id => id !== ProductId) : [...prev, ProductId])

}