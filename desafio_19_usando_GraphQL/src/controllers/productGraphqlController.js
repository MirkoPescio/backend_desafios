const { buildSchema } = require('graphql');
const productService = require('../business/productService.js');

const schema = buildSchema(`
  type Product {
    id: Int,
    name: String,
    price: Float,
    img: String,
  }
  input ProductInput {
    name: String,
    price: Float,
    img: String,
  }
  input ProductWithIdInput {
    id: ID!
    name: String,
    price: Float,
    img: String,
  }
  type Query {
    getProducts: [Product],
  }
  type Mutation {
    addProduct(datos: ProductInput): Product,
    deleteProduct(id: ID!): Product,
    updateProduct(datos: ProductWithIdInput): Product,
  }
`)

async function getProducts() {
  try {
    const products = await productService.getProducts()
    return products;
  } catch (error) {
    throw new Error(error.message)
  }
}

async function addProduct({datos}) {
  try {
    const product = await productService.addProduct(datos)
    return product;
  } catch (error) {
    throw new Error(error.message)
  }
}

async function deleteProduct({id}) {
  try {
    const product = await productService.deleteProduct(id)
    return product;
  } catch (error) {
    throw new Error(error.message)
  }
}

async function updateProduct({datos}) {
  try {
    const {id, name, price, img} = datos
    const product = await productService.updateProduct(id, { name, price, img })
    return product;
  } catch (error) {
    throw new Error(error.message)
  }
}

const config = {
  schema: schema,
  rootValue: {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
  },
  graphiql: true
}

module.exports = config;