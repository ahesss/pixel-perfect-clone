import { Bot } from "lucide-react";
import { useState } from "react";

const AIAgentToggle = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-profit" />
          <span className="font-semibold text-foreground">AI Agent — BTC 5min</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {enabled ? "ON" : "OFF"}
          </span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? "bg-profit" : "bg-secondary"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground italic mt-3">
        Toggle ON to start auto-analyzing and executing BTC 5-min markets
      </p>
    </div>
  );
};

export default AIAgentToggle;
