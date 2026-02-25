import { Bot } from "lucide-react";

const Header = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bot className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            AutoTrade <span className="text-primary">Polymarket</span>
          </h1>
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
            LIVE TRADING · BTC 5-MIN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
