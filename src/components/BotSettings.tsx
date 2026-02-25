import { Settings, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useState } from "react";

const BotSettings = () => {
  const [dryRun, setDryRun] = useState(false);
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-5">
        <Settings className="h-6 w-6 text-foreground" />
        <span className="text-xl font-bold text-foreground">Bot Settings</span>
      </div>

      {/* Dry Run Toggle */}
      <div className="rounded-lg bg-secondary p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-foreground">Dry Run Mode</div>
            <div className="text-sm text-muted-foreground">Simulate trades tanpa uang asli</div>
          </div>
          <button
            onClick={() => setDryRun(!dryRun)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              dryRun ? "bg-profit" : "bg-muted"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform ${
                dryRun ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Warning */}
      {!dryRun && (
        <div className="rounded-lg border border-loss bg-loss/10 p-4 mb-4">
          <div className="flex items-center gap-2 text-loss font-semibold">
            <AlertTriangle className="h-5 w-5" />
            LIVE MODE — Trading dengan uang nyata!
          </div>
        </div>
      )}

      {/* Trade Size */}
      <div className="mb-6">
        <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">
          TRADE SIZE (USDC)
        </label>
        <input
          type="text"
          defaultValue="0,2"
          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Wallet & API Credentials */}
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xl">🔑</span>
          <span className="font-bold text-foreground">Wallet & API Credentials</span>
          <button onClick={() => setShowKeys(!showKeys)} className="text-muted-foreground">
            {showKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-profit bg-profit/10 px-2 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-profit animate-pulse-green" />
            Connected
          </span>
        </div>

        <div className="space-y-4">
          {[
            "Private Key",
            "Proxy Wallet Address",
            "CLOB API Key",
            "CLOB Secret",
            "CLOB Passphrase",
          ].map((label) => (
            <div key={label}>
              <label className="text-sm text-loss block mb-1.5">
                {label} <span className="text-loss">*</span>
              </label>
              <input
                type={showKeys ? "text" : "password"}
                defaultValue="abcdef1234567890abcdef1234567890"
                className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-foreground font-mono text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BotSettings;
