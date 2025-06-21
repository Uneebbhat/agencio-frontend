"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";
import useChat from "@/hooks/api/useChat";
import ReactMarkdown from "react-markdown";

export default function Page() {
  const { formData, messages, loading, handleOnChange, handleOnSubmit } =
    useChat();

  // Ref for the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className="p-[20px] flex flex-col h-[85vh]">
      <div
        ref={chatContainerRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto mb-4 w-full bg-background px-2 py-4 rounded-lg border border-muted"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.length === 0 ? (
          <h2 className="text-3xl font-bold text-center">Chat with the AI</h2>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="relative max-w-[75%]">
                <div
                  className={`rounded-2xl px-4 py-3 shadow-md ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-sm"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                  }`}
                >
                  <span className="block font-semibold mb-1">
                    {msg.role === "user" ? "You" : "AI"}
                  </span>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                <div
                  className={`absolute bottom-0 w-0 h-0 border-t-8 ${
                    msg.role === "user"
                      ? "right-0 border-t-blue-500 border-l-8 border-l-transparent"
                      : "left-0 border-t-gray-200 dark:border-t-gray-700 border-r-8 border-r-transparent"
                  }`}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleOnSubmit} className="flex items-center gap-2">
        <Textarea
          placeholder="Ask anything"
          name="message"
          id="message"
          className="resize-none overflow-y-auto max-h-40"
          rows={1}
          onChange={handleOnChange}
          value={formData.message}
        />
        <Button disabled={loading || !formData.message}>
          {loading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </section>
  );
}
