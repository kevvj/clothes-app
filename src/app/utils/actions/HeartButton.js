

export const HeartButton = (ProductId, setFavorites) => {

    setFavorites(prev =>
        prev.includes(ProductId) ? prev.filter(id => id !== ProductId) : [...prev, ProductId])


}