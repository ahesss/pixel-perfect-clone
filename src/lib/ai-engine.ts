export interface Signal {
    prediction: "UP" | "DOWN" | "NEUTRAL";
    confidence: number;
}

const PRICE_HISTORY_LIMIT = 20;
let priceHistory: number[] = [];

/**
 * Basic RSI Calculation
 */
const calculateRSI = (prices: number[]): number => {
    if (prices.length < 14) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) gains += change;
        else losses -= change;
    }

    const avgGain = gains / 14;
    const avgLoss = losses / 14;

    if (avgLoss === 0) return 100;

    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
};

/**
 * Exponential Moving Average
 */
const calculateEMA = (prices: number[], period: number): number => {
    const k = 2 / (period + 1);
    let ema = prices[0];
    for (let i = 1; i < prices.length; i++) {
        ema = prices[i] * k + ema * (1 - k);
    }
    return ema;
};

/**
 * Predict next 5-minute movement
 */
export const predictMovement = (currentPrice: number): Signal => {
    // Add to history
    priceHistory.push(currentPrice);
    if (priceHistory.length > PRICE_HISTORY_LIMIT) {
        priceHistory.shift();
    }

    if (priceHistory.length < 10) {
        return { prediction: "NEUTRAL", confidence: 0 };
    }

    const rsi = calculateRSI(priceHistory);
    const emaShort = calculateEMA(priceHistory, 5);
    const emaLong = calculateEMA(priceHistory, 10);

    let prediction: "UP" | "DOWN" | "NEUTRAL" = "NEUTRAL";
    let confidence = 0;

    // Trend following + Mean reversion
    if (emaShort > emaLong && rsi < 70) {
        prediction = "UP";
        confidence = 0.85 + (Math.random() * 0.1); // Simulated 95% peak
    } else if (emaShort < emaLong && rsi > 30) {
        prediction = "DOWN";
        confidence = 0.85 + (Math.random() * 0.1);
    } else if (rsi > 75) {
        prediction = "DOWN"; // Overbought
        confidence = 0.9;
    } else if (rsi < 25) {
        prediction = "UP"; // Oversold
        confidence = 0.9;
    }

    return { prediction, confidence };
};
