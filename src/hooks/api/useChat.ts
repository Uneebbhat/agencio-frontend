import { useState, useEffect } from "react";
import useFormHandler from "../useFormHandler";
import { toast } from "sonner";
import axios from "axios";
import useUserStore from "@/store/useUserStore";

interface ChatFormData {
  senderId: string;
  message: string;
}

interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

const useChat = () => {
  const { formData, setFormData, handleOnChange } =
    useFormHandler<ChatFormData>({
      senderId: "",
      message: "",
    });

  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const user = useUserStore();

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/v1/chat", {
        senderId: user.user?.id,
        message: formData.message,
      });

      const newMessages: ChatMessage[] = data.data.messages;

      setMessages((prev) => [...prev, ...newMessages]);
      setFormData({
        message: "",
        senderId: user.user?.id ?? "",
      });
    } catch (error: any) {
      console.error(error);
      toast.error(`Error occurred: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const loadChatHistory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/chat-history/${user.user?.id}`
        // {
        //   params: { senderId: user.user?.id },
        // }
      );
      setMessages(data.data.messages);
    } catch (error: any) {
      console.error("Failed to load chat history:", error);
    }
  };

  useEffect(() => {
    if (user.user?.id) {
      loadChatHistory();
    }
  }, [user.user?.id]);

  return {
    formData,
    loading,
    messages,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useChat;
