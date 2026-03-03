/**
 * ============================================================================
 * WSO2 JWT VALIDATION MIDDLEWARE
 * ============================================================================
 * Validates JWT tokens issued by WSO2 API Manager or WSO2 Asgardeo.
 *
 * When requests come through the WSO2 API Gateway, the gateway appends a
 * signed JWT in the X-JWT-Assertion header. This middleware:
 *   1. Extracts the JWT from the header
 *   2. Decodes and validates the token structure
 *   3. Checks expiration
 *   4. Attaches the decoded claims to req.user
 *
 * In development mode (WSO2_JWT_VALIDATION=false), the middleware is
 * bypassed so the backend can run standalone without the gateway.
 */

const config = require('../config');

/**
 * Decode a base64url-encoded string
 */
function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Parse a JWT without signature verification (for development).
 * In production, use a proper JWT library with WSO2's public key.
 */
function decodeJwt(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    return { header, payload };
}

/**
 * Express middleware to validate WSO2 JWT tokens.
 */
const wso2JwtValidator = (req, res, next) => {
    // Skip validation if disabled (local development without gateway)
    if (!config.WSO2_JWT_VALIDATION) {
        return next();
    }

    // WSO2 API Manager sends the JWT in X-JWT-Assertion header
    const jwtHeader = req.headers['x-jwt-assertion'];

    // Also check standard Authorization: Bearer <token> header
    const authHeader = req.headers['authorization'];
    const token = jwtHeader || (authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null);

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'Missing authentication token',
                hint: 'Include X-JWT-Assertion header (via WSO2 Gateway) or Authorization: Bearer <token>',
            },
        });
    }

    try {
        const decoded = decodeJwt(token);

        // Check token expiration
        if (decoded.payload.exp && decoded.payload.exp * 1000 < Date.now()) {
            return res.status(401).json({
                success: false,
                error: {
                    message: 'Token has expired',
                    hint: 'Request a new token from WSO2 API Manager or Asgardeo',
                },
            });
        }

        // Attach decoded claims to request for downstream use
        req.user = {
            sub: decoded.payload.sub,
            application: decoded.payload['http://wso2.org/claims/applicationname'] || decoded.payload.azp,
            tier: decoded.payload['http://wso2.org/claims/tier'] || 'Unlimited',
            scopes: decoded.payload.scope || '',
            claims: decoded.payload,
        };

        // Log authenticated request
        console.log(`[AUTH] Authenticated: ${req.user.sub} | App: ${req.user.application} | Tier: ${req.user.tier}`);

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: {
                message: 'Invalid token',
                detail: err.message,
            },
        });
    }
};

module.exports = wso2JwtValidator;
