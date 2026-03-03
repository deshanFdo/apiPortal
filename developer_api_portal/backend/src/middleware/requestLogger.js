/**
 * ============================================================================
 * REQUEST LOGGER MIDDLEWARE
 * ============================================================================
 * Logs every incoming HTTP request with method, URL, and response time.
 * Useful for monitoring API traffic — especially important once the
 * WSO2 API Gateway starts routing requests through.
 */

/**
 * Logs request method, URL, status code, and response time.
 */
const requestLogger = (req, res, next) => {
    const start = Date.now();

    // Listen for the response finishing
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLine = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`;
        console.log(logLine);
    });

    next();
};

module.exports = requestLogger;
