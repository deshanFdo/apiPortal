import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * - Proxies /api requests to the backend server (port 3000)
 *   so the frontend doesn't need to know the backend URL.
 * - Sets base path for GitHub Pages deployment.
 */
export default defineConfig({
    plugins: [react()],
    base: '/apiPortal/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
});
