import { Wallet, DollarSign, Shield, BarChart3 } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
            <Wallet className="h-4 w-4" />
            WALLET VALUE
          </div>
          <div className="text-2xl font-bold font-mono text-profit">$1.30</div>
          <div className="text-xs text-muted-foreground font-mono mt-1">0.0000 MATIC</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
            <DollarSign className="h-4 w-4" />
            TOTAL PROFIT
          </div>
          <div className="text-2xl font-bold font-mono text-profit">$6.42</div>
          <div className="text-xs text-muted-foreground font-mono mt-1">16 trades</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
            <Shield className="h-4 w-4" />
            WIN RATE
          </div>
          <div className="text-2xl font-bold font-mono text-profit">100%</div>
          <div className="text-xs text-muted-foreground font-mono mt-1">16/16 wins</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
            <BarChart3 className="h-4 w-4" />
            BTC PRICE
          </div>
          <div className="text-2xl font-bold font-mono text-profit">$66.429,72</div>
          <div className="text-xs text-muted-foreground font-mono mt-1">Live Binance</div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-2">
          <BarChart3 className="h-4 w-4" />
          AVG PROFIT/TRADE
        </div>
        <div className="text-2xl font-bold font-mono text-profit">$0.40</div>
        <div className="text-xs text-muted-foreground font-mono mt-1">Per trade</div>
      </div>
    </div>
  );
};

export default StatsCards;
