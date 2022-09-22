/*
DATO CLAVE DEL DESAFIO EN LO QUE RESPECTA A LAS BASES DE DATOS:
Dependiendo a que base de datos nos querramos conectar, tenemos que comentar una línea de
código y descomentar otra.
¿Cuáles? las que tienen el la constante Products (líneas 9 y 10 de código de este archivo)
*/


const Products = require("../DAOs/containerProducts");
// const Products = require('../DAOs/containerFirebase.js');

const productos = new Products();

// Obtener todos los productos (GET) (De la colección productos = db.productos.find())
const getProducts = async (req, res) => {
  if (req.params.id == undefined) return res.json(await productos.getAll());
  const product = await productos.getById(req.params.id);
  console.log(product);
  if (!product)
    return res
      .status(404)
      .send({ message: "El ID no pertenece a un producto listado" });
  res.json(product);
};

// Añadir producto (POST)
const addProduct = async (req, res) => {
  const { nombre, descripcion, imagen, precio, stock } = req.body;
  await productos.save({ nombre, descripcion, imagen, precio, stock });
  // Agregamos desde Postman JSONs cuyos objetos que tengan TODOS los campos del producto
  /*
  POR EJEMPLO:
    {
        nombre: 'Uncharted 4',
        descripcion: 'Juego de aventura PS4',
        imagen: 'https://media.vandal.net/m/22805/uncharted-4-el-desenlace-del-ladron-201659184157_1.jpg',
        precio: 1500,
        stock: 14,
    }
  */
  // El campo _id es añadido automaticamente por MongoDB ya que es un ObjectID
  // Para agregar un producto con firebase se puede hacer desde Postman
  res.json({ message: "Producto agregado" });
};

// Actualizar producto
const updateProduct = async (req, res) => {
  await productos.updateProduct(req.params.id, req.body);
  res.json({ message: "Producto actualizado" });
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  await productos.deleteById(req.params.id);
  res.json({ message: "Producto eliminado" });
};

module.exports = {
  productos,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
