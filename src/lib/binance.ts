import axios from "axios";

export const fetchBtcPrice = async (): Promise<string> => {
    try {
        const response = await axios.get("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
        const price = parseFloat(response.data.price);
        return price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (error) {
        console.error("Error fetching BTC price:", error);
        return "0.00";
    }
};
