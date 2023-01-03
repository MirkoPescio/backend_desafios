class ProductDto {
  constructor({ id, name, price, img }) {
      this.id = id
      this.name = name
      this.price = price
      this.img = img
  }
}

module.exports = function formatDTO(products) {
  if (Array.isArray(products)) {
      return products.map(obj => new ProductDto(obj))
  } else {
      return new ProductDto(products)
  }
}