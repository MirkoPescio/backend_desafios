class Producto {
    constructor(titulo, precio, imagen) {
        this.titulo = titulo;
        this.precio = precio;
        this.imagen = imagen;
    }
    static productos = [];
}

module.exports = Producto;