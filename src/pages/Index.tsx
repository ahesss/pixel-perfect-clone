import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import AIAgentToggle from "@/components/AIAgentToggle";
import LiveMarkets from "@/components/LiveMarkets";
import BotSettings from "@/components/BotSettings";
import TradeHistory from "@/components/TradeHistory";
import BotLogs from "@/components/BotLogs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="max-w-xl mx-auto px-4 py-4 space-y-4">
        <Header />
        <StatsCards />
        <AIAgentToggle />
        <LiveMarkets />
        <TradeHistory />
        <BotSettings />
        <BotLogs />
        <div className="text-center text-xs text-muted-foreground pt-4">
          AutoTrade Polymarket — AI BTC 5-Min Agent — Use at your own risk
        </div>
      </div>
    </div>
  );
};

export default Index;
