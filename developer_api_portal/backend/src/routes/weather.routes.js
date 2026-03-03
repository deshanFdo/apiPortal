/**
 * ============================================================================
 * WEATHER ROUTES
 * ============================================================================
 * Defines all HTTP routes for the Weather API.
 * Each route maps to a specific controller method.
 *
 * Base path: /api/v1/weather
 */

const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');

// ── Route Definitions ──

/**
 * @route   GET /api/v1/weather?city=London
 * @desc    Get weather data for a specific city
 * @access  Public (will be protected by WSO2 Gateway in production)
 */
router.get('/', weatherController.getWeather);

/**
 * @route   GET /api/v1/weather/all
 * @desc    Get weather data for all supported cities
 * @access  Public
 */
router.get('/all', weatherController.getAllWeather);

/**
 * @route   GET /api/v1/weather/cities
 * @desc    Get the list of supported city names
 * @access  Public
 */
router.get('/cities', weatherController.getSupportedCities);

module.exports = router;
