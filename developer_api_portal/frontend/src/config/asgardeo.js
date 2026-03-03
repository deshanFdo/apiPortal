/**
 * ============================================================================
 * WSO2 ASGARDEO CONFIGURATION
 * ============================================================================
 * Centralizes Asgardeo (WSO2 Identity-as-a-Service) configuration.
 *
 * To set up:
 *   1. Create a free Asgardeo account at https://asgardeo.io
 *   2. Create a new Single-Page Application
 *   3. Set Authorized Redirect URL to http://localhost:5173
 *   4. Copy the Client ID and update VITE_ASGARDEO_CLIENT_ID in .env
 *   5. Copy your organization name and update VITE_ASGARDEO_ORG_NAME in .env
 *
 * Environment variables (set in frontend/.env):
 *   VITE_ASGARDEO_CLIENT_ID=<your-client-id>
 *   VITE_ASGARDEO_ORG_NAME=<your-org-name>
 */

const asgardeoConfig = {
    signInRedirectURL: window.location.origin,
    signOutRedirectURL: window.location.origin,
    clientID: import.meta.env.VITE_ASGARDEO_CLIENT_ID || "PLACEHOLDER_CLIENT_ID",
    baseUrl: `https://api.asgardeo.io/t/${import.meta.env.VITE_ASGARDEO_ORG_NAME || "your_org_name"}`,
    scope: ["openid", "profile", "email"],
};

export default asgardeoConfig;
