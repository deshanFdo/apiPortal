/**
 * ============================================================================
 * WEATHER SERVICE
 * ============================================================================
 * Business logic layer for weather data.
 *
 * Currently uses a comprehensive local dataset. In production, this service
 * would integrate with a real weather provider (e.g., OpenWeatherMap API)
 * by swapping the data source — the controller and routes remain untouched.
 */

// ── Local weather dataset (simulates a database or external API) ──
const weatherDatabase = {
    London: { temp: 15, feelsLike: 12, condition: 'Cloudy', humidity: 80, windSpeed: 18, visibility: 10, icon: '☁️' },
    Tokyo: { temp: 22, feelsLike: 24, condition: 'Clear', humidity: 55, windSpeed: 8, visibility: 16, icon: '☀️' },
    NewYork: { temp: 18, feelsLike: 16, condition: 'Rain', humidity: 65, windSpeed: 22, visibility: 7, icon: '🌧️' },
    Paris: { temp: 14, feelsLike: 11, condition: 'Partly Cloudy', humidity: 72, windSpeed: 15, visibility: 12, icon: '⛅' },
    Sydney: { temp: 28, feelsLike: 30, condition: 'Sunny', humidity: 45, windSpeed: 12, visibility: 20, icon: '☀️' },
    Dubai: { temp: 38, feelsLike: 42, condition: 'Hot', humidity: 30, windSpeed: 10, visibility: 15, icon: '🔥' },
    Mumbai: { temp: 32, feelsLike: 36, condition: 'Humid', humidity: 85, windSpeed: 14, visibility: 8, icon: '🌫️' },
    Berlin: { temp: 10, feelsLike: 7, condition: 'Overcast', humidity: 78, windSpeed: 20, visibility: 9, icon: '☁️' },
    Toronto: { temp: -2, feelsLike: -8, condition: 'Snow', humidity: 90, windSpeed: 25, visibility: 4, icon: '❄️' },
    Singapore: { temp: 30, feelsLike: 34, condition: 'Thunderstorm', humidity: 88, windSpeed: 16, visibility: 6, icon: '⛈️' },
};

/**
 * Fetches weather data for a specific city.
 * @param {string} city - The city name to look up.
 * @returns {object} Weather data for the requested city.
 */
const getWeatherByCity = (city) => {
    const data = weatherDatabase[city];

    if (!data) {
        const error = new Error(`City "${city}" not found. Available cities: ${Object.keys(weatherDatabase).join(', ')}`);
        error.statusCode = 404;
        throw error;
    }

    return {
        city,
        temperature: `${data.temp}°C`,
        feelsLike: `${data.feelsLike}°C`,
        condition: data.condition,
        humidity: `${data.humidity}%`,
        windSpeed: `${data.windSpeed} km/h`,
        visibility: `${data.visibility} km`,
        icon: data.icon,
        updatedAt: new Date().toISOString(),
    };
};

/**
 * Fetches weather data for ALL available cities.
 * @returns {Array<object>} Array of weather objects for every city.
 */
const getAllWeather = () => {
    return Object.keys(weatherDatabase).map((city) => getWeatherByCity(city));
};

/**
 * Returns the list of supported city names.
 * @returns {string[]} Array of city name strings.
 */
const getSupportedCities = () => {
    return Object.keys(weatherDatabase);
};

module.exports = {
    getWeatherByCity,
    getAllWeather,
    getSupportedCities,
};
