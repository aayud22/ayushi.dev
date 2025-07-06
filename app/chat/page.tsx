"use client";

import { ChatInterface } from "./components/chat/chat-interface";

export default function ChatPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Chat with My AI Assistant</h1>
        <p className="text-gray-600 mb-8">
          Ask me about my skills, experience, projects, or anything else you'd
          like to know!
        </p>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}
