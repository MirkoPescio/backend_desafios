const fs = require('fs');

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
    this.objects = this.readData(this.ruta) || [];
  }

  async generateId() {
    try {
      this.objects = await this.getAll() || [];
      let maxId = this.objects.length;
      this.objects.forEach(obj => {
        obj.id > maxId ? maxId = obj.id : maxId
      });
      return maxId + 1;
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      const readFile = await this.getAll();
      if (!readFile) {
        obj.id = await this.generateId();
        this.objects.push(obj);
        this.writeData(this.objects);
        return obj.id;
      }
      this.objects = readFile;
      obj.id = await this.generateId();
      this.objects.push(obj);
      this.writeData(this.objects);
      console.log(`Nuevo ID agregado: ${obj.id}`);
      return obj.id;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      this.objects = await this.getAll(); // products es un array
      const productById = this.objects.find(p => p.id === Number(id)); // p sería cada objeto del array de productos
      return productById ? productById : null;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const products = await this.readData(this.ruta);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      this.objects = await this.getAll();
      this.objects = this.objects.filter(p => p.id != Number(id));
      this.writeData(this.objects);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
    } catch (err) {
      console.log(err);
    }
  }

  readData(path) {
    const data = JSON.parse(fs.readFileSync(path, "utf-8"));
    return data;
  }

  writeData(objects) {
    fs.writeFileSync(this.ruta, JSON.stringify(objects, null, 2));
  }
}

module.exports = Contenedor;