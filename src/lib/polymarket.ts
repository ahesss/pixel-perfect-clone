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
 * Fetch USDC and MATIC balance on Polygon
 */
export const getBalances = async (address: string) => {
    if (!address) return { usdc: "0.00", matic: "0.00" };

    try {
        const provider = new ethers.JsonRpcProvider("https://polygon-rpc.com");

        // Fetch MATIC
        const maticBalance = await provider.getBalance(address);
        const maticFormatted = ethers.formatEther(maticBalance);

        // Fetch USDC (Bridged USDC.e on Polygon)
        const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
        const usdcContract = new ethers.Contract(usdcAddress, ["function balanceOf(address) view returns (uint256)"], provider);
        const usdcBalanceValue = await usdcContract.balanceOf(address);
        const usdcFormatted = ethers.formatUnits(usdcBalanceValue, 6);

        return {
            usdc: parseFloat(usdcFormatted).toFixed(2),
            matic: parseFloat(maticFormatted).toFixed(4)
        };
    } catch (error) {
        console.error("Error fetching balances:", error);
        return { usdc: "0.00", matic: "0.00" };
    }
};

/**
 * Place Order on Polymarket CLOB
 */
export const placeOrder = async (
    credentials: { apiKey: string; apiSecret: string; apiPassphrase: string; privateKey: string },
    tokenId: string,
    price: number,
    size: number,
    side: "BUY" | "SELL" = "BUY"
) => {
    if (!credentials.privateKey || !credentials.apiKey) {
        throw new Error("Missing credentials for Live Trading");
    }

    const wallet = new ethers.Wallet(credentials.privateKey);
    const timestamp = Math.floor(Date.now() / 1000).toString();

    // 1. Prepare Auth Signature (Header)
    const authMessage = `${timestamp}POST/order`;
    const authSig = await wallet.signMessage(authMessage);

    // 2. Prepare Order Object
    const orderBody = {
        token_id: tokenId,
        price: price,
        size: size,
        side: side,
        orderType: "GTC",
    };

    try {
        const response = await axios.post(`${CLOB_URL}/order`, orderBody, {
            headers: {
                "POLY_ADDRESS": wallet.address,
                "POLY_API_KEY": credentials.apiKey,
                "POLY_PASSPHRASE": credentials.apiPassphrase,
                "POLY_TIMESTAMP": timestamp,
                "POLY_SIGNATURE": authSig,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (error: any) {
        console.error("CLOB Order Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || "Execution Failed");
    }
};
