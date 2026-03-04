import { motion } from "framer-motion";
import { Brain, MapPin, Heart, Briefcase, Music, BookOpen, X } from "lucide-react";

interface Memory {
  id: string;
  icon: React.ElementType;
  label: string;
  detail: string;
}

const memories: Memory[] = [
  { id: "1", icon: MapPin, label: "Location", detail: "Lives in San Francisco" },
  { id: "2", icon: Briefcase, label: "Work", detail: "Software engineer at a startup" },
  { id: "3", icon: Heart, label: "Preferences", detail: "Prefers concise answers" },
  { id: "4", icon: Music, label: "Interests", detail: "Enjoys jazz and lo-fi beats" },
  { id: "5", icon: BookOpen, label: "Reading", detail: "Currently reading Dune" },
];

interface MemoriesSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MemoriesSidebar = ({ open, onClose }: MemoriesSidebarProps) => {
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
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Memory list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1.5">
        {memories.map((memory, i) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-hover transition-colors cursor-default"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary mt-0.5">
              <memory.icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {memory.label}
              </p>
              <p className="text-sm text-foreground leading-snug mt-0.5">
                {memory.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border">
        <p className="text-[11px] text-muted-foreground font-mono">
          {memories.length} memories stored
        </p>
      </div>
    </motion.aside>
  );
};

export default MemoriesSidebar;
