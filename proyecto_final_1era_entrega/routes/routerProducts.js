import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/controllerProducts.js";
const routerProducts = express.Router();

//Get all products or product selected
routerProducts.get("/:id?", (req, res) => getProducts(req, res));

//Add product
routerProducts.post("/", (req, res) => addProduct(req, res));

//Update product
routerProducts.put("/:id", (req, res) => updateProduct(req, res));

//Delete product
routerProducts.delete("/:id", (req, res) => deleteProduct(req, res));

export default routerProducts;
