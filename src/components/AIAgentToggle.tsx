import { Bot } from "lucide-react";
import { useBotStore } from "@/hooks/useBotStore";
import { useEffect, useRef } from "react";
import { ethers } from "ethers";
import { fetchBtcPrice } from "@/lib/binance";
import { predictMovement } from "@/lib/ai-engine";
import { getActiveBTCMarkets, getBalances, placeOrder } from "@/lib/polymarket";

const AIAgentToggle = () => {
  const { enabled, setEnabled, dryRun, tradeSize, addLog, addTrade, setBtcPrice, setBalances, privateKey, proxyAddress } = useBotStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runBotCycle = async () => {
    try {
      // 0. Update Balances
      const addressToFetch = proxyAddress || (privateKey ? new ethers.Wallet(privateKey).address : null);
      if (addressToFetch) {
        const bals = await getBalances(addressToFetch);
        setBalances(bals.usdc, bals.matic);
      }
      // 1. Fetch current price
      const priceStr = await fetchBtcPrice();
      setBtcPrice(priceStr);
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ""));

      // 2. Predict movement
      const signal = predictMovement(priceNum);

      if (signal.prediction !== "NEUTRAL") {
        addLog("info", `[AI] Prediction: ${signal.prediction} (${(signal.confidence * 100).toFixed(1)}% accuracy)`);

        // 3. Find target market
        const markets = await getActiveBTCMarkets();
        if (markets.length > 0) {
          const targetMarket = markets[0]; // Take the most recent one
          addLog("info", `[TRADING] Target Market Identified: ${targetMarket.question}`);

          if (dryRun) {
            addLog("info", `[DRY RUN] Simulating ${signal.prediction} trade for $${tradeSize}`);
            // Add a mock trade to history for visualization
            addTrade({
              time: new Date().toLocaleTimeString(),
              strat: "AI-BTC5M",
              market: targetMarket.question,
              side: signal.prediction === "UP" ? "YES" : "NO",
              sideDir: signal.prediction === "UP" ? "â†—" : "â†˜",
              entry: "$0.50",
              result: "PENDING",
              pnl: "$0.00"
            });
          } else {
            addLog("warn", `[LIVE] Executing real trade: ${signal.prediction} for $${tradeSize}...`);

            const creds = useBotStore.getState();
            // Find tokenId for the predicted outcome
            const token = targetMarket.tokens.find(t => t.outcome === (signal.prediction === "UP" ? "YES" : "NO"));

            if (token) {
              const result = await placeOrder(
                creds,
                token.tokenId,
                0.55, // Aggressive entry to act as market order
                parseFloat(tradeSize) / 0.55,
                "BUY"
              );

              addLog("info", `[LIVE] Order Placed Success! ID: ${result.orderID}`);
              addTrade({
                time: new Date().toLocaleTimeString(),
                strat: "AI-BTC5M",
                market: targetMarket.question,
                side: signal.prediction === "UP" ? "YES" : "NO",
                sideDir: signal.prediction === "UP" ? "â†—" : "â†˜",
                entry: "$0.55",
                result: "PENDING",
                pnl: "$0.00"
              });
            }
          }
        }
      } else {
        addLog("info", `[AI] Scanning markets... BTC=$${priceStr}`);
      }
    } catch (error) {
      addLog("error", `Bot Cycle Error: ${error}`);
    }
  };

  useEffect(() => {
    if (enabled) {
      addLog("info", "AI Agent Started - Monitoring BTC 5-min markets");
      runBotCycle(); // initial run
      intervalRef.current = setInterval(runBotCycle, 10000); // Check every 10 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        addLog("warn", "AI Agent Stopped");
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [enabled]);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className={`h-6 w-6 ${enabled ? "text-profit animate-pulse" : "text-muted-foreground"}`} />
          <span className="font-semibold text-foreground">AI Agent â€” BTC 5min</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {enabled ? "ON" : "OFF"}
          </span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-profit" : "bg-secondary"
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
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
