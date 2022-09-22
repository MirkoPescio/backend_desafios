const { Schema } = require("mongoose");
const Container = require("../DAOs/containerMongoDB.js");

class Products extends Container {
  constructor() {
    super(
      "productos",
      new Schema(
        {
          nombre: { type: String, require: true },
          descripcion: { type: String, require: true },
          imagen: { type: String, require: true },
          precio: { type: Number, require: true },
          stock: { type: Number, require: true },
        },
        { timestamps: true }
      )
    );
  }
  updateProduct(id, data) {
    try {
      return this.model.findByIdAndUpdate(id, data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Products;

// Los siguientes productos son para probar con postman o con mongoshell

/*
const productosDePrueba = [
	{ "nombre": "Uncharted 4", "descripcion": "Juego de aventura PS4", "imagen": "https://media.vandal.net/m/22805/uncharted-4-el-desenlace-del-ladron-201659184157_1.jpg", "precio": 1500, "stock": 14 },
	{ "nombre": "The Last of Us", "descripcion": "Juego de aventura PS3", "imagen": "https://elbuengamer.com.co/821-thickbox_default/the-last-of-us-digital-ps3.jpg", "precio": 1200, "stock": 9 },
	{ "nombre": "FIFA 22", "descripcion": "Juego de Football PS4/PS5", "imagen": "https://www.clarin.com/img/2021/07/09/la-tapa-del-videojuego-fifa___tjKkHVKPI_720x0__1.jpg", "precio": 4500, "stock": 12 }
]
*/
