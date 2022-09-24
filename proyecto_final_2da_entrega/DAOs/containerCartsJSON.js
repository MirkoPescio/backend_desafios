import fs from "fs";
import { productos } from "../controllers/controllerProducts.js";
export default class CartsJSON {
  constructor(fileName) {
    this.fileName = fileName;
    this.objects = this.readData();
  }
  //Genera ID
  generateId() {
    try {
      if (this.objects.length === 0) return 1;
      return this.objects[this.objects.length - 1].id + 1;
    } catch (err) {
      console.log(err);
    }
  }
  //Guarda un objeto
  async save2(obj) {
    try {
      obj.id = await this.generateId();
      obj.timestamp = Date.now();
      obj.productos = []
      this.objects.push(obj);
      this.writeData();
      return obj.id;
    } catch (err) {
      console.log(err);
    }
  }
  //Devuelve el objeto con el ID buscado
  getById2(id) {
    try {
      const obj = this.objects.find((el) => el.id === id);
      return obj ? obj : null;
    } catch (err) {
      console.log(err);
    }
  }
  //Devuelve un array con los objetos presentes en el archivo
  getAll() {
    try {
      return this.objects;
    } catch {
      return [];
    }
  }
  //Eliminar el carrito con el ID buscado
  deleteById2(id) {
    try {
      let indexObj = this.objects.findIndex((obj) => {
        return obj.id === id
      });
      if (indexObj === -1) return false;
      this.objects.splice(indexObj, 1);
      this.writeData();
    } catch (err) {
      console.log(err);
    }
  }
  //Elimina todos los objetos guardados en el archivo
  async deleteAll() {
    try {
      this.objects = [];
      this.writeData();
    } catch (err) {
      console.log(err);
    }
  }
  update(id, data) {
    const objToUpdate = this.getById2(id);
    const indexObj = this.objects.findIndex((obj) => obj.id === objToUpdate.id);
    this.objects[indexObj] = { ...this.objects[indexObj], ...data };
    this.writeData();
  }
  readData() {
    try {
      return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    } catch (error) {
      console.log(error);
      if (error.message.includes("no such file or directory")) return [];
    }
  }
  async writeData() {
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(this.objects, null, 2)
    );
  }
  saveProduct2(idCartSelected, idProduct) {
    try {
      const cartSelected = this.getById2(idCartSelected)
      // console.log(cartSelected)
      // console.log(productos)
      if (cartSelected == null) return
      const productSelected = productos.objects.find((p) => p.id === idProduct);
      // console.log(productSelected)
      if (productSelected == null) return
      cartSelected.productos.push(productSelected);
      this.writeData();
      return "Producto agregado!";
    } catch (err) {
      console.log(err);
    }
  }
  deleteProducto2(idCartSelected, idProduct) {
    try {
      const cartSelected = this.objects.find((el) => {
        return el.id === idCartSelected
      })
      console.log(cartSelected)
      if (cartSelected == null) return;
      const productToDelete = cartSelected.productos.findIndex((product) => {
        return product.id === idProduct
      });
      console.log(productToDelete)
      if (productToDelete === -1) return;
      console.log(cartSelected.productos)
      cartSelected.productos.splice(productToDelete, 1);
      this.writeData();
      return "Producto eliminado!";
    } catch (error) {
      console.log(error);
    }
  }
}