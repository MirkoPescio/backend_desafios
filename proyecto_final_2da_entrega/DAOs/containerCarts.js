const { Schema } = require("mongoose");

/*
DATO CLAVE DEL DESAFIO EN LO QUE RESPECTA A LAS BASES DE DATOS:
Dependiendo a que base de datos nos querramos conectar, tenemos que comentar una línea de
código y descomentar otra.
¿Cuáles? las que tienen el la constante Products (líneas 10 y 11 de código de este archivo)
*/

const Container = require("../DAOs/containerMongoDB.js");
// const Container = require("../DAOs/containerFirebase.js");

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
    // Para MongoDB
    return this.model.findById(id).find({});
    // Mi planteo de solución sería el siguiente:
    // return this.model.findById(id).find({}, { productos: 1, _id: 0 });
    // Tendría que mostrar solamente el array de productos en el carrito
    // Pero tengo un error que no encuentro que me cierra el servidor

    // Con firebase:
    // const cartId = "5tITNjRo1mbEckYqady3";
    // return this.db.collection("carritos").doc(cartId).collection(cartId).get();
  }

  async saveProduct(idProduct, idCart) {
    console.log(idProduct, idCart);
    
    // Para implementar con MongoDB
    const product = await productos.model.findById(idProduct);
    const cart = await this.model.findById(idCart);
    await cart.productos.push(product);
    return cart.save();
  }

  async deleteProduct(idCart, idProduct) {
    
    const cart = await this.model.findById(idCart);
    const index = await cart.productos.findIndex(
      (product) => product._id == idProduct
    );
    await cart.productos.splice(index, 1);
    return await cart.save();
    // Comprobado con Postman
    // Usando por ejemplo localhost:8080/api/carritos/6329299434051e21f36cf710/productos/6328d827b14d64639ed91e79
    

    // Con Firebase: (Comprobado con Postman)
    // const cartId = "5tITNjRo1mbEckYqady3";
		// return this.db.collection("carritos").doc(cartId).collection(cartId).doc(idProduct).delete();
  }
}

module.exports = Carts;