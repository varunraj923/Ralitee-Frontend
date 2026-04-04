import React, { useState } from "react";
import ChatPopup from "./ChatPopup";
import "./Chat.css";

const ChatIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="ralitee-chat-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open Ralitee AI Chat"
          id="ralitee-chat-icon"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
          <span className="ralitee-chat-fab-pulse"></span>
        </button>
      )}

      {/* Chat Popup */}
      <ChatPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatIcon;
