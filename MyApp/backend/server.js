import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; // Importa il modello

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Definisci un endpoint per ottenere i prodotti
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // Trova tutti i prodotti
    res.json(products); // Restituisci i prodotti come JSON
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Imposta il server per ascoltare su una porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
