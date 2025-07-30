import clientPromise from "./mongodb.js";

export async function syncUser(session) {
  try {
    if (!session || !session.user) {
      throw new Error("Invalid session");
    }

    const client = await clientPromise;
    const db = client.db("LunaAI");

    // Check if the user already exists in MongoDB
    const existingUser = await db.collection("users").findOne({ auth0Id: session.user.sub });

    if (!existingUser) {
      // Create a new user record in MongoDB
      const newUser = {
        auth0Id: session.user.sub, // Use Auth0's unique identifier
        email: session.user.email, // Store the user's email
        name: session.user.name || "Anonymous", // Store the user's name
        createdAt: new Date(),
      };

      await db.collection("users").insertOne(newUser);
      console.log("User synced with MongoDB:", newUser);
    }
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}
