import React, { useEffect, useRef } from "react";
import cn from "classnames";

const MessageList = ({ messages }) => {
  const messageContainerRef = useRef(null);

  // Scroll to the last message when messages change
  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div ref={messageContainerRef} id="message-container" className="max-h-[calc(100vh-240px)] flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn("flex p-4", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn("rounded-lg px-3 text-md py-1 shadow-md ring-1 ring-gray-900/10", {
              "bg-blue-500 text-white": message.role === "user",
              "text-black": message.role === "assistant",
            })}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
