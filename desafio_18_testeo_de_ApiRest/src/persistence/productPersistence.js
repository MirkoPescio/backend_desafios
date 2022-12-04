const { faker } = require('faker')
const ProductRepository = require('./repository/ProductRepository')
const productRepository = new ProductRepository()

function getAllProducts() {
  return productRepository.getAll()
}

function addProduct({ name, price, img }) {
  const newProduct = { name, price, img }
  return productRepository.save(newProduct)
}

function getProductsTest(num) {
  const products = []

  for (let i = 1; i <= num; i++) {
    products.push({
      id: i,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      img: faker.image.business(),
    })
  }

  return products
}

function deleteProduct(id) {
  return productRepository.deleteById(id)
}

function updateProduct(id, newProduct) {
  return productRepository.updateById(id, newProduct)
}

module.exports = {
  getAllProducts,
  addProduct,
  getProductsTest,
  deleteProduct,
  updateProduct
}