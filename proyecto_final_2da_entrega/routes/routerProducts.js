import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/controllerProducts.js";
const routerProducts = express.Router();

//Get all products or product selected
routerProducts.get("/:id?", getProducts);

//Add product
routerProducts.post("/", addProduct);

//Update product
routerProducts.put("/:id", updateProduct);

//Delete product
routerProducts.delete("/:id", deleteProduct);

export default routerProducts;