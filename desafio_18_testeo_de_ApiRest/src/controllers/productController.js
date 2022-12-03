const productService= require('../business/productService')

async function postProduct(req, res) {
  try {
    const { name, price, img } = req.body
    const productID = await productService.addProduct({name, price, img})
    res.json({ productID })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al agregar producto' })
  }
}

async function getProductsTest(req, res) {
  try {
    const products = await productService.getProductsTest()
    res.json(products)
  } catch (error) {
    res.json([])
  }
}

module.exports = {
  postProduct,
  getProductsTest,
}
