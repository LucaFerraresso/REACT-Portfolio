const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configura dotenv per caricare le variabili d'ambiente
dotenv.config();

// Inizializza l'app Express
const app = express();

// Middleware per il parsing del JSON
app.use(express.json());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Definisci una route di esempio
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Imposta il server per ascoltare su una porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
