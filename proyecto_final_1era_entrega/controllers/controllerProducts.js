import Container from "../controllers/container.js";

const productos = new Container("./data/products.json");

//Get all products or product selected
const getProducts = (req, res) => {
  if (req.params.id == undefined) return res.send(productos.getAll());
  const id = Number(req.params.id);
  const product = productos.getById(id);
  if (!product)
    return res
      .status(404)
      .send({ message: "El ID no pertenece a un producto listado" });
  res.json(product);
};

//Add product
const addProduct = (req, res) => {
  const { nombre, descripcion, codigo, imagen, precio, stock } = req.body;
  productos.save({ nombre, descripcion, codigo, imagen, precio, stock });
  res.json({ message: "Producto agregado" });
};

//Update product
const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || id > productos.objects.length)
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  productos.update(id, req.body);
  res.json({ message: "Producto actualizado" });
};

//Delete product
const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res
      .status(400)
      .send({ message: "Ingresa el ID de un producto listado" });
  const productDeleted = productos.deleteById(id);
  if (productDeleted === -1)
    return res
      .status(404)
      .json({ message: "El ID no pertenece a un producto listado" });
  res.json({ message: "Producto eliminado" });
};

export { productos, getProducts, addProduct, updateProduct, deleteProduct };
