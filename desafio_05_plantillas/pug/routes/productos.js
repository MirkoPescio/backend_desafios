const { Router } = require('express');

const router = Router();

let productos = [];

router.get('/productos', (req, res) => {
    res.render('form');
})

router.get('/listaproductos', (req, res) => {
    res.render('productos', { productos });
})

router.post('/productos', (req, res) => {
    const { name, price, picture } = req.body;
    productos.push({ name, price, picture });
    console.log(productos);
    res.render('form');
})

module.exports = router;