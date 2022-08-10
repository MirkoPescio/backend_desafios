const Contenedor = require("./Contenedor.js");

const products = new Contenedor('productos.txt');

async function main() {

    console.log("Agrego un nuevo objecto");
    const new1 = await products.save({ nombre: "Cargador Powerbank 2200mah", precio: 1730, imagen: "https://http2.mlstatic.com/D_NQ_NP_771164-MLA47918428092_102021-O.webp" });

    const idToSearch = 3;
    console.log(`Muestro el producto con ID: ${idToSearch}`);
    let productById = await products.getById(idToSearch);
    console.log(`Producto encontrado: \n ${JSON.stringify(productById)}`);

    let allProducts = await products.getAll();
    console.log(`Muestro todos los productos: \n ${JSON.stringify(allProducts)}`);

    /*
    const idToDelete = 5
    let deleteProduct = await products.deleteById(idToDelete);

    let deleteAllProducts = await products.deleteAll();
    */

    // Los de borrar productos los dejo comentados pero sus funciones se ejecutan bien
}

main();