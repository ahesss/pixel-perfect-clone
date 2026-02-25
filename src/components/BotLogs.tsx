import { ChevronRight, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";

const logs = [
  { time: "21.40.52", type: "info", msg: "[AI] BTC=$66267 | 5 markets · 3 signals · 0 trades (LIVE)" },
  { time: "21.40.52", type: "warn", msg: "[LIVE] GEO-BLOCKED: Trading restricted in your region, please refer to available regions - https://docs.polymarket.com/developers/CLOB/geoblock" },
  { time: "21.40.43", type: "info", msg: "[AI] BTC=$66267 | 5 markets · 5 signals · 0 trades (LIVE)" },
  { time: "21.40.43", type: "warn", msg: "[LIVE] GEO-BLOCKED: Trading restricted in your region, please refer to available regions - https://docs.polymarket.com/developers/CLOB/geoblock" },
  { time: "21.40.33", type: "info", msg: "[AI] BTC=$66267 | 5 markets · 3 signals → 0 trades (LIVE)" },
  { time: "21.40.33", type: "warn", msg: "[LIVE] GEO-BLOCKED: Trading restricted in your region, please refer to available regions - https://docs.polymarket.com/developers/CLOB/geoblock" },
  { time: "21.40.24", type: "info", msg: "[AI] BTC=$66267 | 5 markets · 5 signals → 0 trades (LIVE)" },
];

const BotLogs = () => {
  const [open, setOpen] = useState(true);

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
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 text-xs font-mono">
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
