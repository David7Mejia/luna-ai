"use client";

import { useState } from "react";
import ChatSidebar from "../ChatSidebar";
import { useChat } from "@ai-sdk/react";
import MessageList from "../MessageList";
import cn from "classnames";

const ChatComponent = ({ user }) => {
  const [generatingResponse, setGeneratingResponse] = useState(false);
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    onFinish: () => {
      setGeneratingResponse(false); // Reset generating state when response is finished
    },
  });

  const handleSubmitWrapper = async e => {
    e.preventDefault();

    if (!input.trim()) return;

    setGeneratingResponse(true); // Set generating state to true when submitting
    await handleSubmit(e); // Call the original handleSubmit from useChat
  };

  return (
    <>
      <ChatSidebar />
      <div id="chat-outer-container" className="bg-gray-950 flex flex-col p-10">
        <div id="container-parent" className="bg-white h-full rounded-lg p-5 flex flex-col">
          <div className="flex-1 relative w-full flex flex-col align-items-center bg-slate-100 rounded-lg">
            <MessageList messages={messages} />
            <footer className="border-t-1 h-[120px] border-gray-500/20 flex p-5 w-4xl">
              <form className="flex w-full" onSubmit={handleSubmitWrapper}>
                <input
                  className="w-full resize-none rounded-lg transition-outline focus:outline-blue-500 ease-in-out duration-500 bg-white p-2 text-black focus:border-emerald-500 focus:outline focus:outline-blue-500"
                  placeholder={generatingResponse ? "Generating response..." : "Type your message..."}
                  value={input}
                  onChange={handleInputChange}
                  disabled={generatingResponse} // Disable input when generating
                />
                <button
                  type="submit"
                  className={cn("bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors h-md", {
                    "bg-gray-200 cursor-not-allowed hover:bg-gray-300": generatingResponse, // Disable button when generating
                  })}
                  disabled={generatingResponse} // Disable button when generating
                >
                  Send
                </button>
              </form>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
