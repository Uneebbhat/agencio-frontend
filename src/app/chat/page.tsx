"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useChat from "@/hooks/api/useChat";

export default function Page() {
  const { formData, handleOnChange, handleOnSubmit } = useChat();
  return (
    <>
      <section className="p-[20px] flex flex-col h-[85vh]">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto mb-4 w-full bg-background px-2 py-4 rounded-lg border border-muted">
          {/* AI message */}
          <div className="flex items-start gap-3">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3 max-w-[75%]">
              <span className="block font-semibold text-gray-700 dark:text-gray-200 mb-1">
                AI
              </span>
              <span>Hello! How can I assist you today?</span>
            </div>
          </div>
          {/* User message */}
          <div className="flex items-start gap-3 justify-end">
            <div className="bg-gray-300 dark:bg-gray-900 rounded-lg px-4 py-3 max-w-[75%]">
              <span className="block font-semibold text-gray-900 dark:text-gray-100 mb-1 text-right">
                You
              </span>
              <span>{formData.message}</span>
            </div>
          </div>
        </div>
        <div>
          <form onSubmit={handleOnSubmit} className="flex items-center gap-2">
            <Textarea
              placeholder="Ask anything"
              name="message"
              id="message"
              className="resize-none overflow-y-auto max-h-40"
              rows={1}
              onChange={handleOnChange}
            />
            <Button>Ask</Button>
          </form>
        </div>
      </section>
    </>
  );
}
