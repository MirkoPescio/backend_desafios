const { Router } = require('express');
const router = Router();

let products = [];
let messages = [];

router.get('/', (req, res) => {
	res.render('form', { products, messages });
});

module.exports = {
	router,
	products,
	messages
};