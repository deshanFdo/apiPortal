/**
 * ============================================================================
 * APPLICATION ENTRY POINT
 * ============================================================================
 * Mounts the React application to the DOM.
 * Wraps the app in WSO2 Asgardeo AuthProvider for identity management.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "@asgardeo/auth-react";
import asgardeoConfig from './config/asgardeo';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider config={asgardeoConfig}>
            <App />
        </AuthProvider>
    </StrictMode>
);
