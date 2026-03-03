/**
 * ============================================================================
 * EXPRESS APPLICATION SETUP
 * ============================================================================
 * Configures Express with middleware, routes, and error handling.
 * This file is responsible ONLY for app configuration — the actual server
 * startup happens in server.js (separation of concerns).
 */

const express = require('express');
const cors = require('cors');
const config = require('./config');

// ── Middleware ──
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const wso2JwtValidator = require('./middleware/wso2JwtValidator');

// ── Route modules ──
const weatherRoutes = require('./routes/weather.routes');
const stocksRoutes = require('./routes/stocks.routes');
const cryptoRoutes = require('./routes/crypto.routes');

// ── Initialize Express ──
const app = express();

// ────────────────────────────────────────────────────────────────────────────
// GLOBAL MIDDLEWARE
// ────────────────────────────────────────────────────────────────────────────

// Parse incoming JSON payloads
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend communication
app.use(cors({
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Log every incoming request
app.use(requestLogger);

// WSO2 JWT token validation (enabled via WSO2_JWT_VALIDATION=true env var)
app.use(wso2JwtValidator);

// ────────────────────────────────────────────────────────────────────────────
// API ROUTES
// ────────────────────────────────────────────────────────────────────────────

// Health check endpoint (used by WSO2 Gateway to monitor backend health)
app.get(`${config.API_PREFIX}/health`, (req, res) => {
    res.status(200).json({
        success: true,
        service: 'Enterprise API Portal - Backend',
        status: 'operational',
        version: '1.0.0',
        uptime: `${Math.floor(process.uptime())}s`,
        timestamp: new Date().toISOString(),
    });
});

// Mount domain-specific routes
app.use(`${config.API_PREFIX}/weather`, weatherRoutes);
app.use(`${config.API_PREFIX}/stocks`, stocksRoutes);
app.use(`${config.API_PREFIX}/crypto`, cryptoRoutes);

// ────────────────────────────────────────────────────────────────────────────
// 404 HANDLER (must come after all valid routes)
// ────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            message: `Route ${req.method} ${req.originalUrl} not found`,
            hint: `Available endpoints: ${config.API_PREFIX}/weather, ${config.API_PREFIX}/stocks, ${config.API_PREFIX}/health`,
        },
    });
});

// ────────────────────────────────────────────────────────────────────────────
// GLOBAL ERROR HANDLER (must be last middleware)
// ────────────────────────────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
