import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * - In production: sets base to /apiPortal/ for GitHub Pages
 * - In dev: base stays / so local dev works normally
 * - Proxies /api requests to the backend server (port 3000)
 */
export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === 'production' ? '/apiPortal/' : '/',
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
}));
