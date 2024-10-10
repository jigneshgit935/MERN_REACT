import express from "express";
import { connectMongo } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json()); //allow us to accept JSON data in req.body
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectMongo();
  console.log("Server Started at http://localhost:" + PORT);
});
