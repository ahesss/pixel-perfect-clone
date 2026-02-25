import { Monitor, RefreshCw, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useBotStore } from "@/hooks/useBotStore";
import { getActiveBTCMarkets, PM_Market } from "@/lib/polymarket";

const LiveMarkets = () => {
  const { btcPrice } = useBotStore();
  const [markets, setMarkets] = useState<PM_Market[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshMarkets = async () => {
    setLoading(true);
    const data = await getActiveBTCMarkets();
    setMarkets(data);
    setLoading(false);
  };

  useEffect(() => {
    refreshMarkets();
    const interval = setInterval(refreshMarkets, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Monitor className="h-5 w-5 text-foreground" />
          <span className="font-semibold text-foreground">Live Polymarket BTC Tracker</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-profit/20 text-profit text-xs font-bold px-2 py-1 font-mono">REAL-TIME</span>
          <span className="text-xs text-muted-foreground font-mono">{new Date().toLocaleTimeString()}</span>
          <RefreshCw
            className={`h-4 w-4 text-muted-foreground cursor-pointer ${loading ? "animate-spin" : ""}`}
            onClick={refreshMarkets}
          />
        </div>
      </div>

      {/* BTC Price */}
      <div className="rounded-lg border border-border bg-secondary/50 p-4 mb-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground font-mono mb-1">BTC/USDT Â· BINANCE LIVE</div>
            <div className="text-2xl font-bold font-mono text-profit">${btcPrice}</div>
          </div>
          <div className="text-profit font-mono text-sm flex items-center gap-1 animate-pulse">
            â— Connected
          </div>
        </div>
      </div>

      {/* Markets */}
      <div className="space-y-3">
        {markets.length === 0 && !loading && (
          <div className="text-center py-4 text-sm text-muted-foreground">Searching for active BTC 5-min markets...</div>
        )}
        {markets.map((m, i) => (
          <div key={i} className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">{m.question}</span>
              <div className="flex items-center gap-1 text-xs text-profit">
                <Clock className="h-3 w-3" />
                Active Orderbook
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div className="rounded-md border border-profit bg-profit/5 py-2 px-3 text-center">
                <div className="flex items-center justify-center gap-1 text-profit text-sm font-medium">
                  <TrendingUp className="h-4 w-4" /> YES
                </div>
                <div className="text-foreground font-mono text-xs mt-1">Orderbook Live</div>
              </div>
              <div className="rounded-md border border-loss bg-loss/5 py-2 px-3 text-center">
                <div className="flex items-center justify-center gap-1 text-loss text-sm font-medium">
                  <TrendingDown className="h-4 w-4" /> NO
                </div>
                <div className="text-foreground font-mono text-xs mt-1">Orderbook Live</div>
              </div>
            </div>
            <div className="text-right text-[10px] text-muted-foreground font-mono">POLY-ID: {m.conditionId.slice(0, 16)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarkets;
