import './CryptoCard.css';

const CryptoCard = ({ data }) => {
    const isPositive = data.changePercent >= 0;
    const trendClass = isPositive ? 'trend-up' : 'trend-down';
    const trendIcon = isPositive ? '▲' : '▼';
    const changeText = isPositive
        ? `+${data.changePercent}%`
        : `${data.changePercent}%`;

    return (
        <div className="crypto-card">
            <div className="crypto-header">
                <div>
                    <h4 className="crypto-symbol">{data.symbol}</h4>
                    <span className="crypto-name">{data.name}</span>
                </div>
                <div className="crypto-badge">Crypto</div>
            </div>

            <div className="crypto-body">
                <div className="crypto-price">${data.price}</div>
                <div className={`crypto-trend ${trendClass}`}>
                    {trendIcon} {changeText}
                </div>
            </div>

            <div className="crypto-meta">
                <span>MARKET CAP</span>
                <span>{data.marketCap}</span>
            </div>
        </div>
    );
};

export default CryptoCard;
