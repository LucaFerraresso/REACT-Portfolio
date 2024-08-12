import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";

app.use(cors());
app.use(express.json());

mongoClient.connect("mongodb://localhost:27017/exercise", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const exerciseSchema = new mongoose.Schema({
  description: String,
  type: String,
  title: String,
  difficulty: String,
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

app.get("/exercises", async (req, res) => {
  const exercises = await Exercise.find();
  res.send(exercises);
});

const PORT = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
