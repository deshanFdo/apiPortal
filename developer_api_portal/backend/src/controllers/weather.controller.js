/**
 * ============================================================================
 * WEATHER CONTROLLER
 * ============================================================================
 * Handles HTTP request/response logic for weather endpoints.
 * Delegates actual data retrieval to the weather service layer.
 *
 * Pattern: Controller receives request → calls service → sends response.
 */

const weatherService = require('../services/weather.service');

/**
 * GET /api/v1/weather?city=London
 * Returns weather data for a single city.
 */
const getWeather = (req, res, next) => {
    try {
        const { city } = req.query;

        // Validate required parameter
        if (!city) {
            const error = new Error('Query parameter "city" is required. Example: /api/v1/weather?city=London');
            error.statusCode = 400;
            throw error;
        }

        const weatherData = weatherService.getWeatherByCity(city);

        res.status(200).json({
            success: true,
            data: weatherData,
        });
    } catch (err) {
        next(err); // Forward to global error handler
    }
};

/**
 * GET /api/v1/weather/all
 * Returns weather data for every supported city.
 */
const getAllWeather = (req, res, next) => {
    try {
        const allWeather = weatherService.getAllWeather();

        res.status(200).json({
            success: true,
            count: allWeather.length,
            data: allWeather,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * GET /api/v1/weather/cities
 * Returns the list of supported city names.
 */
const getSupportedCities = (req, res, next) => {
    try {
        const cities = weatherService.getSupportedCities();

        res.status(200).json({
            success: true,
            count: cities.length,
            data: cities,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getWeather,
    getAllWeather,
    getSupportedCities,
};
