import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useBotStore } from "@/hooks/useBotStore";

const TradeHistory = () => {
  const { trades } = useBotStore();

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-bold text-foreground">Trade History</span>
        <span className="text-sm text-muted-foreground font-mono">{trades.length} trades</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-muted-foreground uppercase tracking-wider">
              <th className="text-left py-2 pr-2">Time</th>
              <th className="text-left py-2 pr-2">Strat</th>
              <th className="text-left py-2 pr-2">Market</th>
              <th className="text-left py-2 pr-2">Side</th>
              <th className="text-left py-2 pr-2">Entry</th>
              <th className="text-left py-2 pr-2">Result</th>
              <th className="text-right py-2">P&L</th>
            </tr>
          </thead>
          <tbody>
            {trades.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground italic">No trades executed yet.</td>
              </tr>
            )}
            {trades.map((t, i) => (
              <tr key={i} className="border-t border-border/50 animate-in fade-in duration-500">
                <td className="py-3 pr-2 text-muted-foreground">{t.time}</td>
                <td className="py-3 pr-2">
                  <span className="inline-block bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-[10px] font-bold">
                    {t.strat}
                  </span>
                </td>
                <td className="py-3 pr-2 text-foreground truncate max-w-[150px]">{t.market}</td>
                <td className="py-3 pr-2">
                  <span className={t.side === "YES" ? "text-profit" : "text-warning"}>
                    {t.side} {t.sideDir}
                  </span>
                </td>
                <td className="py-3 pr-2 text-foreground">{t.entry}</td>
                <td className="py-3 pr-2">
                  <span className={`flex items-center gap-1 ${t.result === "WIN" ? "text-profit" : t.result === "LOSS" ? "text-loss" : "text-muted-foreground"
                    }`}>
                    {t.result === "WIN" ? <CheckCircle className="h-3 w-3" /> :
                      t.result === "LOSS" ? <XCircle className="h-3 w-3" /> :
                        <Clock className="h-3 w-3 animate-spin" />} {t.result}
                  </span>
                </td>
                <td className={`py-3 text-right font-semibold ${t.pnl.startsWith("+") ? "text-profit" : "text-loss"}`}>
                  {t.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
