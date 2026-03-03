/**
 * ============================================================================
 * APPLICATION ENTRY POINT
 * ============================================================================
 * Mounts the React application to the DOM.
 * Imports global styles before rendering any components.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);
