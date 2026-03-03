/**
 * ============================================================================
 * STOCK CARD COMPONENT
 * ============================================================================
 * Displays stock data for a single ticker in a clean, professional card.
 * Includes ticker, company name, price, change, and trend indicator.
 */

import './StockCard.css';

const StockCard = ({ data }) => {
    if (!data) return null;

    const isUp = data.change >= 0;

    return (
        <div className={`stock-card ${isUp ? 'stock-card--up' : 'stock-card--down'}`}>
            {/* Trend accent bar at top */}
            <div className="stock-card__accent"></div>

            {/* Header: symbol + sector */}
            <div className="stock-card__header">
                <div>
                    <h3 className="stock-card__symbol">{data.symbol}</h3>
                    <span className="stock-card__name">{data.name}</span>
                </div>
                <span className="stock-card__sector">{data.sector}</span>
            </div>

            {/* Price section */}
            <div className="stock-card__price-row">
                <span className="stock-card__price">${data.price?.toFixed(2)}</span>
                <div className={`stock-card__change ${isUp ? 'stock-card__change--up' : 'stock-card__change--down'}`}>
                    <span className="stock-card__arrow">{isUp ? '▲' : '▼'}</span>
                    <span>{isUp ? '+' : ''}{data.change?.toFixed(2)} ({isUp ? '+' : ''}{data.changePercent?.toFixed(2)}%)</span>
                </div>
            </div>

            {/* Market cap */}
            <div className="stock-card__footer">
                <span className="stock-card__mcap-label">Market Cap</span>
                <span className="stock-card__mcap-value">{data.marketCap}</span>
            </div>
        </div>
    );
};

export default StockCard;
