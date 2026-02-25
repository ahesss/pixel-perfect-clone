import { CheckCircle } from "lucide-react";

const trades = [
  { time: "08.02.34", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.10" },
  { time: "08.02.34", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.10" },
  { time: "08.02.34", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.10" },
  { time: "08.02.33", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.10" },
  { time: "06.35.18", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "YES", sideDir: "↗", entry: "$0.51", result: "WIN", pnl: "+$0.49" },
  { time: "06.35.17", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "YES", sideDir: "↗", entry: "$0.51", result: "WIN", pnl: "+$0.49" },
  { time: "06.35.11", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "YES", sideDir: "↗", entry: "$0.51", result: "WIN", pnl: "+$0.49" },
  { time: "06.35.10", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "YES", sideDir: "↗", entry: "$0.51", result: "WIN", pnl: "+$0.49" },
  { time: "06.13.17", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.13.14", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.07.38", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.03.05", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.03.05", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.03.05", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.03.05", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
  { time: "06.03.04", strat: "AI-BTC5M", market: "Bitcoin Up or Down - Februar...", side: "NO", sideDir: "↗", entry: "$0.49", result: "WIN", pnl: "+$0.51" },
];

const TradeHistory = () => {
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
            {trades.map((t, i) => (
              <tr key={i} className="border-t border-border/50">
                <td className="py-3 pr-2 text-muted-foreground">{t.time}</td>
                <td className="py-3 pr-2">
                  <span className="inline-block bg-secondary text-secondary-foreground rounded px-1.5 py-0.5 text-[10px] font-bold">
                    AI-BTC5M
                  </span>
                </td>
                <td className="py-3 pr-2 text-foreground">{t.market}</td>
                <td className="py-3 pr-2">
                  <span className={t.side === "YES" ? "text-profit" : "text-warning"}>
                    {t.side} {t.sideDir}
                  </span>
                </td>
                <td className="py-3 pr-2 text-foreground">{t.entry}</td>
                <td className="py-3 pr-2">
                  <span className="flex items-center gap-1 text-profit">
                    <CheckCircle className="h-3 w-3" /> WIN
                  </span>
                </td>
                <td className="py-3 text-right text-profit font-semibold">{t.pnl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
