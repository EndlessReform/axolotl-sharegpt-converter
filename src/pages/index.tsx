import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Plus, Trash2, Edit2, Check, X } from "lucide-react";

type Role = "human" | "gpt";

interface Message {
  from: Role;
  value: string;
}

const ChatFormatter = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentRole, setCurrentRole] = useState("human");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "2.5rem";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(scrollHeight, 40)}px`;
    }
  }, [currentMessage]);

  const addMessage = () => {
    if (currentMessage.trim()) {
      if (editingIndex !== null) {
        // Update existing message
        const updatedMessages = [...messages];
        updatedMessages[editingIndex] = {
          from: currentRole as Role,
          value: currentMessage.trim(),
        };
        setMessages(updatedMessages);
        setEditingIndex(null);
      } else {
        // Add new message
        setMessages([
          ...messages,
          { from: currentRole as Role, value: currentMessage.trim() },
        ]);
      }
      setCurrentMessage("");
      setCurrentRole(currentRole === "human" ? "gpt" : "human");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  const editMessage = (index: number) => {
    setEditingIndex(index);
    setCurrentMessage(messages[index].value);
    setCurrentRole(messages[index].from);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setCurrentMessage("");
    setCurrentRole(currentRole === "human" ? "gpt" : "human");
  };

  const downloadJSON = () => {
    const conversation = { conversations: messages };
    const jsonString = JSON.stringify(conversation, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "conversation.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyJSON = () => {
    const conversation = { conversations: messages };
    const jsonString = JSON.stringify(conversation);
    navigator.clipboard.writeText(jsonString);
  };

  const clearHistory = () => {
    setMessages([]);
    setEditingIndex(null);
    setCurrentMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div
        className="flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-lg"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <h1 className="p-4 text-2xl font-semibold text-center text-gray-800">
          ShareGPT Chat Formatter
        </h1>

        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.from === "human" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  msg.from === "human" ? "bg-blue-200" : "bg-gray-200"
                } w-[66%]`}
              >
                <div className="flex items-center mb-1">
                  <p className="mb-1 text-sm font-semibold">
                    {msg.from === "human" ? "Human" : "GPT"}
                  </p>
                  <Button
                    onClick={() => editMessage(index)}
                    size="sm"
                    variant="ghost"
                    className="py-1 my-0 ml-auto"
                  >
                    <Edit2 size={14} />
                  </Button>
                </div>
                <p className="whitespace-pre-wrap">{msg.value}</p>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex mb-4 space-x-2">
            <Select value={currentRole} onValueChange={setCurrentRole}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="human">Human</SelectItem>
                <SelectItem value="gpt">GPT</SelectItem>
              </SelectContent>
            </Select>
            <Textarea
              ref={textareaRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-2 overflow-hidden resize-none"
              style={{
                height: "2.5rem",
                minHeight: "2.5rem",
                maxHeight: "200px",
              }}
            />
            {editingIndex !== null ? (
              <>
                <Button onClick={addMessage}>
                  <Check size={16} />
                </Button>
                <Button onClick={cancelEdit}>
                  <X size={16} />
                </Button>
              </>
            ) : (
              <Button onClick={addMessage}>
                <Plus size={16} />
              </Button>
            )}
          </div>

          <div className="flex space-x-4">
            <Button onClick={downloadJSON} variant="outline" size="sm">
              <Download size={14} className="mr-2" /> Download JSON
            </Button>
            <Button onClick={copyJSON} variant="outline" size="sm">
              <Copy size={14} className="mr-2" /> Copy JSON
            </Button>
            <Button onClick={clearHistory} variant="outline" size="sm">
              <Trash2 size={14} className="mr-2" /> Clear History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFormatter;
