const express = require('express');
const Contenedor = require('./Contenedor');
const PORT = 8080;
const app = express();


const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', error => console.log(`Error en el servidor ${error}`));

const productos = new Contenedor('productos.txt');


app.get('/productos', async (req, res) => {
    const mostrarProductos = await productos.getAll();
    res.send(mostrarProductos);
});

app.get('/productoRandom', async (req, res) => {
    const p = await productos.getAll();
    const numeroRandom = Math.floor(Math.random() * p.length);
    res.send(p[numeroRandom]);
});

/*
urls de glitch:

Todos los productos: https://mirko-desafio-servidorweb.glitch.me/productos
Producto Random: https://mirko-desafio-servidorweb.glitch.me/productoRandom

*/
