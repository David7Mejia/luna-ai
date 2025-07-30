import { auth0 } from "../../../lib/auth0";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  try {
    // Get the user session
    const session = await auth0.getSession();
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Parse the request body
    const { message } = await request.json();
    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    // Create the new user message
    const newUserMessage = {
      role: "user",
      content: message,
    };

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("LunaAI");

    // Insert the chat into the database
    const chat = await db.collection("chats").insertOne({
      userId: session.user.sub, // Use the user's ID from the session
      messages: [newUserMessage],
      title: message,
    });

    // Return the created chat
    return new Response(
      JSON.stringify({
        _id: chat.insertedId.toString(),
        messages: [newUserMessage],
        title: message,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating chat:", error);
    return new Response(JSON.stringify({ error: "Failed to create chat" }), { status: 500 });
  }
}
