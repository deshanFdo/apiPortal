import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite Configuration
 * - DEPLOY_TARGET=gh-pages  → base = /apiPortal/  (GitHub Pages)
 * - DEPLOY_TARGET=render    → base = /             (Render full-stack)
 * - Dev mode                → base = /
 * - Proxies /api requests to the backend in development
 */
export default defineConfig(({ mode }) => {
    const target = process.env.DEPLOY_TARGET || '';
    let base = '/';
    if (mode === 'production' && target !== 'render') {
        base = '/apiPortal/';
    }

    return {
        plugins: [react()],
        base,
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                },
            },
        },
    };
});
