/**
 * ============================================================================
 * CRYPTO ROUTES
 * ============================================================================
 * Defines all HTTP routes for the Cryptocurrency API.
 * Each route maps to a specific controller method.
 *
 * Base path: /api/v1/crypto
 */

const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/crypto.controller');

/**
 * @route   GET /api/v1/crypto/all
 * @desc    Get real-time prices for all supported cryptocurrencies
 * @access  Public (will be protected by WSO2 Gateway in production)
 */
router.get('/all', cryptoController.getAllCrypto);

module.exports = router;
