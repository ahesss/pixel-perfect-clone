import { Monitor, RefreshCw, Clock, TrendingUp, TrendingDown, Wifi } from "lucide-react";
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
    const interval = setInterval(refreshMarkets, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground text-sm uppercase tracking-tight">Live BTC 5-min Markets</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-profit/10 px-2 py-0.5 rounded border border-profit/20">
            <Wifi className="h-3 w-3 text-profit" />
            <span className="text-[10px] font-bold text-profit uppercase">BTC WS</span>
          </div>
          <div className="flex items-center gap-1.5 bg-profit/10 px-2 py-0.5 rounded border border-profit/20">
            <Wifi className="h-3 w-3 text-profit" />
            <span className="text-[10px] font-bold text-profit uppercase">PM WS</span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono ml-1">{new Date().toLocaleTimeString('en-GB', { hour12: false })}</span>
          <RefreshCw
            className={`h-3 w-3 text-muted-foreground cursor-pointer ml-1 ${loading ? "animate-spin" : ""}`}
            onClick={refreshMarkets}
          />
        </div>
      </div>

      {/* Price Banner */}
      <div className="rounded-lg bg-profit/10 border border-profit/20 p-4 relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <div>
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">BTC/USDT Â· BINANCE</div>
            <div className="text-3xl font-black font-mono text-profit tracking-tighter tabular-nums">
              ${btcPrice}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-profit font-black text-sm">
              <TrendingDown className="h-4 w-4 transform rotate-180" /> 0.0000%
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-profit/10 to-transparent" />
      </div>

      {/* Market Cards */}
      <div className="space-y-3">
        {markets.length === 0 && !loading && (
          <div className="text-center py-8 text-sm text-muted-foreground italic bg-secondary/20 rounded-lg">
            Searching for active BTC 5-min markets...
          </div>
        )}
        {markets.map((m, i) => (
          <div key={i} className="rounded-xl border border-border bg-secondary/20 p-4 transition-all hover:bg-secondary/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-foreground truncate pr-4">{m.question}</span>
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                <Clock className="h-3 w-3" />
                {new Date().getMinutes() % 5}m left
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {m.tokens.map((t, ti) => (
                <button
                  key={ti}
                  className={`relative flex flex-col items-center justify-center py-3 px-4 rounded-lg border transition-all active:scale-95 ${t.outcome === 'YES'
                      ? 'bg-profit/10 border-profit/30 hover:bg-profit/20'
                      : 'bg-loss/10 border-loss/30 hover:bg-loss/20'
                    }`}
                >
                  <div className={`flex items-center gap-1 text-[10px] font-black uppercase mb-1 ${t.outcome === 'YES' ? 'text-profit' : 'text-loss'
                    }`}>
                    {t.outcome === 'YES' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {t.outcome === 'YES' ? 'Up' : 'Down'}
                  </div>
                  <div className="text-lg font-black font-mono text-foreground tracking-tight">
                    {(parseFloat(t.price || "0.50") * 100).toFixed(1)}Â¢
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="text-[9px] text-muted-foreground font-mono uppercase">Vol: ${m.volume ? parseFloat(m.volume).toLocaleString() : '0'}</span>
              <span className="text-[9px] text-muted-foreground font-mono">POLY-ID: {m.conditionId.slice(0, 8)}...</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMarkets;
