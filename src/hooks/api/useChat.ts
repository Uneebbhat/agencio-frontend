import { toast } from "sonner";
import useFormHandler from "../useFormHandler";
import { useState } from "react";
import axios from "axios";

enum ChatFormDataRole {
  sender = "user",
  ai = "ai",
}

interface Message {
  content: string;
  role: ChatFormDataRole;
}

interface ChatFormData {
  message: string;
  sender: ChatFormDataRole;
}

const useChat = () => {
  const { formData, setFormData, handleOnChange } =
    useFormHandler<ChatFormData>({
      message: "",
      sender: ChatFormDataRole.sender,
    });
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleOnSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    // Add user message
    const userMessage: Message = {
      content: formData.message,
      role: ChatFormDataRole.sender,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { data } = await axios.post("/api/v1/chat", {
        message: formData.message,
        sender: formData.sender,
      });

      // Add AI message
      const aiMessage: Message = {
        content: data.message,
        role: ChatFormDataRole.ai,
      };
      setMessages((prev) => [...prev, aiMessage]);

      setFormData({
        message: "",
        sender: formData.sender,
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "An error occurred while sending the message."
      );
    } finally {
      setLoading(false);
    }
  };

  return { formData, loading, handleOnChange, handleOnSubmit, messages };
};

export default useChat;
