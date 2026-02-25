import axios from "axios";
import { ethers } from "ethers";

const CLOB_URL = "https://clob.polymarket.com";
const GAMMA_URL = "https://gamma-api.polymarket.com";

export interface PM_Market {
    conditionId: string;
    question: string;
    tokens: { outcome: string; tokenId: string }[];
}

/**
 * Fetch active BTC 5-min markets
 */
export const getActiveBTCMarkets = async (): Promise<PM_Market[]> => {
    try {
        const response = await axios.get(`${GAMMA_URL}/markets?active=true&query=BTC%20Up%20or%20Down`);
        return response.data.map((m: any) => ({
            conditionId: m.conditionId,
            question: m.question,
            tokens: m.clobTokenIds ? JSON.parse(m.clobTokenIds).map((id: string, i: number) => ({
                outcome: i === 0 ? "YES" : "NO",
                tokenId: id
            })) : []
        }));
    } catch (error) {
        console.error("Error fetching markets:", error);
        return [];
    }
};

/**
 * Place Order on Polymarket CLOB
 * Note: Requires real credentials to work.
 */
export const placeOrder = async (
    credentials: { apiKey: string; apiSecret: string; apiPassphrase: string; privateKey: string },
    tokenId: string,
    price: number,
    size: number,
    side: "BUY" | "SELL" = "BUY"
) => {
    if (!credentials.privateKey || !credentials.apiKey) {
        throw new Error("Missing credentials");
    }

    // logic for EIP-712 signing and clob auth goes here
    // For demo/real execution, we wrap the CLOB API calls
    console.log(`Placing ${side} order for ${tokenId} at ${price} with size ${size}`);

    // Implementation of signing and POST /order would follow the documentation
    // Using ethers for EIP-712
};
