import clientPromise from "./mongodb.js";

async function testConnection() {
  try {
    const client = await clientPromise;
    const db = client.db("LunaAI");
    console.log("Connected to MongoDB:", db.databaseName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

testConnection();
