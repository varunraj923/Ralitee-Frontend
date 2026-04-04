import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { sendChatMessage } from "../../api/chat";
import "./Chat.css";

// Generate a unique session ID per browser tab
const getSessionId = () => {
  let sid = sessionStorage.getItem("ralitee_chat_session");
  if (!sid) {
    sid = "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem("ralitee_chat_session", sid);
  }
  return sid;
};

const ChatPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm Ralitee AI, your personal shopping assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Get auth info from Redux for order lookups
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id || null;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(trimmed, getSessionId(), userId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Oops! I'm having a little trouble connecting right now. Please try again in a moment. 😊",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="ralitee-chat-popup">
      {/* Header */}
      <div className="ralitee-chat-header">
        <div className="ralitee-chat-header-left">
          <div className="ralitee-chat-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
            </svg>
          </div>
          <div>
            <div className="ralitee-chat-title">Ralitee AI</div>
            <div className="ralitee-chat-subtitle">Shopping Assistant</div>
          </div>
        </div>
        <button className="ralitee-chat-close" onClick={onClose} aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="ralitee-chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`ralitee-chat-msg ralitee-chat-msg-${msg.role}`}>
            {msg.role === "assistant" && (
              <div className="ralitee-chat-msg-avatar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
                </svg>
              </div>
            )}
            <div className={`ralitee-chat-bubble ralitee-chat-bubble-${msg.role}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="ralitee-chat-msg ralitee-chat-msg-assistant">
            <div className="ralitee-chat-msg-avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
              </svg>
            </div>
            <div className="ralitee-chat-bubble ralitee-chat-bubble-assistant">
              <div className="ralitee-chat-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="ralitee-chat-input-area">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="ralitee-chat-input"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="ralitee-chat-send"
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="ralitee-chat-footer">
        Powered by Ralitee AI ✨
      </div>
    </div>
  );
};

export default ChatPopup;
