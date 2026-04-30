import express from "express";
import { getProducts } from "#controllers/productController";

const router = express.Router();

// products // http://localhost:3000/products
router.get("/products", getProducts);

export default router;