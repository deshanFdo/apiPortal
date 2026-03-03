/**
 * ============================================================================
 * STOCK ROUTES
 * ============================================================================
 * Defines all HTTP routes for the Stock Alert API.
 * Each route maps to a specific controller method.
 *
 * Base path: /api/v1/stocks
 */

const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocks.controller');

// ── Route Definitions ──

/**
 * @route   GET /api/v1/stocks?symbol=AAPL
 * @desc    Get stock data for a specific ticker symbol
 * @access  Public (will be protected by WSO2 Gateway in production)
 */
router.get('/', stocksController.getStock);

/**
 * @route   GET /api/v1/stocks/all
 * @desc    Get stock data for all supported ticker symbols
 * @access  Public
 */
router.get('/all', stocksController.getAllStocks);

/**
 * @route   GET /api/v1/stocks/symbols
 * @desc    Get the list of supported ticker symbols
 * @access  Public
 */
router.get('/symbols', stocksController.getSupportedSymbols);

module.exports = router;
