"use client";

import { useState } from "react";
import ChatSidebar from "../ChatSidebar";

const ChatClient = ({ user }) => {
  const [messageText, setMessageText] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Message:", messageText);
    setMessageText(""); // Clear the input after sending
  };

  return (
    <>
      <ChatSidebar />
      <div className="bg-slate-100 flex flex-col p-10">
        <div id="container-parent" className="bg-white grid grid-cols-[1fr_1fr] h-full rounded-lg p-5">
          <div className="flex-1 relative w-full flex flex-col bg-slate-100 min-h-full rounded-lg">
            <footer className="p-10 w-full absolute bottom-0">
              <form onSubmit={handleSubmit}>
                <fieldset className="flex gap-2">
                  <textarea
                    className="w-full resize-none rounded-lg transition-outline focus:outline-blue-500 ease-in-out duration-500 bg-white border-red-300 p-2 text-black focus:border-emerald-500 focus:bg-gray-100 focus:outline focus:outline-emerald-500"
                    placeholder="Send a message..."
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                  />
                  <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Send
                  </button>
                </fieldset>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatClient;
