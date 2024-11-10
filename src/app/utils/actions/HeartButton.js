


export const HeartButton = (ProductId) => {

    setFavorites(prev =>
        prev.includes(ProductId) ? prev.filter(id => id !== ProductId) : [...prev, ProductId])

    console.log(favorites)

}