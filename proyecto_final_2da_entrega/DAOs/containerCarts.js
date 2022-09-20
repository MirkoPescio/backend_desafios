const { Schema } = require("mongoose");
const Container = require("../DAOs/containerMongoDB.js");
const { productos } = require("../controllers/controllerProducts");

class Carts extends Container {
  constructor() {
    super(
      "carritos",
      new Schema(
        {
          productos: [
            {
              nombre: { type: String, require: true },
              descripcion: { type: String, require: true },
              imagen: { type: String, require: true },
              precio: { type: Number, require: true },
              stock: { type: Number, require: true },
            },
            { timestamps: true },
          ],
        },
        { timestamps: true }
      )
    );
  }

  getProducts(id) {
    return this.model.findById(id).find({});
    // Mi planteo de solución sería el siguiente:
    // return this.model.findById(id).find({}, { productos: 1, _id: 0 });
    // Tendría que mostrar solamente el array de productos en el carrito
    // Pero tengo un error que no encuentro que me cierra el servidor
  }

  async saveProduct(idProduct, idCart) {
    console.log(idProduct, idCart);
    const product = await productos.model.findById(idProduct);
    const cart = await this.model.findById(idCart);
    await cart.productos.push(product);
    return await cart.save();
  }

  async deleteProduct(idCart, idProduct) {
    const cart = await this.model.findById(idCart);
    const index = await cart.productos.findIndex(
        product => product._id == idProduct
    );
    await cart.productos.splice(index, 1);
    return await cart.save();
    // Comprobado con Postman
    // Usando por ejemplo localhost:8080/api/carritos/6329299434051e21f36cf710/productos/6328d827b14d64639ed91e79
  }
}

module.exports = Carts;