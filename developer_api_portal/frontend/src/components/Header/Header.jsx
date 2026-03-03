/**
 * ============================================================================
 * HEADER COMPONENT
 * ============================================================================
 * Top navigation bar with branding. Displays the API Portal name
 * and a status indicator for backend connectivity.
 */

import { useState, useEffect } from 'react';
import { getHealthStatus } from '../../services/api';
import './Header.css';

const Header = () => {
    const [isOnline, setIsOnline] = useState(false);

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
                    <p className="header__subtitle">Powered by WSO2 API Manager</p>
                </div>
            </div>

            <div className="header__actions">
                <div className={`header__status ${isOnline ? 'header__status--online' : 'header__status--offline'}`}>
                    <span className="header__status-dot"></span>
                    {isOnline ? 'Backend Online' : 'Backend Offline'}
                </div>
                <span className="header__version">v1.0.0</span>
            </div>
        </header>
    );
};

export default Header;
