/**
 * ============================================================================
 * GLOBAL ERROR HANDLER MIDDLEWARE
 * ============================================================================
 * Catches all unhandled errors thrown in route handlers or other middleware.
 * Returns a consistent JSON error response to the client.
 */

const config = require('../config');

/**
 * Express error-handling middleware (4 arguments required).
 * @param {Error} err - The error object.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    // Log the full error in development for debugging
    if (config.NODE_ENV === 'development') {
        console.error(`[ERROR] ${err.message}`);
        console.error(err.stack);
    }

    // Determine the HTTP status code
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        error: {
            message: err.message || 'Internal Server Error',
            // Only include stack trace in development
            ...(config.NODE_ENV === 'development' && { stack: err.stack }),
        },
    });
};

module.exports = errorHandler;
