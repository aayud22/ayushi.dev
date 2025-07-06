"use client";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, StopCircle, ArrowUp } from "lucide-react";
import { streamCompletion } from "@/app/chat/lib/stream-utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TypingIndicator } from "./typing-indicator";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 50;
    setIsAtBottom(isAtBottom);
  };

  const scrollToBottomButton = !isAtBottom && (
    <button
      onClick={() => scrollToBottom()}
      className="fixed bottom-24 right-6 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors z-10"
      aria-label="Scroll to bottom"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsStreaming(true);
    setIsTyping(true);

    const botMessageId = `bot-${Date.now()}`;
    const botMessage: Message = {
      id: botMessageId,
      content: "",
      role: "assistant",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);

    setTimeout(() => scrollToBottom("auto"), 100);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullResponse = "";
      let lastUpdate = Date.now();

      while (!done && reader) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;

        if (Date.now() - lastUpdate > 50 || done) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, content: fullResponse } : msg
            )
          );
          lastUpdate = Date.now();

          if (isAtBottom) {
            scrollToBottom("auto");
          }
        }
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId ? { ...msg, content: fullResponse } : msg
        )
      );
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId && msg.content === ""
              ? { ...msg, content: "Response stopped." }
              : msg
          )
        );
        return;
      }

      console.error("Error:", error);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                content:
                  "Sorry, there was an error processing your request. Please try again.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      setIsTyping(false);
      abortControllerRef.current = null;
      scrollToBottom("smooth");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Portfolio Assistant</h2>
              <p className="text-sm text-muted-foreground">
                Ask me about my work and experience
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full w-full p-4" onScroll={handleScroll}>
          <div className="space-y-4 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                <Bot className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="text-lg font-medium">
                  How can I help you today?
                </h3>
                <p className="text-sm mt-2 max-w-md">
                  Ask me about my skills, experience, or any of my projects.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 max-w-[90%] lg:max-w-[80%] transition-all duration-200",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <Avatar
                      className={cn(
                        "h-8 w-8 flex-shrink-0 mt-1",
                        message.role === "assistant"
                          ? "order-first"
                          : "order-last"
                      )}
                    >
                      <AvatarFallback
                        className={cn(
                          message.role === "assistant"
                            ? "bg-primary/10 text-primary"
                            : "bg-primary text-primary-foreground",
                          "text-xs"
                        )}
                      >
                        {message.role === "assistant" ? "AI" : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 shadow-sm transition-all duration-200",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-none"
                          : "bg-muted rounded-tl-none",
                        isTyping &&
                          message.role === "assistant" &&
                          "bg-muted/50"
                      )}
                    >
                      {message.content ? (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          {message.content.split("\n").map((line, i) => (
                            <p
                              key={i}
                              className={
                                message.role === "user"
                                  ? "text-primary-foreground"
                                  : ""
                              }
                            >
                              {line || <br />}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <TypingIndicator />
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isTyping &&
              messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3 max-w-[90%] lg:max-w-[80%]">
                    <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        {scrollToBottomButton}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <div className="flex gap-2">
            {isStreaming && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                    setIsStreaming(false);
                    setIsLoading(false);
                  }
                }}
              >
                <StopCircle className="h-4 w-4" />
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                "..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
