import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Carica le variabili di ambiente dal file .env
dotenv.config();
console.log("url", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

// Abilita CORS per permettere le richieste dal frontend
app.use(cors());

// Connetti a MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error:", err.message);
  });

// Definisci uno schema per gli esercizi
const exerciseSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

// Definisci una route per ottenere tutti gli esercizi
app.get("/Exercise", async (req, res) => {
  try {
    const Exercise = await Exercise.find();
    res.json(Exercise);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
