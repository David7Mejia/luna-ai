import { auth0 } from "../../../lib/auth0";
import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
  const session = await auth0.getSession();

  try {
    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("LunaAI");
    const chats = await db
      .collection("chats")
      .find({ userId: session.user.sub }, { projection: { userId: 0, messages: 0 } })
      .sort({ _id: -1 })
      .toArray();

    return new Response(JSON.stringify({ chats }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
