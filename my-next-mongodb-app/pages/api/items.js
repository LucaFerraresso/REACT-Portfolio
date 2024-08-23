import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("mydatabase");

  switch (req.method) {
    case "POST":
      const newItem = req.body;
      const result = await db.collection("items").insertOne(newItem);
      res.json({ _id: result.insertedId, ...newItem });
      break;
    case "GET":
      const items = await db.collection("items").find({}).toArray();
      res.json(items);
      break;
    case "DELETE":
      const { id } = req.query;
      if (id) {
        const deleteResult = await db
          .collection("items")
          .deleteOne({ _id: new ObjectId(id) });
        res.json(deleteResult);
      } else {
        res.status(400).end();
      }
      break;
  }
}
