import React from "react";
import Link from "next/link";
const ChatSidebar = () => {
  return (
    <div id="sidebar-container" className="relative bg-gray-950 min-h-screen flex flex-col p-10">
      Luna AI
      <Link className="mt-auto hover:bg-slate-200  transition-all justify-items-end bottom-0 rounded-lg items-center text-center px-6 py-3 bg-white text-black" href="/auth/logout">
        {" "}
        Logout
      </Link>
    </div>
  );
};

export default ChatSidebar;
