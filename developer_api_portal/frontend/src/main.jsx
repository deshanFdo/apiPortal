/**
 * ============================================================================
 * APPLICATION ENTRY POINT
 * ============================================================================
 * Mounts the React application to the DOM.
 * Imports global styles before rendering any components.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from "@asgardeo/auth-react";
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider
            config={{
                signInRedirectURL: "http://localhost:5173",
                signOutRedirectURL: "http://localhost:5173",
                clientID: "YOUR_ASGARDEO_CLIENT_ID",
                baseUrl: "https://api.asgardeo.io/t/your_org_name",
                scope: ["openid", "profile"]
            }}
        >
            <App />
        </AuthProvider>
    </StrictMode>
);
