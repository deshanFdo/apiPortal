/**
 * Enterprise API Portal - Real-time Weather Service
 * Fetches live weather data from Open-Meteo (No API key required)
 */

const axios = require('axios');

// Supported cities with their coordinates
const SUPPORTED_CITIES = {
    'London': { lat: 51.5085, lon: -0.1257 },
    'Tokyo': { lat: 35.6895, lon: 139.6917 },
    'NewYork': { lat: 40.7128, lon: -74.0060 },
    'Paris': { lat: 48.8566, lon: 2.3522 },
    'Sydney': { lat: -33.8688, lon: 151.2093 },
    'Dubai': { lat: 25.2048, lon: 55.2708 },
    'Mumbai': { lat: 19.0760, lon: 72.8777 },
    'Berlin': { lat: 52.5200, lon: 13.4050 },
    'Toronto': { lat: 43.7001, lon: -79.4163 },
    'Singapore': { lat: 1.3521, lon: 103.8198 }
};

// Map WMO weather codes to our UI conditions
const getWeatherCondition = (wmoCode) => {
    if (wmoCode === 0) return 'Clear';
    if (wmoCode >= 1 && wmoCode <= 3) return wmoCode === 1 ? 'Mostly Clear' : wmoCode === 2 ? 'Partly Cloudy' : 'Cloudy';
    if (wmoCode >= 45 && wmoCode <= 48) return 'Fog';
    if (wmoCode >= 51 && wmoCode <= 67) return 'Rain';
    if (wmoCode >= 71 && wmoCode <= 77) return 'Snow';
    if (wmoCode >= 80 && wmoCode <= 82) return 'Rain Showers';
    if (wmoCode >= 85 && wmoCode <= 86) return 'Snow Showers';
    if (wmoCode >= 95 && wmoCode <= 99) return 'Thunderstorm';
    return 'Unknown';
};

class WeatherService {

    /**
     * Get real-time weather for a specific city
     */
    async getWeatherByCity(city) {
        const cityNormalized = Object.keys(SUPPORTED_CITIES).find(c => c.toLowerCase() === city.toLowerCase());

        if (!cityNormalized) {
            return null; // City not supported
        }

        const coords = SUPPORTED_CITIES[cityNormalized];

        try {
            // Fetch live data from Open-Meteo
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
                params: {
                    latitude: coords.lat,
                    longitude: coords.lon,
                    current_weather: true,
                    hourly: 'relativehumidity_2m,visibility',
                    timezone: 'auto'
                }
            });

            const data = response.data;
            const current = data.current_weather;

            // Extract current humidity & visibility from hourly array based on current time
            const currentTimeStr = current.time;
            const timeIndex = data.hourly.time.indexOf(currentTimeStr);

            const humidity = timeIndex !== -1 ? data.hourly.relativehumidity_2m[timeIndex] : 60;
            const visibilityKm = timeIndex !== -1 ? Math.round(data.hourly.visibility[timeIndex] / 1000) : 10;

            return {
                city: cityNormalized,
                temperature: current.temperature,
                condition: getWeatherCondition(current.weathercode),
                humidity: humidity,
                windSpeed: current.windspeed,
                visibility: visibilityKm,
                feelsLike: Math.round(current.temperature - (current.windspeed * 0.1)), // basic approximation
                lastUpdated: new Date().toISOString()
            };
        } catch (error) {
            console.error(`Failed to fetch weather for ${city}:`, error.message);
            throw new Error('Real-time weather API is currently unavailable');
        }
    }

    /**
     * Get real-time weather for all supported cities in parallel
     */
    async getAllWeather() {
        const cities = Object.keys(SUPPORTED_CITIES);
        // Execute all API calls concurrently
        const promises = cities.map(city => this.getWeatherByCity(city));

        try {
            const results = await Promise.allSettled(promises);
            return results
                .filter(res => res.status === 'fulfilled' && res.value !== null)
                .map(res => res.value);
        } catch (error) {
            console.error('Failed to fetch all weather:', error);
            throw error;
        }
    }

    /**
     * Get list of supported cities
     */
    getSupportedCities() {
        return Object.keys(SUPPORTED_CITIES);
    }
}

module.exports = new WeatherService();
