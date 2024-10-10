import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  GetProductById,
  UpdateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.post("/", CreateProduct);
router.get("/", GetProduct);
router.delete("/:id", DeleteProduct);
router.put("/:id", UpdateProduct);
router.get("/:id", GetProductById);

export default router;
