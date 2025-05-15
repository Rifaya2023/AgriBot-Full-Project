// Service Modal Handlers

function initializeChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages.hasChildNodes()) {
        // Add welcome message
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'bot-message';
        welcomeMessage.innerHTML = `
            <div class="message-content">
                Hello! I'm your AgriBot assistant. How can I help you with your farming queries today?
            </div>
        `;
        chatMessages.appendChild(welcomeMessage);
    }
}

function loadAvailableSchemes() {
    const schemesList = document.createElement('div');
    schemesList.className = 'schemes-list';
    schemesList.innerHTML = `
        <div class="available-schemes">
            <h4>Available Schemes</h4>
            <div class="scheme-item">
                <h5>PM-KISAN</h5>
                <p>Direct income support of ₹6000 per year for eligible farmers</p>
                <button onclick="showSchemeDetails('PM-KISAN')">View Details</button>
            </div>
            <div class="scheme-item">
                <h5>Soil Health Card Scheme</h5>
                <p>Free soil testing and recommendations for farmers</p>
                <button onclick="showSchemeDetails('SHC')">View Details</button>
            </div>
            <div class="scheme-item">
                <h5>PMFBY</h5>
                <p>Crop insurance scheme for farmers</p>
                <button onclick="showSchemeDetails('PMFBY')">View Details</button>
            </div>
        </div>
    `;
    
    const container = document.querySelector('.schemes-container');
    const existingList = container.querySelector('.schemes-list');
    if (existingList) {
        container.replaceChild(schemesList, existingList);
    } else {
        container.appendChild(schemesList);
    }
}

