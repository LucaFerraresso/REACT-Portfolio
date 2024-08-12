import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  difficulty: String,
});
const Exercise = mongoose.model("Exercise", exerciseSchema);

dotenv.config();
console.log("MONDODB_URI", process.env.MONGODB_URI);
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
