import express from "express";
import {
  addCart,
  deleteCart,
  getProducts,
  addProductToCart,
  deleteProduct,
} from "../controllers/controllerCart.js";
const routerCarts = express.Router();

//Add a cart
routerCarts.post("/", (req, res) => addCart(req, res));

//Delete cart
routerCarts.delete("/:id", (req, res) => deleteCart(req, res));

//Get products form an specific cart
routerCarts.get("/:id/productos", (req, res) => getProducts(req, res));

//Add a product to a cart
routerCarts.post("/:id/productos", (req, res) => addProductToCart(req, res));

//Delete a product from a cart
routerCarts.delete("/:id/productos/:id_prod", (req, res) =>
  deleteProduct(req, res)
);

export default routerCarts;
