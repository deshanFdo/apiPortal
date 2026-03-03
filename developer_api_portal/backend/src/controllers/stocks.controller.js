/**
 * ============================================================================
 * STOCK CONTROLLER
 * ============================================================================
 * Handles HTTP request/response logic for stock/ticker endpoints.
 * Delegates actual data retrieval to the stock service layer.
 *
 * Pattern: Controller receives request → calls service → sends response.
 */

const stockService = require('../services/stocks.service');

/**
 * GET /api/v1/stocks?symbol=AAPL
 * Returns stock data for a single ticker symbol.
 */
const getStock = (req, res, next) => {
    try {
        const { symbol } = req.query;

        // Validate required parameter
        if (!symbol) {
            const error = new Error('Query parameter "symbol" is required. Example: /api/v1/stocks?symbol=AAPL');
            error.statusCode = 400;
            throw error;
        }

        const stockData = stockService.getStockBySymbol(symbol);

        res.status(200).json({
            success: true,
            data: stockData,
        });
    } catch (err) {
        next(err); // Forward to global error handler
    }
};

/**
 * GET /api/v1/stocks/all
 * Returns stock data for every supported ticker.
 */
const getAllStocks = (req, res, next) => {
    try {
        const allStocks = stockService.getAllStocks();

        res.status(200).json({
            success: true,
            count: allStocks.length,
            data: allStocks,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/v1/stocks/symbols
 * Returns available ticker symbols.
 */
const getSupportedSymbols = (req, res, next) => {
    try {
        const symbols = stockService.getSupportedSymbols();

        res.status(200).json({
            success: true,
            count: symbols.length,
            data: symbols,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getStock,
    getAllStocks,
    getSupportedSymbols,
};
