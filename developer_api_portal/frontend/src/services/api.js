/**
 * ============================================================================
 * API SERVICE LAYER
 * ============================================================================
 * Centralizes all HTTP calls to the backend.
 * Falls back to built-in demo data when the backend is unreachable
 * (e.g. when hosted on GitHub Pages as a static site).
 */

// Base URL — in dev the Vite proxy forwards /api to localhost:3000.
// In production (GitHub Pages) VITE_API_BASE_URL points to the Render backend.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * Generic fetch wrapper with error handling.
 */
const fetchApi = async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'An unknown error occurred');
    }

    return data;
};

// ── Demo / fallback data (used when backend is offline) ──

const DEMO_WEATHER = [
    { city: 'London', temperature: '12°C', feelsLike: '9°C', condition: 'Partly cloudy', humidity: '72%', windSpeed: '18 km/h', visibility: '10 km', icon: '⛅' },
    { city: 'New York', temperature: '8°C', feelsLike: '5°C', condition: 'Clear sky', humidity: '55%', windSpeed: '12 km/h', visibility: '16 km', icon: '☀️' },
    { city: 'Tokyo', temperature: '15°C', feelsLike: '14°C', condition: 'Light rain', humidity: '80%', windSpeed: '8 km/h', visibility: '7 km', icon: '🌧️' },
    { city: 'Sydney', temperature: '22°C', feelsLike: '21°C', condition: 'Sunny', humidity: '48%', windSpeed: '14 km/h', visibility: '20 km', icon: '☀️' },
    { city: 'Dubai', temperature: '35°C', feelsLike: '38°C', condition: 'Hot & humid', humidity: '60%', windSpeed: '10 km/h', visibility: '12 km', icon: '🌡️' },
    { city: 'Paris', temperature: '10°C', feelsLike: '7°C', condition: 'Overcast', humidity: '78%', windSpeed: '20 km/h', visibility: '8 km', icon: '☁️' },
    { city: 'Singapore', temperature: '30°C', feelsLike: '33°C', condition: 'Thunderstorm', humidity: '88%', windSpeed: '6 km/h', visibility: '5 km', icon: '⛈️' },
    { city: 'Mumbai', temperature: '28°C', feelsLike: '31°C', condition: 'Haze', humidity: '75%', windSpeed: '9 km/h', visibility: '4 km', icon: '🌫️' },
    { city: 'Toronto', temperature: '3°C', feelsLike: '-1°C', condition: 'Snow', humidity: '82%', windSpeed: '22 km/h', visibility: '3 km', icon: '🌨️' },
    { city: 'Berlin', temperature: '6°C', feelsLike: '3°C', condition: 'Drizzle', humidity: '70%', windSpeed: '15 km/h', visibility: '9 km', icon: '🌦️' },
    { city: 'Colombo', temperature: '29°C', feelsLike: '32°C', condition: 'Partly cloudy', humidity: '78%', windSpeed: '12 km/h', visibility: '8 km', icon: '⛅' },
];

const DEMO_STOCKS = [
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', price: 189.84, change: 2.34, changePercent: 1.25, marketCap: '$2.95T' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', price: 141.56, change: -0.87, changePercent: -0.61, marketCap: '$1.76T' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', price: 378.91, change: 4.12, changePercent: 1.10, marketCap: '$2.81T' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer', price: 178.25, change: 1.56, changePercent: 0.88, marketCap: '$1.85T' },
    { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', price: 248.42, change: -5.13, changePercent: -2.02, marketCap: '$790B' },
    { symbol: 'META', name: 'Meta Platforms', sector: 'Technology', price: 505.75, change: 7.22, changePercent: 1.45, marketCap: '$1.29T' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors', price: 495.22, change: 12.30, changePercent: 2.55, marketCap: '$1.22T' },
    { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', price: 172.10, change: -0.45, changePercent: -0.26, marketCap: '$498B' },
];

const DEMO_CRYPTO = [
    { symbol: 'BTC', name: 'Bitcoin', price: '43,250.00', changePercent: 2.35, marketCap: '$847B' },
    { symbol: 'ETH', name: 'Ethereum', price: '2,280.50', changePercent: -1.12, marketCap: '$274B' },
    { symbol: 'SOL', name: 'Solana', price: '98.75', changePercent: 5.40, marketCap: '$42B' },
    { symbol: 'ADA', name: 'Cardano', price: '0.52', changePercent: -0.80, marketCap: '$18B' },
    { symbol: 'XRP', name: 'Ripple', price: '0.62', changePercent: 1.15, marketCap: '$33B' },
];

/**
 * Wraps an API call with a demo-data fallback.
 */
const withFallback = async (apiFn, demoData) => {
    try {
        return await apiFn();
    } catch {
        // Return demo data in the same shape the real API would
        return { data: demoData, _demo: true };
    }
};

// ── Weather API calls ──

export const getWeatherByCity = (city) => fetchApi(`/weather?city=${encodeURIComponent(city)}`);
export const getAllWeather = () => withFallback(() => fetchApi('/weather/all'), DEMO_WEATHER);
export const getSupportedCities = () => fetchApi('/weather/cities');

// ── Stock API calls ──

export const getStockBySymbol = (symbol) => fetchApi(`/stocks?symbol=${encodeURIComponent(symbol)}`);
export const getAllStocks = () => withFallback(() => fetchApi('/stocks/all'), DEMO_STOCKS);
export const getSupportedSymbols = () => fetchApi('/stocks/symbols');

// ── Crypto API calls ──

export const getAllCrypto = () => withFallback(() => fetchApi('/crypto/all'), DEMO_CRYPTO);

// ── Health check ──

export const getHealthStatus = () => fetchApi('/health');
