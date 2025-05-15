const express = require('express');
const router = express.Router();
const axios = require('axios');

// Mock weather data (replace with actual API integration)
function getMockWeatherData(location = null) {
    // Define some location-specific weather patterns
    const locationPatterns = {
        'chennai': {
            baseTemp: 30,
            tempRange: 8,
            humidity: { min: 60, max: 90 },
            rainfall: { min: 20, max: 60 },
            conditions: ['Sunny', 'Hot', 'Humid', 'Partly Cloudy', 'Thunderstorms']
        },
        'delhi': {
            baseTemp: 25,
            tempRange: 15,
            humidity: { min: 30, max: 70 },
            rainfall: { min: 5, max: 30 },
            conditions: ['Sunny', 'Clear', 'Hazy', 'Partly Cloudy', 'Dust Storm']
        },
        'mumbai': {
            baseTemp: 28,
            tempRange: 7,
            humidity: { min: 65, max: 95 },
            rainfall: { min: 30, max: 80 },
            conditions: ['Humid', 'Rainy', 'Cloudy', 'Partly Cloudy', 'Thunderstorms']
        },
        'bangalore': {
            baseTemp: 24,
            tempRange: 10,
            humidity: { min: 40, max: 80 },
            rainfall: { min: 10, max: 50 },
            conditions: ['Pleasant', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear']
        },
        'kolkata': {
            baseTemp: 29,
            tempRange: 9,
            humidity: { min: 55, max: 85 },
            rainfall: { min: 25, max: 70 },
            conditions: ['Humid', 'Hot', 'Thunderstorms', 'Partly Cloudy', 'Rainy']
        }
    };
    
    // Default pattern if location not found
    const defaultPattern = {
        baseTemp: 27,
        tempRange: 10,
        humidity: { min: 40, max: 80 },
        rainfall: { min: 10, max: 60 },
        conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain', 'Clear']
    };
    
    // Get pattern based on location (case insensitive)
    let pattern = defaultPattern;
    if (location) {
        const locationLower = location.toLowerCase();
        for (const [key, value] of Object.entries(locationPatterns)) {
            if (locationLower.includes(key)) {
                pattern = value;
                break;
            }
        }
    }
    
    // Generate weather data based on pattern
    const temperature = Math.floor(Math.random() * pattern.tempRange + pattern.baseTemp);
    const humidity = Math.floor(Math.random() * (pattern.humidity.max - pattern.humidity.min) + pattern.humidity.min);
    const rainfall_probability = Math.floor(Math.random() * (pattern.rainfall.max - pattern.rainfall.min) + pattern.rainfall.min);
    
    // Generate forecast
    const forecast = [];
    for (let i = 1; i <= 5; i++) {
        const tempVariation = Math.floor(Math.random() * 6) - 3; // -3 to +3 degrees variation
        const condition = pattern.conditions[Math.floor(Math.random() * pattern.conditions.length)];
        
        forecast.push({
            date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
            temperature: temperature + tempVariation,
            condition: condition
        });
    }
    
    return {
        location: location || 'Unknown Location',
        temperature: temperature,
        humidity: humidity,
        rainfall_probability: rainfall_probability,
        wind_speed: Math.floor(Math.random() * 30),
        forecast: forecast,
        advisory: getWeatherAdvisory(temperature, rainfall_probability, humidity)
    };
}

// Generate farming advisory based on weather conditions
function getWeatherAdvisory(temperature, rainfall, humidity) {
    let advisory = [];
    
    // Temperature based advice
    if (temperature > 35) {
        advisory.push('High temperature alert: Ensure adequate irrigation for crops');
        advisory.push('Consider providing shade for sensitive crops');
    } else if (temperature < 15) {
        advisory.push('Low temperature alert: Protect sensitive crops from frost');
        advisory.push('Delay sowing of summer crops');
    }
    
    // Rainfall based advice
    if (rainfall > 70) {
        advisory.push('Heavy rainfall expected: Ensure proper drainage in fields');
        advisory.push('Delay fertilizer application');
    } else if (rainfall < 20) {
        advisory.push('Low rainfall expected: Consider irrigation for water-intensive crops');
    }
    
    // Humidity based advice
    if (humidity > 80) {
        advisory.push('High humidity alert: Watch for fungal diseases in crops');
        advisory.push('Consider preventive fungicide application');
    }
    
    // If no specific advice, provide general advice
    if (advisory.length === 0) {
        advisory.push('Weather conditions are favorable for most farming activities');
        advisory.push('Good time for regular crop maintenance');
    }
    
    return advisory;
}

// Mock market data (replace with actual API integration)
function getMockMarketData(location = null) {
    // Define location-specific crop prices and trends
    const locationMarkets = {
        'chennai': {
            crops: ['Rice', 'Sugarcane', 'Cotton', 'Groundnut', 'Banana'],
            priceRange: { min: 1200, max: 5500 },
            marketName: 'Chennai Agricultural Market'
        },
        'delhi': {
            crops: ['Wheat', 'Barley', 'Mustard', 'Potato', 'Onion'],
            priceRange: { min: 1000, max: 4800 },
            marketName: 'Delhi Wholesale Market'
        },
        'mumbai': {
            crops: ['Rice', 'Cotton', 'Soybean', 'Sugarcane', 'Mango'],
            priceRange: { min: 1500, max: 6000 },
            marketName: 'Mumbai APMC Market'
        },
        'bangalore': {
            crops: ['Coffee', 'Ragi', 'Vegetables', 'Flowers', 'Millet'],
            priceRange: { min: 1800, max: 7000 },
            marketName: 'Bangalore Horticultural Market'
        },
        'kolkata': {
            crops: ['Rice', 'Jute', 'Tea', 'Potato', 'Vegetables'],
            priceRange: { min: 1100, max: 5200 },
            marketName: 'Kolkata Wholesale Market'
        }
    };
    
    // Default market data
    const defaultMarket = {
        crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn'],
        priceRange: { min: 1000, max: 5000 },
        marketName: 'National Agricultural Market'
    };
    
    // Get market based on location (case insensitive)
    let market = defaultMarket;
    if (location) {
        const locationLower = location.toLowerCase();
        for (const [key, value] of Object.entries(locationMarkets)) {
            if (locationLower.includes(key)) {
                market = value;
                break;
            }
        }
    }
    
    // Generate prices for crops
    const prices = [];
    market.crops.forEach(crop => {
        const basePrice = Math.floor(Math.random() * (market.priceRange.max - market.priceRange.min) + market.priceRange.min);
        const trend = Math.random() > 0.5 ? 'up' : 'down';
        const change = (Math.random() * 5).toFixed(2);
        
        prices.push({
            name: crop,
            price: basePrice,
            trend: trend,
            change: change
        });
    });

    return { 
        prices,
        marketName: market.marketName,
        location: location || 'National',
        lastUpdated: new Date().toLocaleString()
    };
}

// Weather endpoint
router.get('/', async (req, res) => {
    try {
        // Get location from query parameter
        const location = req.query.location;
        
        // In production, integrate with a weather API like OpenWeatherMap
        const weatherData = getMockWeatherData(location);
        res.json(weatherData);
    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Location-based weather endpoint
router.get('/location/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const weatherData = getMockWeatherData(location);
        res.json(weatherData);
    } catch (error) {
        console.error('Weather API Error:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Market prices endpoint
router.get('/market', async (req, res) => {
    try {
        // Get location from query parameter
        const location = req.query.location;
        
        // In production, integrate with an agricultural market API
        const marketData = getMockMarketData(location);
        res.json(marketData);
    } catch (error) {
        console.error('Market API Error:', error);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

// Location-based market endpoint
router.get('/market/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const marketData = getMockMarketData(location);
        res.json(marketData);
    } catch (error) {
        console.error('Market API Error:', error);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

module.exports = router;