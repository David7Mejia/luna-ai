import { auth0 } from "../../../lib/auth0";
import { redirect } from "next/navigation";
import ChatSidebar from "../../../components/ChatSidebar";
import Head from "next/head";

const Chat = async () => {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div>
      <Head>
        <title>New Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr]">
        <ChatSidebar />
        <div className="bg-slate-100 flex flex-col">
          <div className="flex-1">Chat Window</div>
          <footer className="bg-white p-10 "></footer>
        </div>
      </div>
    </div>
  );
};

export default Chat;
