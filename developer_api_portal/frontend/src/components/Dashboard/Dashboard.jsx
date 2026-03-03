/**
 * ============================================================================
 * DASHBOARD COMPONENT
 * ============================================================================
 * Main content area. Fetches all weather and stock data on mount,
 * then renders them in a responsive grid of cards.
 * Handles loading states, errors, and auto-refresh.
 */

import { useState, useEffect } from 'react';
import { getAllWeather, getAllStocks, getAllCrypto } from '../../services/api';
import WeatherCard from '../WeatherCard/WeatherCard';
import StockCard from '../StockCard/StockCard';
import CryptoCard from '../CryptoCard/CryptoCard';
import './Dashboard.css';

const TABS = [
    { id: 'weather', label: '🌦️ Weather', endpoint: 'GET /api/v1/weather/all' },
    { id: 'stocks',  label: '📈 Stocks',  endpoint: 'GET /api/v1/stocks/all' },
    { id: 'crypto',  label: '🪙 Crypto',  endpoint: 'GET /api/v1/crypto/all' },
];

const Dashboard = () => {
    // ── State ──
    const [weatherData, setWeatherData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [activeTab, setActiveTab] = useState('weather');
    const [isDemoMode, setIsDemoMode] = useState(false);

    /**
     * Fetches all data from both APIs simultaneously.
     */
    const fetchAllData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Parallel fetch for better performance
            const [weatherRes, stockRes, cryptoRes] = await Promise.all([
                getAllWeather(),
                getAllStocks(),
                getAllCrypto(),
            ]);

            setWeatherData(weatherRes.data);
            setStockData(stockRes.data);
            setCryptoData(cryptoRes.data);
            setIsDemoMode(!!(weatherRes._demo || stockRes._demo || cryptoRes._demo));
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            setError(err.message || 'Failed to fetch data. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on mount
    useEffect(() => {
        fetchAllData();
    }, []);

    // ── Loading state ──
    if (loading) {
        return (
            <div className="dashboard__loading">
                <div className="dashboard__spinner"></div>
                <p>Loading API data...</p>
            </div>
        );
    }

    // ── Error state ──
    if (error) {
        return (
            <div className="dashboard__error">
                <span className="dashboard__error-icon">⚠️</span>
                <h3>Connection Error</h3>
                <p>{error}</p>
                <button className="dashboard__retry-btn" onClick={fetchAllData}>
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <main className="dashboard">
            {/* Toolbar: heading + refresh */}
            <div className="dashboard__toolbar">
                <div>
                    <h2 className="dashboard__heading">Live API Dashboard</h2>
                    {lastUpdated && (
                        <span className="dashboard__timestamp">Last updated: {lastUpdated}</span>
                    )}
                </div>
                <button className="dashboard__refresh-btn" onClick={fetchAllData}>
                    ↻ Refresh Data
                </button>
            </div>

            {/* ── Tab Navigation ── */}
            {isDemoMode && (
                <div className="dashboard__demo-banner">
                    📡 Demo Mode — Showing sample data. Start the backend for live data.
                </div>
            )}
            <div className="dashboard__tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`dashboard__tab ${activeTab === tab.id ? 'dashboard__tab--active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Endpoint badge for active tab */}
            <div className="dashboard__endpoint-bar">
                <span className="dashboard__endpoint">
                    {TABS.find((t) => t.id === activeTab)?.endpoint}
                </span>
            </div>

            {/* ── Tab Content ── */}
            <div className="dashboard__tab-content">
                {activeTab === 'weather' && (
                    <div className="dashboard__grid dashboard__grid--weather">
                        {weatherData.map((item) => (
                            <WeatherCard key={item.city} data={item} />
                        ))}
                    </div>
                )}

                {activeTab === 'stocks' && (
                    <div className="dashboard__grid dashboard__grid--stocks">
                        {stockData.map((item) => (
                            <StockCard key={item.symbol} data={item} />
                        ))}
                    </div>
                )}

                {activeTab === 'crypto' && (
                    <div className="dashboard__grid dashboard__grid--crypto">
                        {cryptoData.map((item) => (
                            <CryptoCard key={item.symbol} data={item} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Dashboard;