function initWeatherMarket() {
    const weatherInfo = document.getElementById('weatherInfo');
    const marketInfo = document.getElementById('marketInfo');
    const locationSearch = document.getElementById('locationSearch');
    const cropFilter = document.getElementById('cropFilter');

    // Add event listeners for real-time updates
    locationSearch.addEventListener('input', debounce(updateWeatherAndMarket, 500));
    cropFilter.addEventListener('change', () => updateMarketInfo(locationSearch.value));

    // Initialize with placeholder content
    if (weatherInfo && !weatherInfo.hasChildNodes()) {
        weatherInfo.innerHTML = `
            <div class="weather-card">
                <h4>Weather Forecast</h4>
                <p>Enter your location to view detailed weather information</p>
            </div>
        `;
    }

    if (marketInfo && !marketInfo.hasChildNodes()) {
        marketInfo.innerHTML = `
            <div class="market-card">
                <h4>Market Prices</h4>
                <p>Enter your location and select a crop to view current market prices</p>
            </div>
        `;
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to update weather and market information
async function updateWeatherInfo(location) {
    if (!location) return;
    
    // Update weather information with more detailed data
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <div class="weather-card">
            <h4>Weather Forecast for ${location}</h4>
            <div class="weather-details">
                <div class="weather-item">
                    <i class="fas fa-temperature-high"></i>
                    <span>Temperature: 28°C</span>
                    <small>Feels like 30°C</small>
                </div>
                <div class="weather-item">
                    <i class="fas fa-tint"></i>
                    <span>Humidity: 65%</span>
                </div>
                <div class="weather-item">
                    <i class="fas fa-cloud-rain"></i>
                    <span>Precipitation: 20%</span>
                    <small>0.5mm expected</small>
                </div>
                <div class="weather-item">
                    <i class="fas fa-wind"></i>
                    <span>Wind: 10 km/h</span>
                    <small>Direction: NE</small>
                </div>
                <div class="weather-item">
                    <i class="fas fa-sun"></i>
                    <span>UV Index: 6</span>
                    <small>Moderate</small>
                </div>
            </div>
            <div class="forecast-details">
                <h5>3-Day Forecast</h5>
                <div class="forecast-row">
                    <div class="forecast-day">
                        <span>Tomorrow</span>
                        <i class="fas fa-cloud-sun"></i>
                        <span>29°C</span>
                    </div>
                    <div class="forecast-day">
                        <span>Day 2</span>
                        <i class="fas fa-cloud"></i>
                        <span>27°C</span>
                    </div>
                    <div class="forecast-day">
                        <span>Day 3</span>
                        <i class="fas fa-sun"></i>
                        <span>30°C</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateWeatherAndMarket(location) {
    if (!location) return;
    updateWeatherInfo(location);
    updateMarketInfo(location);
}

// Function to update market information with trends and comparisons
function updateMarketInfo(location) {
    const cropFilter = document.getElementById('cropFilter');
    const selectedCrop = cropFilter.value;
    const marketInfo = document.getElementById('marketInfo');

    marketInfo.innerHTML = `
        <div class="market-card">
            <h4>Market Prices in ${location}</h4>
            <div class="market-filters">
                <select id="marketTimeframe" onchange="updateMarketInfo('${location}')">
                    <option value="today">Today's Prices</option>
                    <option value="week">Weekly Average</option>
                    <option value="month">Monthly Trend</option>
                </select>
            </div>
            <div class="market-details">
                ${selectedCrop === 'all' ? getAllCropPrices() : getCropPrice(selectedCrop)}
            </div>
            <div class="market-trends">
                <h5>Price Trends</h5>
                <div class="trend-info">
                    <span class="trend-label">Price Trend:</span>
                    <span class="trend-value increasing">↑ Increasing</span>
                </div>
                <div class="trend-info">
                    <span class="trend-label">Weekly Change:</span>
                    <span class="trend-value">+5%</span>
                </div>
            </div>
            <div class="nearby-markets">
                <h5>Nearby Markets</h5>
                <div class="nearby-market-item">
                    <span class="market-name">Central Market</span>
                    <span class="price-diff">Base Price</span>
                </div>
                <div class="nearby-market-item">
                    <span class="market-name">North Market</span>
                    <span class="price-diff">-2%</span>
                </div>
                <div class="nearby-market-item">
                    <span class="market-name">South Market</span>
                    <span class="price-diff">+3%</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to get all crop prices with additional market data
function getAllCropPrices() {
    return `
        <div class="crop-price">
            <span class="crop-name">Rice</span>
            <span class="price">₹2000/quintal</span>
            <span class="volume">Volume: 500q</span>
            <span class="price-change positive">+₹50</span>
        </div>
        <div class="crop-price">
            <span class="crop-name">Wheat</span>
            <span class="price">₹2200/quintal</span>
            <span class="volume">Volume: 350q</span>
            <span class="price-change negative">-₹30</span>
        </div>
        <div class="crop-price">
            <span class="crop-name">Corn</span>
            <span class="price">₹1800/quintal</span>
            <span class="volume">Volume: 400q</span>
            <span class="price-change positive">+₹20</span>
        </div>
        <div class="crop-price">
            <span class="crop-name">Sugarcane</span>
            <span class="price">₹350/quintal</span>
            <span class="volume">Volume: 1000q</span>
            <span class="price-change neutral">₹0</span>
        </div>
        <div class="crop-price">
            <span class="crop-name">Cotton</span>
            <span class="price">₹6000/quintal</span>
            <span class="volume">Volume: 200q</span>
            <span class="price-change positive">+₹100</span>
        </div>
    `;
}

// Helper function to get specific crop price with detailed market analysis
function getCropPrice(crop) {
    const marketData = {
        rice: { price: '₹2000/quintal', volume: '500q', change: '+₹50', demand: 'High' },
        wheat: { price: '₹2200/quintal', volume: '350q', change: '-₹30', demand: 'Medium' },
        corn: { price: '₹1800/quintal', volume: '400q', change: '+₹20', demand: 'High' },
        sugarcane: { price: '₹350/quintal', volume: '1000q', change: '₹0', demand: 'Stable' },
        cotton: { price: '₹6000/quintal', volume: '200q', change: '+₹100', demand: 'High' }
    };

    const data = marketData[crop] || { price: 'Price not available', volume: 'N/A', change: 'N/A', demand: 'N/A' };
    
    return `
        <div class="crop-price detailed">
            <div class="price-header">
                <span class="crop-name">${crop.charAt(0).toUpperCase() + crop.slice(1)}</span>
                <span class="price">${data.price}</span>
            </div>
            <div class="price-details">
                <div class="detail-item">
                    <span class="label">Trading Volume:</span>
                    <span class="value">${data.volume}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Price Change:</span>
                    <span class="value ${data.change.startsWith('+') ? 'positive' : data.change.startsWith('-') ? 'negative' : 'neutral'}">${data.change}</span>
                </div>
                <div class="detail-item">
                    <span class="label">Market Demand:</span>
                    <span class="value">${data.demand}</span>
                </div>
            </div>
        </div>
    `;
}
}