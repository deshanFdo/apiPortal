/**
 * ============================================================================
 * HEADER COMPONENT
 * ============================================================================
 * Top navigation bar with branding. Displays the API Portal name,
 * a status indicator for backend connectivity, WSO2 Asgardeo auth
 * controls (login/logout), and navigation links.
 */

import { useState, useEffect } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { getHealthStatus } from '../../services/api';
import './Header.css';

const Header = () => {
    const [isOnline, setIsOnline] = useState(false);
    const { state, signIn, signOut } = useAuthContext();

    // Check backend health on mount
    useEffect(() => {
        const checkHealth = async () => {
            try {
                await getHealthStatus();
                setIsOnline(true);
            } catch {
                setIsOnline(false);
            }
        };

        checkHealth();

        // Re-check every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="header">
            <div className="header__brand">
                <div className="header__logo">⚡</div>
                <div>
                    <h1 className="header__title">Enterprise API Portal</h1>
                    <p className="header__subtitle">Powered by WSO2 API Manager & Asgardeo</p>
                </div>
            </div>

            <div className="header__actions">
                <div className={`header__status ${isOnline ? 'header__status--online' : 'header__status--offline'}`}>
                    <span className="header__status-dot"></span>
                    {isOnline ? 'Backend Online' : 'Backend Offline'}
                </div>

                {/* WSO2 Asgardeo Auth Controls */}
                {state.isAuthenticated ? (
                    <div className="header__user-area">
                        <span className="header__username">
                            {state.displayName || state.username || 'User'}
                        </span>
                        <button className="header__auth-btn header__auth-btn--logout" onClick={() => signOut()}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button className="header__auth-btn header__auth-btn--login" onClick={() => signIn()}>
                        Sign In with Asgardeo
                    </button>
                )}

                <span className="header__version">v1.0.0</span>
            </div>
        </header>
    );
};

export default Header;
