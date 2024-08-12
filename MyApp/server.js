import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongo db"))
  .catch((error) => console.log("mongodb connection error", error));

const exerciseSchema = new mongoose.Schema({
  description: String,
  type: String,
  title: String,
  difficulty: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

app.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Error fetching exercises" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
