/**
 * ============================================================================
 * WEATHER CARD COMPONENT
 * ============================================================================
 * Displays weather data for a single city in a visually rich card.
 * Includes temperature, condition, humidity, wind, and a weather icon.
 */

import './WeatherCard.css';

// Format a value with a unit — if the value is already a string with the unit, return as-is
const fmt = (val, unit) => {
    if (val == null) return '—';
    if (typeof val === 'string') return val; // already formatted (demo data)
    return `${val}${unit}`;
};

// Pick a weather emoji from the condition text
const conditionIcon = (condition = '') => {
    const c = condition.toLowerCase();
    if (c.includes('thunder')) return '⛈️';
    if (c.includes('snow'))    return '🌨️';
    if (c.includes('rain') || c.includes('drizzle')) return '🌧️';
    if (c.includes('fog') || c.includes('haze'))     return '🌫️';
    if (c.includes('cloud') || c.includes('overcast')) return '☁️';
    if (c.includes('partly'))  return '⛅';
    if (c.includes('clear') || c.includes('sunny'))   return '☀️';
    if (c.includes('hot'))     return '🌡️';
    return '🌤️';
};

const WeatherCard = ({ data }) => {
    if (!data) return null;

    const icon = data.icon || conditionIcon(data.condition);

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
                <span className="weather-card__icon">{icon}</span>
            </div>

            {/* Primary temperature */}
            <div className="weather-card__temp">{fmt(data.temperature, '°C')}</div>
            <span className="weather-card__feels">Feels like {fmt(data.feelsLike, '°C')}</span>

            {/* Detail grid */}
            <div className="weather-card__details">
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Humidity</span>
                    <span className="weather-card__detail-value">{fmt(data.humidity, '%')}</span>
                </div>
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Wind</span>
                    <span className="weather-card__detail-value">{fmt(data.windSpeed, ' km/h')}</span>
                </div>
                <div className="weather-card__detail">
                    <span className="weather-card__detail-label">Visibility</span>
                    <span className="weather-card__detail-value">{fmt(data.visibility, ' km')}</span>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
