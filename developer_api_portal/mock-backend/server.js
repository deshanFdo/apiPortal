const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ----------------------------------------------------------------------------
// 1. Mock Weather API
// Returns current weather data for a given city
// ----------------------------------------------------------------------------
app.get('/weather', (req, res) => {
    const city = req.query.city || 'Unknown';
    
    // Hardcoded mock data for demonstration
    const mockWeatherData = {
        London: { temp: '15°C', condition: 'Cloudy', humidity: '80%' },
        Tokyo: { temp: '22°C', condition: 'Clear', humidity: '55%' },
        NewYork: { temp: '18°C', condition: 'Rain', humidity: '65%' }
    };

    // If we have mock data for the city, return it; otherwise return a generic response
    const data = mockWeatherData[city] || {
        temp: Math.floor(Math.random() * 30) + '°C',
        condition: 'Variable',
        humidity: Math.floor(Math.random() * 100) + '%'
    };

    res.json({
        service: 'Weather API',
        city: city,
        data: data,
        timestamp: new Date().toISOString()
    });
});

// ----------------------------------------------------------------------------
// 2. Mock Stock API
// Returns current stock price for a given ticker symbol
// ----------------------------------------------------------------------------
app.get('/stocks', (req, res) => {
    const symbol = req.query.symbol || 'UNKNOWN';

    // Hardcoded mock data for demonstration
    const mockStockData = {
        AAPL: { price: 175.50, change: '+1.2%' },
        MSFT: { price: 410.20, change: '-0.5%' },
        GOOGL: { price: 140.80, change: '+0.8%' }
    };

    // Generate random price if the symbol is not in our mock data
    const data = mockStockData[symbol.toUpperCase()] || {
        price: (Math.random() * 500).toFixed(2),
        change: (Math.random() * 5).toFixed(1) + '%'
    };

    res.json({
        service: 'Stock Alert API',
        symbol: symbol.toUpperCase(),
        data: data,
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Backend is running naturally' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Mock Backend Services running at http://localhost:${PORT}`);
    console.log(`- Weather Endpoint: http://localhost:${PORT}/weather?city=London`);
    console.log(`- Stock Endpoint:   http://localhost:${PORT}/stocks?symbol=AAPL`);
});
