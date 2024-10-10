import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const CreateProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product Added Successfully",
    });
  } catch (error) {
    console.error("Error in Create Product", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const GetProduct = async (req, res) => {
  try {
    const product = await Product.find({});

    res.status(200).json({
      success: true,
      data: product,
      message: "Product Fetched Successfully",
    });
  } catch (error) {
    console.error("Error in Fetching Product", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error("Error in Deleting Product", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const UpdateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });

    res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.error("Error in Updating Product", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const GetProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    res.status(201).json({
      success: true,
      data: product,
      message: "Product Fetched Successfully By Id",
    });
  } catch (error) {
    console.error("Error in Fetching Product by Id", error.message);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
