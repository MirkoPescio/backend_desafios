import express from "express";
import { connect } from "mongoose";
import routerProducts from './routes/routerProducts.js';
import routerCarts from './routes/routerCarts.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProducts);
app.use('/api/carritos', routerCarts);


const server = app.listen(PORT, async () => {
	await connect('mongodb://localhost:27017/ecommerce_proyecto');
	// La base de datos se llama ecommerce_proyecto y tiene 2 colecciones: productos y carritos
	console.log(`>>>>> 🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});

server.on('error', err => console.log(err));