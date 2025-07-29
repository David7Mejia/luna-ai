import { auth0 } from "../../../lib/auth0";
import { redirect } from "next/navigation";
import ChatComponent from "../../../components/ChatComponent"

const Chat = async () => {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="grid h-screen grid-cols-[260px_1fr]">
      <ChatComponent user={session.user} />
    </div>
  );
};

export default Chat;
