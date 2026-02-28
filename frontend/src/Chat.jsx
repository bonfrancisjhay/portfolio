import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";
import { MessageCircle, X, Send } from "lucide-react";

function TypingDots({ dark }) {
  return (
    <div className="flex justify-start items-end gap-2">
        <img
        src="public/images/profile1.jpg"
        alt="Francis"
        className="w-7 h-7 rounded-full object-cover flex-shrink-0"
      />
      <div className={`px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1
        ${dark ? "bg-gray-700" : "bg-gray-100"}`}>
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function Chat() {
  const { dark } = useTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about Francis 👋" }
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { from: "user", text: message };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://portfolio-production-xxxx.up.railway.app/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.message || "No response." }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", text: "Error connecting to server." }]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Group consecutive messages from same sender
  const grouped = messages.map((msg, i) => ({
    ...msg,
    isLast: i === messages.length - 1 || messages[i + 1]?.from !== msg.from,
  }));

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center shadow-lg transition"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl flex flex-col overflow-hidden
            ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}
          style={{ height: "460px" }}
        >
          {/* Header */}
          <div className="bg-gray-600 px-4 py-3 flex items-center gap-3">
            <div className="relative">
              <img
                src="public/images/profile1.jpg"  
                alt="Francis"
                className="w-9 h-9 rounded-full object-cover"
              />
              {/* Green online dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-gray-600" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Francis Jhay Bon</p>
              <p className="text-green-300 text-xs font-medium">Active now</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-1">
            {grouped.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {/* Bot avatar — only show on last message in a group */}
                {msg.from === "bot" && (
                  <div className="w-7 h-7 flex-shrink-0">
                    {msg.isLast && (
                      <img
                      src="public/images/profile1.jpg"
                      alt="Francis"
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    )}
                  </div>
                )}

                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[75%]
                    ${msg.from === "user"
                      ? "bg-gray-600 text-white rounded-br-none"
                      : dark
                        ? "bg-gray-700 text-white rounded-bl-none"
                        : "bg-gray-100 text-black rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing animation */}
            {loading && <TypingDots dark={dark} />}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className={`flex items-center gap-2 px-3 py-3 border-t
            ${dark ? "border-gray-700" : "border-gray-200"}`}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className={`flex-1 text-sm px-3 py-2 rounded-full outline-none
                ${dark
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-gray-100 text-black placeholder-gray-400"}`}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="w-8 h-8 rounded-full bg-gray-600 hover:bg-gray-700 text-white flex items-center justify-center transition disabled:opacity-50"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;