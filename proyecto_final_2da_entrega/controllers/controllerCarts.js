
const Carts = require("../DAOs/containerCarts.js");

const carts = new Carts();
let admin;

// Añadir un carrito con MongoDB (POST)
const addCart = async (req, res) => {
  const products = req.body;
  await carts.save(products);
  // En Postman (con el método POST), para crear el carrito en MongoDB alcanza con escribir: [{}]
  // y nos va a crear el carrito con la siguiente estructura:
  /*
  [
    {
    _id: ObjectId("6328f956d27a0b409a9f8a77"),
    productos: [],
    createdAt: ISODate("2022-09-19T23:20:54.726Z"),
    updatedAt: ISODate("2022-09-19T23:55:14.144Z"),
    __v: 5
    }
  ]
  */
  res.json({ message: "Carrito agregado!" });
};


// Eliminar un carrito (DELETE)
const deleteCart = async (req, res) => {
  await carts.deleteById(req.params.id);
  res.json({ message: "Carrito eliminado" });
  // Ejemplo de ruta en Postman para eliminar un carrito: localhost:8080/api/carritos/632911c3ec09cc7eb2ac8fd8
};

// Obtener productos del carrito (GET)
const getProducts = async (req, res) => {
  const cartSelected = await carts.getProducts(req.params.id);
  res.send(cartSelected);
};

// Añadir producto al carrito (POST)
const addProduct = (req, res) => {
  const products = req.body;
  carts.saveProduct(products.id_prod, req.params.id);
  // En el postman hay que poner un objeto solo con el id del producto
  // Agregado previamente en el array de productos: localhost:8080/api/productos
  // Un objeto como el siguiente: { "id_prod": "6328d827b14d64639ed91e79" }
  // De lo contrario va a dar error
  res.json({ message: "Producto agregado!!" });
};

// Eliminar producto del carrito (DELETE)
const deleteProduct = (req, res) => {
  carts.deleteProduct(req.params.id, req.params.id_prod);
  res.json({ message: "Producto eliminado" });
};

module.exports = {
  addCart,
  deleteCart,
  getProducts,
  addProduct,
  deleteProduct,
};
