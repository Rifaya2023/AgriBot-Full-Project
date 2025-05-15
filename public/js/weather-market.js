// Weather and Market Updates functionality

// Initialize weather and market updates
function initWeatherMarket() {
    setupLocationSearch();
    setupMarketPriceFilters();
}

// Setup location search
function setupLocationSearch() {
    const searchInput = document.getElementById('locationSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchLocation(this.value);
            }
        });
    }
}

// Search location and fetch weather
function searchLocation(location) {
    if (!location.trim()) {
        showError('Please enter a location');
        return;
    }
    
    // Show loading states
    document.getElementById('weatherInfo').innerHTML = '<div class="loading-spinner"></div>';
    document.getElementById('marketInfo').innerHTML = '<div class="loading-spinner"></div>';
    
    // Fetch weather and market data
    fetchWeatherData(location);
    fetchMarketPrices(location);
}

// Fetch weather data
function fetchWeatherData(location) {
    // Simulate API call to weather service
    setTimeout(() => {
        // Mock weather data
        const weatherData = {
            location: location,
            current: {
                temperature: 28,
                humidity: 65,
                windSpeed: 12,
                condition: 'Partly Cloudy'
            },
            forecast: [
                { day: 'Today', high: 30, low: 22, condition: 'Partly Cloudy' },
                { day: 'Tomorrow', high: 31, low: 23, condition: 'Sunny' },
                { day: 'Day 3', high: 29, low: 21, condition: 'Light Rain' },
                { day: 'Day 4', high: 28, low: 20, condition: 'Cloudy' },
                { day: 'Day 5', high: 30, low: 22, condition: 'Sunny' }
            ],
            agricultural: {
                soilMoisture: 'Moderate',
                rainProbability: '30%',
                farmingTips: [
                    'Ideal conditions for crop maintenance',
                    'Consider light irrigation in the evening',
                    'Monitor for pest activity due to humidity'
                ]
            }
        };
        
        displayWeatherInfo(weatherData);
    }, 1500);
}

// Display weather information
function displayWeatherInfo(data) {
    const weatherDiv = document.getElementById('weatherInfo');
    
    weatherDiv.innerHTML = `
        <div class="weather-card">
            <div class="current-weather">
                <h3>${data.location}</h3>
                <div class="weather-main">
                    <div class="temperature">${data.current.temperature}°C</div>
                    <div class="condition">${data.current.condition}</div>
                </div>
                <div class="weather-details">
                    <div>Humidity: ${data.current.humidity}%</div>
                    <div>Wind: ${data.current.windSpeed} km/h</div>
                </div>
            </div>
            
            <div class="forecast">
                <h4>5-Day Forecast</h4>
                <div class="forecast-days">
                    ${data.forecast.map(day => `
                        <div class="forecast-day">
                            <div class="day">${day.day}</div>
                            <div class="temp-range">${day.high}° / ${day.low}°</div>
                            <div class="condition">${day.condition}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="agricultural-info">
                <h4>Agricultural Conditions</h4>
                <div class="conditions">
                    <div>Soil Moisture: ${data.agricultural.soilMoisture}</div>
                    <div>Rain Probability: ${data.agricultural.rainProbability}</div>
                </div>
                <div class="farming-tips">
                    <h5>Farming Tips:</h5>
                    <ul>
                        ${data.agricultural.farmingTips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Setup market price filters
function setupMarketPriceFilters() {
    const cropSelect = document.getElementById('cropFilter');
    if (cropSelect) {
        cropSelect.addEventListener('change', function() {
            const location = document.getElementById('locationSearch').value;
            if (location) {
                fetchMarketPrices(location, this.value);
            }
        });
    }
}

// Fetch market prices
function fetchMarketPrices(location, crop = 'all') {
    // Simulate API call to market price service
    setTimeout(() => {
        // Mock market data
        const marketData = {
            location: location,
            lastUpdated: new Date().toLocaleDateString(),
            prices: [
                { crop: 'Rice', price: 2000, unit: 'per quintal', trend: 'up' },
                { crop: 'Wheat', price: 1800, unit: 'per quintal', trend: 'stable' },
                { crop: 'Corn', price: 1600, unit: 'per quintal', trend: 'down' },
                { crop: 'Sugarcane', price: 280, unit: 'per quintal', trend: 'up' },
                { crop: 'Cotton', price: 5500, unit: 'per quintal', trend: 'stable' }
            ]
        };
        
        if (crop !== 'all') {
            marketData.prices = marketData.prices.filter(item => 
                item.crop.toLowerCase() === crop.toLowerCase());
        }
        
        displayMarketInfo(marketData);
    }, 1500);
}

// Display market information
function displayMarketInfo(data) {
    const marketDiv = document.getElementById('marketInfo');
    
    marketDiv.innerHTML = `
        <div class="market-card">
            <div class="market-header">
                <h3>Market Prices - ${data.location}</h3>
                <div class="last-updated">Last Updated: ${data.lastUpdated}</div>
            </div>
            
            <div class="price-list">
                <table class="price-table">
                    <thead>
                        <tr>
                            <th>Crop</th>
                            <th>Price</th>
                            <th>Unit</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.prices.map(item => `
                            <tr>
                                <td>${item.crop}</td>
                                <td>₹${item.price}</td>
                                <td>${item.unit}</td>
                                <td>
                                    <span class="trend-${item.trend}">
                                        ${getTrendIcon(item.trend)}
                                    </span>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Get trend icon
function getTrendIcon(trend) {
    switch(trend) {
        case 'up': return '↑';
        case 'down': return '↓';
        default: return '→';
    }
}

// Show error message
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.textContent = message;
    document.getElementById('alertContainer').appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

// Initialize when modal opens
document.getElementById('updatesModal').addEventListener('shown.bs.modal', initWeatherMarket);