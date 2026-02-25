import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Log {
    time: string;
    type: "info" | "warn" | "error";
    msg: string;
}

interface Trade {
    time: string;
    strat: string;
    market: string;
    side: "YES" | "NO";
    sideDir: string;
    entry: string;
    result: "WIN" | "LOSS" | "PENDING";
    pnl: string;
}

interface BotState {
    enabled: boolean;
    dryRun: boolean;
    tradeSize: string;
    btcPrice: string;
    usdcBalance: string;
    maticBalance: string;
    logs: Log[];
    trades: Trade[];

    // API credentials
    privateKey: string;
    proxyAddress: string;
    apiKey: string;
    apiSecret: string;
    apiPassphrase: string;

    setEnabled: (enabled: boolean) => void;
    setDryRun: (dryRun: boolean) => void;
    setTradeSize: (size: string) => void;
    setBtcPrice: (price: string) => void;
    setBalances: (usdc: string, matic: string) => void;
    addLog: (type: Log["type"], msg: string) => void;
    addTrade: (trade: Trade) => void;
    setCredentials: (creds: Partial<Pick<BotState, "privateKey" | "proxyAddress" | "apiKey" | "apiSecret" | "apiPassphrase">>) => void;
}

export const useBotStore = create<BotState>()(
    persist(
        (set) => ({
            enabled: false,
            dryRun: true,
            tradeSize: "0.1",
            btcPrice: "0.00",
            usdcBalance: "0.00",
            maticBalance: "0.00",
            logs: [],
            trades: [],
            privateKey: import.meta.env.VITE_PRIVATE_KEY || "",
            proxyAddress: import.meta.env.VITE_PROXY_ADDRESS || "",
            apiKey: import.meta.env.VITE_API_KEY || "",
            apiSecret: import.meta.env.VITE_API_SECRET || "",
            apiPassphrase: import.meta.env.VITE_API_PASSPHRASE || "",

            setEnabled: (enabled) => set({ enabled }),
            setDryRun: (dryRun) => set({ dryRun }),
            setTradeSize: (tradeSize) => set({ tradeSize }),
            setBtcPrice: (btcPrice) => set({ btcPrice }),
            setBalances: (usdcBalance, maticBalance) => set({ usdcBalance, maticBalance }),
            addLog: (type, msg) => set((state) => ({
                logs: [{ time: new Date().toLocaleTimeString(), type, msg }, ...state.logs].slice(0, 50)
            })),
            addTrade: (trade) => set((state) => ({
                trades: [trade, ...state.trades].slice(0, 50)
            })),
            setCredentials: (creds) => set((state) => ({ ...state, ...creds })),
        }),
        {
            name: "polymarket-bot-settings",
            partialize: (state) => ({
                dryRun: state.dryRun,
                tradeSize: state.tradeSize,
                privateKey: state.privateKey,
                proxyAddress: state.proxyAddress,
                apiKey: state.apiKey,
                apiSecret: state.apiSecret,
                apiPassphrase: state.apiPassphrase,
            }),
        }
    )
);
