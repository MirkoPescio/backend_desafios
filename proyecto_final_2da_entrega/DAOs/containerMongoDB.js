const { model } = require("mongoose");

class Container {
  constructor(collection, schema) {
    this.model = model(collection, schema);
  }
  //Genera ID
  generateId() {
    try {
      if (this.model.length === 0) return 1;
      return this.model[this.model.length - 1].id + 1;
    } catch (err) {
      console.log(err);
    }
  }
  // Guardar un objeto
  async save(obj) {
    try {
      return this.model.create(obj);
    } catch (err) {
      console.log(err);
    }
  }
  // Obtener objeto específico
  getById(id) {
    try {
      return this.model.findById(id);
    } catch (err) {
      console.log(err);
    }
  }
  // Obtener todos los objetos de una colección
  getAll() {
    try {
      console.log(this.model.find());
      return this.model.find();
    } catch (err) {
      console.log(err);
    }
  }
  // Eliminar un objeto
  deleteById(id) {
    try {
      return this.model.findByIdAndDelete(id);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Container;
