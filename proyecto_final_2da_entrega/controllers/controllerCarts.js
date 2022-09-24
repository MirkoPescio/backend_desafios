import Carts from "../DAOs/containerCarts.js";
import CartsJSON from "../DAOs/containerCartsJSON.js";

const carts = new Carts();
const cartsJSON = new CartsJSON("./data/carts.json");
let admin;

// Añadir un carrito con MongoDB y con manejo de archivos (POST)
const addCart = (req, res) => {
  const products = req.body;
  if (!products) return carts.save([]);
  carts.save(products);
  cartsJSON.save2(products);
  res.json({ message: "Carrito agregado" });
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

  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const cartDeleted = cartsJSON.deleteById2(id);
  if (cartDeleted === -1)
    return res
      .status(404)
      .json({ message: "El ID no pertenece a un carrito listado" });
  res.json({ message: "Carrito eliminado" });
  // Ejemplo de ruta en Postman para eliminar un carrito: localhost:8080/api/carritos/632911c3ec09cc7eb2ac8fd8
};

// Obtener productos del carrito (GET)
const getProducts = async (req, res) => {
  const cartSelected = await carts.getProducts(req.params.id);

  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const cartSelected2 = cartsJSON.getById2(id);
  if (cartSelected2 == null)
    return res
      .status(404)
      .send({ message: "Ingresa el ID de un carrito listado" });
  res.send(cartSelected);
};

// Añadir producto al carrito (POST)
const addProduct = (req, res) => {
  const products = req.body;
  carts.save(products);

  const idCartSelected = Number(req.params.id);
  if (isNaN(idCartSelected))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const { id } = req.body;
  const productSaved = cartsJSON.saveProduct2(idCartSelected, id);
  console.log(productSaved);
  if (!productSaved) return res.status(404).send({ message: "Error" });

  // En el postman, con mongoDB hay que poner un objeto solo con el id del producto
  // Agregado previamente en el array de productos: localhost:8080/api/productos
  // Un objeto como el siguiente: { "id_prod": "6328d827b14d64639ed91e79" }
  // De lo contrario va a dar error
  res.json({ message: "Producto agregado!!" });
};

// Eliminar producto del carrito (DELETE)
const deleteProduct = (req, res) => {
  carts.deleteProducto(req.params.id, req.params.id_prod);

  const idCart = Number(req.params.id);
  const { id } = req.body
  console.log(idCart)
  console.log(id)
  if (isNaN(idCart) || isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un carrito listado" });
  const productDeleted = cartsJSON.deleteProducto2(idCart, id);
  if (productDeleted == -1 || !productDeleted)
    return res.status(404).send({ message: "Error" })
  res.json({ message: "Producto eliminado" });
};

export {
  addCart,
  deleteCart,
  getProducts,
  addProduct,
  deleteProduct,
};
