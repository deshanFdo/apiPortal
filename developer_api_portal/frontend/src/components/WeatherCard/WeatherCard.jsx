/**
 * ============================================================================
 * WEATHER CARD COMPONENT
 * ============================================================================
 * Displays weather data for a single city in a visually rich card.
 * Includes temperature, condition, humidity, wind, and a weather icon.
 */

import './WeatherCard.css';

const WeatherCard = ({ data }) => {
    if (!data) return null;

    return (
        <div className="weather-card">
            {/* Card glow effect */}
            <div className="weather-card__glow"></div>

            {/* Header row: city + icon */}
            <div className="weather-card__header">
                <div>
                    <h3 className="weather-card__city">{data.city}</h3>
                    <span className="weather-card__condition">{data.condition}</span>
                </div>
                <span className="weather-card__icon">{data.icon}</span>
            </div>

            {/* Primary temperature */}
            <div className="weather-card__temp">{data.temperature}</div>
            <span className="weather-card__feels">Feels like {data.feelsLike}</span>

            {/* Detail grid */}
            <div className="weather-card__details">
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Humidity</span>
                    <span className="weather-card__detail-value">{data.humidity}</span>
                </div>
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Wind</span>
                    <span className="weather-card__detail-value">{data.windSpeed}</span>
                </div>
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Visibility</span>
                    <span className="weather-card__detail-value">{data.visibility}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
