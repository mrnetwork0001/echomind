import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, X, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MemoryItem {
  id: string;
  memory: string;
  created_at?: string;
}

interface MemoriesSidebarProps {
  open: boolean;
  onClose: () => void;
  refreshTrigger?: number;
}

const MemoriesSidebar = ({ open, onClose, refreshTrigger }: MemoriesSidebarProps) => {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data, error: fnError } = await supabase.functions.invoke("memories-fetch", {
        body: { user_id: session.user.id },
      });

      if (fnError) throw new Error(fnError.message);

      // Handle different response shapes from MemSync
      const items = Array.isArray(data) ? data : data?.memories ?? data?.items ?? [];
      setMemories(items);
    } catch (err: unknown) {
      console.error("Failed to fetch memories:", err);
      setError("Could not load memories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchMemories();
    }
  }, [open]);

  if (!open) return null;

  return (
    <motion.aside
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="w-72 shrink-0 border-l border-border bg-card flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Memories</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={fetchMemories}
            disabled={loading}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Memory list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1.5">
        {loading && memories.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">{error}</p>
            <button
              onClick={fetchMemories}
              className="text-xs text-primary hover:underline mt-2"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && memories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">No memories yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Chat with EchoMind to build your memory profile
            </p>
          </div>
        )}

        {memories.map((memory, i) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="group rounded-lg px-3 py-2.5 hover:bg-surface-hover transition-colors cursor-default"
          >
            <p className="text-sm text-foreground leading-snug">
              {memory.memory}
            </p>
            {memory.created_at && (
              <p className="text-[10px] text-muted-foreground font-mono mt-1">
                {new Date(memory.created_at).toLocaleDateString()}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border">
        <p className="text-[11px] text-muted-foreground font-mono">
          {memories.length} {memories.length === 1 ? "memory" : "memories"} stored
        </p>
      </div>
    </motion.aside>
  );
};

export default MemoriesSidebar;
