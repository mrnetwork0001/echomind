import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Sparkles, LogOut, Loader2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import MemoriesSidebar from "@/components/MemoriesSidebar";
import { supabase } from "@/integrations/supabase/client";
import { sendChatMessage } from "@/lib/api";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STORAGE_KEY = "echomind_chat_history";

const Index = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [memoriesOpen, setMemoriesOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("User");
  const [loading, setLoading] = useState(false);
  const [memoryRefresh, setMemoryRefresh] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get user id and username from session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        // Fetch username from profiles
        supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data?.username) setUsername(data.username);
          });
      }
    });
  }, []);

  // Load persisted chat history for this user
  useEffect(() => {
    if (!userId) return;
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, [userId]);

  // Persist chat history on change
  useEffect(() => {
    if (!userId || messages.length === 0) return;
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!userId) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp,
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const data = await sendChatMessage(userId, content);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setMemoryRefresh((prev) => prev + 1);
    } catch {
      toast.error("EchoMind backend is waking up, please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border">
          <button onClick={() => navigate("/")} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="text-left">
              <h1 className="text-sm font-semibold text-foreground">EchoMind</h1>
              <p className="text-[11px] text-muted-foreground font-mono">AI Assistant</p>
            </div>
          </button>

          <div className="flex items-center gap-2">
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
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground hover:bg-destructive/15 hover:text-destructive transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
              <Sparkles className="h-8 w-8 text-primary/40" />
              <p className="text-sm">Send a message to start chatting with EchoMind</p>
            </div>
          )}
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              role={msg.role}
              timestamp={msg.timestamp}
            />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span>EchoMind is thinking…</span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} />
      </div>

      {/* Memories sidebar */}
      <AnimatePresence>
        {memoriesOpen && (
          <MemoriesSidebar open={memoriesOpen} onClose={() => setMemoriesOpen(false)} refreshTrigger={memoryRefresh} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
