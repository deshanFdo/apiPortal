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

const Dashboard = () => {
    // ── State ──
    const [weatherData, setWeatherData] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

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
            {/* Section header with refresh control */}
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

            {/* ── Weather Section ── */}
            <section className="dashboard__section">
                <div className="dashboard__section-header">
                    <h3 className="dashboard__section-title">🌦️ Weather API</h3>
                    <span className="dashboard__endpoint">GET /api/v1/weather/all</span>
                </div>
                <div className="dashboard__grid dashboard__grid--weather">
                    {weatherData.map((item) => (
                        <WeatherCard key={item.city} data={item} />
                    ))}
                </div>
            </section>

            {/* ── Stocks Section ── */}
            <section className="dashboard__section">
                <div className="dashboard__section-header">
                    <h3 className="dashboard__section-title">📈 Stock Alert API</h3>
                    <span className="dashboard__endpoint">GET /api/v1/stocks/all</span>
                </div>
                <div className="dashboard__grid dashboard__grid--stocks">
                    {stockData.map((item) => (
                        <StockCard key={item.symbol} data={item} />
                    ))}
                </div>
            </section>

            {/* ── Crypto Section ── */}
            <section className="dashboard__section">
                <div className="dashboard__section-header">
                    <h3 className="dashboard__section-title">🪙 Cryptocurrency API</h3>
                    <span className="dashboard__endpoint">GET /api/v1/crypto/all</span>
                </div>
                <div className="dashboard__grid dashboard__grid--stocks">
                    {cryptoData.map((item) => (
                        <CryptoCard key={item.symbol} data={item} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
