import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
      <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 focus-within:glow-ring transition-shadow duration-300">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Send a message…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none py-1.5"
        />
        <motion.button
          type="submit"
          whileTap={{ scale: 0.9 }}
          disabled={!value.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30 transition-opacity"
        >
          <Send className="h-4 w-4" />
        </motion.button>
      </div>
    </form>
  );
};

export default ChatInput;
