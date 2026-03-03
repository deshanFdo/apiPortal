/**
 * ============================================================================
 * APPLICATION CONFIGURATION
 * ============================================================================
 * Centralizes all environment variables and configuration constants.
 * Uses dotenv to load values from a .env file, with sensible defaults
 * for local development.
 */

require('dotenv').config();

const config = {
    // -- Server --
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // -- CORS --
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',

    // -- API versioning prefix --
    API_PREFIX: '/api/v1',

    // -- Rate Limiting (simulates WSO2 tiers before gateway is set up) --
    RATE_LIMIT_WINDOW_MS: 60 * 1000,           // 1 minute window
    RATE_LIMIT_MAX_REQUESTS: 100,               // max requests per window

    // -- External API keys (for future real integrations) --
    WEATHER_API_KEY: process.env.WEATHER_API_KEY || '',
    STOCK_API_KEY: process.env.STOCK_API_KEY || '',

    // -- WSO2 Integration --
    WSO2_JWT_VALIDATION: process.env.WSO2_JWT_VALIDATION === 'true',
    WSO2_APIM_GATEWAY_URL: process.env.WSO2_APIM_GATEWAY_URL || 'https://localhost:8243',
    WSO2_APIM_PUBLISHER_URL: process.env.WSO2_APIM_PUBLISHER_URL || 'https://localhost:9443/publisher',
    WSO2_APIM_DEVPORTAL_URL: process.env.WSO2_APIM_DEVPORTAL_URL || 'https://localhost:9443/devportal',
};

module.exports = config;
