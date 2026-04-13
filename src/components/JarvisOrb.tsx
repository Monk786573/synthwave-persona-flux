import { useState } from "react";
import { Bot } from "lucide-react";

const JarvisOrb = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {expanded && (
        <div className="mb-4 glass-red rounded-lg p-4 w-64 animate-fade-in box-glow-red">
          <p className="font-mono text-xs text-primary mb-1">// JARVIS</p>
          <p className="font-body text-sm text-foreground/80">
            Hello! I'm Himank's AI assistant. Navigate the portfolio or reach out via the contact section.
          </p>
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full bg-primary/20 neon-border-red flex items-center justify-center animate-glow-border hover:bg-primary/30 transition-all hover:scale-110 group"
        aria-label="AI Assistant"
      >
        <Bot className="w-6 h-6 text-primary text-glow-red group-hover:animate-neon-pulse" />
      </button>
    </div>
  );
};

export default JarvisOrb;
