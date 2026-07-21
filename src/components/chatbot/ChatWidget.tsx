"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Message = {
  role: "user" | "model";
  content: string;
};

const STARTER_QUESTIONS = [
  "What's your tech stack?",
  "Are you available for freelance?",
  "Tell me about ScrapeSmart AI",
  "How many years of experience?",
];

const SESSION_CAP = 15;
const CAP_MESSAGE =
  "You've reached the limit for this session 🎉 For more details, feel free to book a call!";
const CALENDLY_URL = "https://calendly.com/aayushid81/30min";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [capped, setCapped] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Count only user messages toward the cap
  const userMessageCount = messages.filter((m) => m.role === "user").length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !capped) {
      inputRef.current?.focus();
    }
  }, [open, capped]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading || capped) return;

      const newUserMessage: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      setInput("");
      setLoading(true);

      // Check cap AFTER adding user message
      if (userMessageCount + 1 >= SESSION_CAP) {
        setCapped(true);
        // Still send the current message, but disable input after reply
      }

      try {
        const history = messages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        const data = await res.json();
        const replyText = data.reply ?? "Sorry, something went wrong. Please try again.";

        setMessages((prev) => [
          ...prev,
          { role: "model", content: replyText },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, capped, userMessageCount]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* FAB toggle button */}
      <button
        id="chat-widget-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="chat-fab"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div id="chat-widget-panel" className="chat-panel" role="dialog" aria-label="Chat with Ayushi's assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-header-dot" aria-hidden="true" />
              <div>
                <p className="chat-header-name">Ayushi's Assistant</p>
                <p className="chat-header-sub">Ask me anything about Ayushi</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="chat-close-btn"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" role="log" aria-live="polite">
            {/* Welcome message */}
            <div className="chat-bubble chat-bubble--bot">
              <p>
                Hey! 👋 I&apos;m Ayushi&apos;s assistant. Ask me anything about
                her skills, experience, or projects!
              </p>
            </div>

            {/* Starter chips — only shown when chat is empty */}
            {messages.length === 0 && (
              <div className="chat-chips">
                {STARTER_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="chat-chip"
                    disabled={loading}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Conversation */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble ${
                  msg.role === "user"
                    ? "chat-bubble--user"
                    : "chat-bubble--bot"
                }`}
              >
                <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="chat-bubble chat-bubble--bot chat-bubble--loading">
                <Loader2 size={15} className="chat-spinner" />
                <span>Thinking…</span>
              </div>
            )}

            {/* Session cap message */}
            {capped && !loading && (
              <div className="chat-cap-message">
                <p>{CAP_MESSAGE}</p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chat-cap-link"
                >
                  Book a free 30-min call →
                </a>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {!capped && (
            <div className="chat-input-area">
              <textarea
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects…"
                rows={1}
                maxLength={500}
                disabled={loading}
                className="chat-input"
                aria-label="Chat input"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="chat-send-btn"
              >
                <Send size={15} />
              </button>
            </div>
          )}

          {/* Session counter (subtle) */}
          {!capped && (
            <p className="chat-counter">
              {userMessageCount}/{SESSION_CAP} messages used
            </p>
          )}
        </div>
      )}

      <style>{`
        .chat-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9998;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #0f172a;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.22);
          transition: transform 0.2s, background 0.2s;
        }
        .chat-fab:hover { background: #1e293b; transform: scale(1.07); }

        .chat-panel {
          position: fixed;
          bottom: 88px;
          right: 24px;
          z-index: 9997;
          width: 360px;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14);
          overflow: hidden;
          animation: chatSlideIn 0.2s ease;
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #0f172a;
          color: #fff;
          flex-shrink: 0;
        }
        .chat-header-info { display: flex; align-items: center; gap: 10px; }
        .chat-header-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.3);
        }
        .chat-header-name { font-size: 14px; font-weight: 600; line-height: 1.2; }
        .chat-header-sub { font-size: 11px; color: #94a3b8; margin-top: 1px; }
        .chat-close-btn {
          background: none; border: none; color: #94a3b8; cursor: pointer;
          padding: 4px; border-radius: 6px; display: flex;
          transition: color 0.15s;
        }
        .chat-close-btn:hover { color: #fff; }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 14px 8px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }

        .chat-bubble {
          max-width: 86%;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.5;
        }
        .chat-bubble--bot {
          align-self: flex-start;
          background: #f1f5f9;
          color: #1e293b;
          border-bottom-left-radius: 4px;
        }
        .chat-bubble--user {
          align-self: flex-end;
          background: #0f172a;
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat-bubble--loading {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          padding: 8px 12px;
        }
        .chat-spinner { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .chat-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 2px;
        }
        .chat-chip {
          font-size: 12px;
          padding: 5px 10px;
          border-radius: 20px;
          border: 1px solid #cbd5e1;
          background: #fff;
          color: #334155;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          text-align: left;
        }
        .chat-chip:hover { background: #f1f5f9; border-color: #94a3b8; }
        .chat-chip:disabled { opacity: 0.5; cursor: not-allowed; }

        .chat-cap-message {
          align-self: flex-start;
          background: #fef9c3;
          border: 1px solid #fde68a;
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          padding: 10px 13px;
          max-width: 90%;
          font-size: 13px;
          color: #92400e;
        }
        .chat-cap-link {
          display: inline-block;
          margin-top: 6px;
          font-size: 12.5px;
          font-weight: 600;
          color: #0f172a;
          text-decoration: underline;
        }
        .chat-cap-link:hover { color: #475569; }

        .chat-input-area {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid #e2e8f0;
          flex-shrink: 0;
          background: #fff;
        }
        .chat-input {
          flex: 1;
          resize: none;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          padding: 8px 11px;
          font-size: 13.5px;
          line-height: 1.5;
          outline: none;
          font-family: inherit;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.15s;
          max-height: 80px;
          overflow-y: auto;
        }
        .chat-input:focus { border-color: #0f172a; background: #fff; }
        .chat-input:disabled { opacity: 0.6; cursor: not-allowed; }
        .chat-send-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: #0f172a;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, opacity 0.15s;
        }
        .chat-send-btn:hover:not(:disabled) { background: #1e293b; }
        .chat-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .chat-counter {
          text-align: right;
          font-size: 10.5px;
          color: #94a3b8;
          padding: 2px 14px 6px;
          flex-shrink: 0;
          background: #fff;
        }

        /* Mobile: prevent overlap with hamburger & action buttons */
        @media (max-width: 640px) {
          .chat-panel {
            right: 12px;
            left: 12px;
            width: auto;
            bottom: 84px;
            max-height: 420px;
          }
          .chat-fab {
            bottom: 20px;
            right: 16px;
          }
        }
      `}</style>
    </>
  );
}
