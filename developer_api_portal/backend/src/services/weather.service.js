/**
 * Enterprise API Portal - Real-time Weather Service
 * Tries TWO free weather APIs (no API key needed) in order:
 *   1. Open-Meteo  — fast, reliable, coordinate-based
 *   2. wttr.in     — city-name based, good backup
 * Falls back to realistic sample data when both APIs are unreachable.
 */

const axios = require('axios');

// Supported cities with coordinates (for Open-Meteo) and query strings (for wttr.in)
const SUPPORTED_CITIES = {
    'London':    { lat: 51.5085, lon: -0.1257,  wttr: 'London'    },
    'Tokyo':     { lat: 35.6895, lon: 139.6917, wttr: 'Tokyo'     },
    'New York':  { lat: 40.7128, lon: -74.0060, wttr: 'New+York'  },
    'Paris':     { lat: 48.8566, lon: 2.3522,   wttr: 'Paris'     },
    'Sydney':    { lat: -33.8688, lon: 151.2093, wttr: 'Sydney'   },
    'Dubai':     { lat: 25.2048, lon: 55.2708,  wttr: 'Dubai'     },
    'Mumbai':    { lat: 19.0760, lon: 72.8777,  wttr: 'Mumbai'    },
    'Berlin':    { lat: 52.5200, lon: 13.4050,  wttr: 'Berlin'    },
    'Toronto':   { lat: 43.7001, lon: -79.4163, wttr: 'Toronto'   },
    'Singapore': { lat: 1.3521,  lon: 103.8198, wttr: 'Singapore' },
    'Colombo':   { lat: 6.9271,  lon: 79.8612,  wttr: 'Colombo'  },
};

// Fallback data when both APIs are unreachable
const FALLBACK_WEATHER = {
    'London':    { temperature: 12, condition: 'Partly Cloudy', humidity: 72, windSpeed: 18, visibility: 10, feelsLike: 9 },
    'Tokyo':     { temperature: 15, condition: 'Light Rain',    humidity: 80, windSpeed: 8,  visibility: 7,  feelsLike: 14 },
    'New York':  { temperature: 8,  condition: 'Clear',         humidity: 55, windSpeed: 12, visibility: 16, feelsLike: 5 },
    'Paris':     { temperature: 10, condition: 'Overcast',      humidity: 78, windSpeed: 20, visibility: 8,  feelsLike: 7 },
    'Sydney':    { temperature: 22, condition: 'Sunny',         humidity: 48, windSpeed: 14, visibility: 20, feelsLike: 21 },
    'Dubai':     { temperature: 35, condition: 'Hot & Humid',   humidity: 60, windSpeed: 10, visibility: 12, feelsLike: 38 },
    'Mumbai':    { temperature: 28, condition: 'Haze',          humidity: 75, windSpeed: 9,  visibility: 4,  feelsLike: 31 },
    'Berlin':    { temperature: 6,  condition: 'Drizzle',       humidity: 70, windSpeed: 15, visibility: 9,  feelsLike: 3 },
    'Toronto':   { temperature: 3,  condition: 'Snow',          humidity: 82, windSpeed: 22, visibility: 3,  feelsLike: -1 },
    'Singapore': { temperature: 30, condition: 'Thunderstorm',  humidity: 88, windSpeed: 6,  visibility: 5,  feelsLike: 33 },
    'Colombo':   { temperature: 29, condition: 'Partly Cloudy', humidity: 78, windSpeed: 12, visibility: 8,  feelsLike: 32 },
};

// Map WMO weather codes to human-readable conditions
const wmoCondition = (code) => {
    if (code === 0) return 'Clear';
    if (code <= 3)  return code === 1 ? 'Mostly Clear' : code === 2 ? 'Partly Cloudy' : 'Cloudy';
    if (code <= 48) return 'Fog';
    if (code <= 67) return 'Rain';
    if (code <= 77) return 'Snow';
    if (code <= 82) return 'Rain Showers';
    if (code <= 86) return 'Snow Showers';
    if (code <= 99) return 'Thunderstorm';
    return 'Unknown';
};

class WeatherService {

    // Strategy 1: Open-Meteo (coordinate-based, no key)
    async _fetchOpenMeteo(cityDisplay, coords) {
        const res = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: coords.lat,
                longitude: coords.lon,
                current_weather: true,
                hourly: 'relativehumidity_2m,visibility',
                timezone: 'auto',
            },
            timeout: 5000,
        });

        const current = res.data.current_weather;
        const hourly  = res.data.hourly;
        const idx     = hourly.time.indexOf(current.time);

        return {
            city: cityDisplay,
            temperature: current.temperature,
            condition: wmoCondition(current.weathercode),
            humidity:   idx !== -1 ? hourly.relativehumidity_2m[idx] : 60,
            windSpeed:  current.windspeed,
            visibility: idx !== -1 ? Math.round(hourly.visibility[idx] / 1000) : 10,
            feelsLike:  Math.round(current.temperature - current.windspeed * 0.1),
            lastUpdated: new Date().toISOString(),
        };
    }

    // Strategy 2: wttr.in (city-name based, no key)
    async _fetchWttrIn(cityDisplay, query) {
        const res = await axios.get(`https://wttr.in/${query}?format=j1`, {
            timeout: 5000,
            headers: { 'User-Agent': 'curl/7.0', 'Accept': 'application/json' },
        });

        const c = res.data.current_condition[0];

        return {
            city: cityDisplay,
            temperature: Number(c.temp_C),
            condition: c.weatherDesc[0].value,
            humidity: Number(c.humidity),
            windSpeed: Number(c.windspeedKmph),
            visibility: Number(c.visibility),
            feelsLike: Number(c.FeelsLikeC),
            lastUpdated: new Date().toISOString(),
        };
    }

    /**
     * Get weather for a city — tries Open-Meteo -> wttr.in -> fallback
     */
    async getWeatherByCity(city) {
        const cityDisplay = Object.keys(SUPPORTED_CITIES).find(
            c => c.toLowerCase() === city.toLowerCase()
        );
        if (!cityDisplay) return null;

        const info = SUPPORTED_CITIES[cityDisplay];

        // Try Open-Meteo first
        try {
            return await this._fetchOpenMeteo(cityDisplay, info);
        } catch (e1) {
            console.warn(`Open-Meteo failed for ${cityDisplay}: ${e1.message}`);
        }

        // Try wttr.in as backup
        try {
            return await this._fetchWttrIn(cityDisplay, info.wttr);
        } catch (e2) {
            console.warn(`wttr.in also failed for ${cityDisplay}: ${e2.message}`);
        }

        // Both failed — return fallback
        console.warn(`Using fallback data for ${cityDisplay}`);
        return {
            city: cityDisplay,
            ...FALLBACK_WEATHER[cityDisplay],
            lastUpdated: new Date().toISOString(),
        };
    }

    /**
     * Get weather for all supported cities in parallel
     */
    async getAllWeather() {
        const cities = Object.keys(SUPPORTED_CITIES);
        const results = await Promise.allSettled(
            cities.map(city => this.getWeatherByCity(city))
        );
        return results
            .filter(r => r.status === 'fulfilled' && r.value !== null)
            .map(r => r.value);
    }

    /**
     * Get list of supported cities
     */
    getSupportedCities() {
        return Object.keys(SUPPORTED_CITIES);
    }
}

module.exports = new WeatherService();
