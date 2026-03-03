/**
 * ============================================================================
 * STOCK SERVICE
 * ============================================================================
 * Business logic layer for stock/ticker data.
 *
 * Currently uses a comprehensive local dataset. In production, this service
 * would integrate with a real stock data provider (e.g., Alpha Vantage,
 * Yahoo Finance API) by swapping the data source — controller/routes
 * remain untouched.
 */

// ── Local stock dataset (simulates a database or external API) ──
const stockDatabase = {
    AAPL: { name: 'Apple Inc.', price: 175.50, change: +1.20, changePercent: '+0.69%', marketCap: '2.8T', sector: 'Technology' },
    MSFT: { name: 'Microsoft Corp.', price: 410.20, change: -2.10, changePercent: '-0.51%', marketCap: '3.1T', sector: 'Technology' },
    GOOGL: { name: 'Alphabet Inc.', price: 140.80, change: +1.12, changePercent: '+0.80%', marketCap: '1.7T', sector: 'Technology' },
    AMZN: { name: 'Amazon.com Inc.', price: 178.25, change: +3.45, changePercent: '+1.97%', marketCap: '1.9T', sector: 'Consumer' },
    TSLA: { name: 'Tesla Inc.', price: 248.90, change: -5.30, changePercent: '-2.08%', marketCap: '790B', sector: 'Automotive' },
    META: { name: 'Meta Platforms Inc.', price: 505.60, change: +4.80, changePercent: '+0.96%', marketCap: '1.3T', sector: 'Technology' },
    NVDA: { name: 'NVIDIA Corp.', price: 875.30, change: +12.50, changePercent: '+1.45%', marketCap: '2.2T', sector: 'Semiconductors' },
    JPM: { name: 'JPMorgan Chase', price: 198.40, change: +0.75, changePercent: '+0.38%', marketCap: '570B', sector: 'Finance' },
    V: { name: 'Visa Inc.', price: 280.15, change: -1.20, changePercent: '-0.43%', marketCap: '575B', sector: 'Finance' },
    WMT: { name: 'Walmart Inc.', price: 165.80, change: +0.50, changePercent: '+0.30%', marketCap: '445B', sector: 'Retail' },
};

/**
 * Fetches stock data for a specific ticker symbol.
 * @param {string} symbol - The stock ticker symbol (e.g., 'AAPL').
 * @returns {object} Stock data for the requested symbol.
 */
const getStockBySymbol = (symbol) => {
    const upperSymbol = symbol.toUpperCase();
    const data = stockDatabase[upperSymbol];

    if (!data) {
        const error = new Error(`Symbol "${upperSymbol}" not found. Available symbols: ${Object.keys(stockDatabase).join(', ')}`);
        error.statusCode = 404;
        throw error;
    }

    return {
        symbol: upperSymbol,
        name: data.name,
        price: `$${data.price.toFixed(2)}`,
        change: data.change > 0 ? `+$${data.change.toFixed(2)}` : `-$${Math.abs(data.change).toFixed(2)}`,
        changePercent: data.changePercent,
        marketCap: data.marketCap,
        sector: data.sector,
        trend: data.change >= 0 ? 'up' : 'down',
        updatedAt: new Date().toISOString(),
    };
};

/**
 * Fetches stock data for ALL available ticker symbols.
 * @returns {Array<object>} Array of stock objects.
 */
const getAllStocks = () => {
    return Object.keys(stockDatabase).map((symbol) => getStockBySymbol(symbol));
};

/**
 * Returns the list of supported ticker symbols.
 * @returns {string[]} Array of ticker symbol strings.
 */
const getSupportedSymbols = () => {
    return Object.keys(stockDatabase);
};

module.exports = {
    getStockBySymbol,
    getAllStocks,
    getSupportedSymbols,
};
