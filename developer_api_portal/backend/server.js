/**
 * ============================================================================
 * SERVER ENTRY POINT
 * ============================================================================
 * Starts the Express HTTP server.
 *
 * This file is intentionally minimal — it only boots the server.
 * All app configuration lives in src/app.js.
 */

const app = require('./src/app');
const config = require('./src/config');

// ── Start the server ──
const server = app.listen(config.PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  🚀  Enterprise API Portal — Backend Server');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`  Environment : ${config.NODE_ENV}`);
    console.log(`  Port        : ${config.PORT}`);
    console.log(`  API Base    : http://localhost:${config.PORT}${config.API_PREFIX}`);
    console.log('───────────────────────────────────────────────────────────────');
    console.log('  Available Endpoints:');
    console.log(`    Health   → GET ${config.API_PREFIX}/health`);
    console.log(`    Weather  → GET ${config.API_PREFIX}/weather?city=London`);
    console.log(`    Stocks   → GET ${config.API_PREFIX}/stocks?symbol=AAPL`);
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('');
});

// ── Graceful shutdown ──
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
