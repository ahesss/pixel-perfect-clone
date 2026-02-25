import { ChevronRight, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useBotStore } from "@/hooks/useBotStore";

const BotLogs = () => {
  const [open, setOpen] = useState(true);
  const { logs } = useBotStore();

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left"
      >
        <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`} />
        <span className="font-bold text-foreground">Bot Logs</span>
      </button>

      {open && (
        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {logs.length === 0 && (
            <div className="text-xs text-muted-foreground font-mono italic">Waiting for activity...</div>
          )}
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono animate-in fade-in slide-in-from-left-2 duration-300">
              {log.type === "info" ? (
                <Info className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              ) : (
                <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
              )}
              <span className="text-muted-foreground shrink-0">{log.time}</span>
              <span className={log.type === "warn" ? "text-warning break-all" : "text-muted-foreground break-all"}>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BotLogs;
