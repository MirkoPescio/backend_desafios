const router = require('express').Router();
const Producto = require('../claseProducto.js');

router.get('/productos', (req, res) => {
    res.send(Producto.productos);
});

router.get('/productos/:id', (req, res) => {
    let producto = Producto.productos.find(producto => producto.id === Number(req.params.id));
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.post('/productos', (req, res) => {
    let { titulo, precio, imagen } = req.body;
    const producto = { titulo, precio, imagen };
    producto.id = Producto.productos.length + 1;
    Producto.productos.push(producto);
    res.send(Producto.productos);
});

router.put('/productos/:id', (req, res) => {
    let { titulo, precio, imagen } = req.body;
    let index = Producto.productos.findIndex(producto => producto.id === Number(req.params.id));
    if (index >= 0) {
        Producto.productos[index] = { titulo, precio, imagen };
        Producto.productos[index].id = Number(req.params.id);
        res.send(Producto.productos[index]);
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
});

router.delete('/productos/:id', (req, res) => {
    let index = Producto.productos.findIndex(producto => producto.id === Number(req.params.id));
    if (index >= 0) {
        Producto.productos.splice(index, 1);
        res.send({ message: 'Producto eliminado' });
    } else {
        res.status(404).send({ error: 'Producto no encontrado' });
    }
})

module.exports = router;