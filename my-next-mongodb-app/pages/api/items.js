import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    switch (req.method) {
      case "POST":
        const newItem = req.body;
        const result = await db.collection("items").insertOne(newItem);
        res.status(201).json({ _id: result.insertedId, ...newItem });
        break;

      case "GET":
        const items = await db.collection("items").find({}).toArray();
        res.status(200).json(items);
        break;

      case "DELETE":
        const { id } = req.query;
        if (id) {
          const deleteResult = await db
            .collection("items")
            .deleteOne({ _id: new ObjectId(id) });
          res.status(200).json(deleteResult);
        } else {
          res.status(400).json({ error: "Missing item ID" });
        }
        break;

      case "PUT":
        const updatedItem = req.body;
        const { updateId } = req.query;

        if (updateId) {
          const updateResult = await db
            .collection("items")
            .updateOne({ _id: new ObjectId(updateId) }, { $set: updatedItem });
          res.status(200).json(updateResult);
        } else {
          res.status(400).json({ error: "Missing update ID" });
        }
        break;

      default:
        res.status(405).json({ error: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
