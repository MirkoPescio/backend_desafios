const logger = require('../middlewares/logger')
const productPersistence = require('../persistence/productPersistence')


async function addProduct({name, price, img}) {
  try {
    const isError = validateProduct({name, price, img})
    if(isError) throw new Error(isError)
    
    const res = productPersistence.addProduct({ name, price, img })
    logger.info(`Registro de producto exitosa`)
    return res;
  } catch (error) {
    logger.error('Error en postProduct: ' + error.message)
    return error
  }
}

async function getProductsTest() {
  return productPersistence.getProductsTest(5);
}

async function getProducts() {
  return productPersistence.getAllProducts();
}

async function deleteProduct(id){
  return productPersistence.deleteProduct(id);
}

async function updateProduct(id, {name, price, img}){
  return productPersistence.updateProduct(id, {name, price, img});
}


function validateProduct({name, price, img}) {
  if (!name || !price || !img || !name.trim() || !img.trim()) {
    return 'faltan datos del producto'
  } else if (isNaN(price)) {
    return 'El precio debe ser de tipo numérico'
  } else if (!img.includes('http')) {
    return 'La URL de la foto debe iniciar con http'
  }
  return false
}


module.exports = {
  addProduct,
  getProductsTest,
  getProducts,
  deleteProduct,
  updateProduct
}