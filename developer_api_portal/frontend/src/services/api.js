/**
 * ============================================================================
 * API SERVICE LAYER
 * ============================================================================
 * Centralizes all HTTP calls to the backend.
 * All components import from this file instead of calling fetch() directly.
 * This makes it trivial to swap the base URL when WSO2 Gateway is set up.
 */

// Base URL — uses Vite proxy in development, so we just use /api/v1
const API_BASE = '/api/v1';

/**
 * Generic fetch wrapper with error handling.
 * @param {string} endpoint - The API endpoint (e.g., '/weather?city=London').
 * @returns {Promise<object>} Parsed JSON response.
 */
const fetchApi = async (endpoint) => {
    const response = await fetch(`${API_BASE}${endpoint}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error?.message || 'An unknown error occurred');
    }

    return data;
};

// ── Weather API calls ──

export const getWeatherByCity = (city) => fetchApi(`/weather?city=${encodeURIComponent(city)}`);
export const getAllWeather = () => fetchApi('/weather/all');
export const getSupportedCities = () => fetchApi('/weather/cities');

// ── Stock API calls ──

export const getStockBySymbol = (symbol) => fetchApi(`/stocks?symbol=${encodeURIComponent(symbol)}`);
export const getAllStocks = () => fetchApi('/stocks/all');
export const getSupportedSymbols = () => fetchApi('/stocks/symbols');

// ── Health check ──

export const getHealthStatus = () => fetchApi('/health');
