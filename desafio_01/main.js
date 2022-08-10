/*
Clase 2: Principios básicos de JavaScript

1)
Declarar una clase Usuario

2)
Hacer que un usuario cuente con los siguientes atributos:

nombre: string,
apellido: string,
libros: object,
mascotas: string[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de
crear las instancias

3)
Hacer que el usuario cuente con los siguientes métodos:

getFullName(); addMascota(string); countMascotas(); number, addBook(string, string); nombre y autor
getBookNames(): string[];

4)
Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos

*/

class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre,
    this.apellido = apellido,
    this.libros = libros,
    this.mascotas = mascotas;
  }

  getFullName() {
    return `Nombre del usuario: ${this.nombre} ${this.apellido}`;
  }

  addMascota(mascota) {
    this.mascotas.push(mascota);
    return this.mascotas;
  }

  countMascotas() {
    return `Cantidad de mascotas: ${this.mascotas.length}`;
  }

  addBook(nombreString, autorString) {
    this.libros.push({
      nombre: nombreString,
      autor: autorString,
    });
    return this.libros;
  }

  getBookNames() {
    const nombresLibros = [];
    for (const propiedad of this.libros) {
      nombresLibros.push(propiedad.nombre);
    }
    return nombresLibros;
  }
}

const usuario1 = new Usuario(
  "Adrián",
  "Vázquez",
  [
    {
      nombre: "Harry Potter",
      autor: "J.K. Rowling"
    },
  ],
  ["Perro"]
);

const usuario2 = new Usuario(
    "Leandro",
    "Novak",
    [
        {
            nombre: "El señor de los anillos",
            autor: "J.R.R Tolkien"
        },
        {
            nombre: "1984",
            autor: "George Orwell"
        }
    ],
    ["Gato"]
);

// Y ahora llamo a los métodos

console.log(usuario1);
console.log(usuario1.getFullName());
usuario1.addMascota("Gato");
console.log(usuario1.addMascota("Canario"));
console.log(usuario1.countMascotas());
console.log(usuario1.addBook("La teoría del todo", "Stephen Hawking"));
console.log(usuario1.getBookNames());

console.log("\n"); // Salto de línea

console.log(usuario2);
console.log(usuario2.getFullName());
console.log(usuario2.addMascota("Araña"));
console.log(usuario2.countMascotas());
console.log(usuario2.addBook("El origen de las especies", "Charles Darwin"));
console.log(usuario2.getBookNames());