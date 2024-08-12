import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Configurazione dotenv
dotenv.config();
console.log("MONGODB_URI", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Definizione dello schema per l'esercizio
const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  difficulty: String,
});

const Exercise = mongoose.model("esercizi", exerciseSchema);

// Connessione a MongoDB utilizzando Mongoose
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Avvio del server solo dopo una connessione avvenuta con successo
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Endpoint per recuperare gli esercizi
app.get("/esercizi", async (req, res) => {
  try {
    const data = await Exercise.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
