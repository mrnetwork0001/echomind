import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import MemoriesSidebar from "@/components/MemoriesSidebar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hey! I remember you mentioned you're working on a new project. How's that going?",
    timestamp: "10:42 AM",
  },
  {
    id: "2",
    role: "user",
    content: "It's going well! I just finished the API layer. Moving on to the frontend now.",
    timestamp: "10:43 AM",
  },
  {
    id: "3",
    role: "assistant",
    content: "Nice progress! Since you prefer React with TypeScript, I can help you set up the component architecture. Want me to suggest a structure?",
    timestamp: "10:43 AM",
  },
];

const aiResponses = [
  "That's interesting! I'll keep that in mind for our future conversations.",
  "Got it. Based on what I know about your preferences, here's what I'd suggest…",
  "I've noted that down. Anything else you'd like me to remember?",
  "Great question! Let me think about that considering what I know about your work.",
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [memoriesOpen, setMemoriesOpen] = useState(true);

  const handleSend = (content: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">Nova</h1>
              <p className="text-[11px] text-muted-foreground font-mono">AI Assistant</p>
            </div>
          </div>

          <button
            onClick={() => setMemoriesOpen(!memoriesOpen)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              memoriesOpen
                ? "bg-primary/15 text-primary"
                : "bg-secondary text-secondary-foreground hover:bg-surface-hover"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            Memories
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6 space-y-5">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              role={msg.role}
              timestamp={msg.timestamp}
            />
          ))}
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>

      {/* Memories sidebar */}
      <AnimatePresence>
        {memoriesOpen && (
          <MemoriesSidebar open={memoriesOpen} onClose={() => setMemoriesOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
