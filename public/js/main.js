// Modal Management with Enhanced Animations
const modals = {
    chatbot: document.getElementById('chatbotModal'),
    disease: document.getElementById('diseaseModal'),
    schemes: document.getElementById('schemesModal'),
    updates: document.getElementById('updatesModal')
};

// Initialize modals with animation classes
Object.values(modals).forEach(modal => {
    if (modal) {
        modal.classList.add('modal-animated');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) modalContent.classList.add('modal-content-animated');
    }
});

// Enhanced close button functionality for all modals
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.onclick = (e) => {
        e.preventDefault();
        const modal = btn.closest('.modal-animated');
        if (modal) {
            modal.classList.add('modal-closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('modal-closing');
            }, 300);
        }
    };
});

// Enhanced modal close when clicking outside
window.onclick = (event) => {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) {
            modal.classList.add('modal-closing');
            setTimeout(() => {
                modal.style.display = 'none';
                modal.classList.remove('modal-closing');
            }, 300);
        }
    });
};

// Modal opening functions with enhanced animations and initialization
function openChatbot() {
    modals.chatbot.style.display = 'block';
    // Initialize chatbot if needed
    initializeChatbot();
    // Focus on input field
    setTimeout(() => {
        const input = document.getElementById('userInput');
        if (input) input.focus();
    }, 300);
}

function openDiseaseDetection() {
    modals.disease.style.display = 'block';
    // Reset the upload form
    const imagePreview = document.getElementById('imagePreview');
    const resultSection = document.getElementById('resultSection');
    if (imagePreview) imagePreview.innerHTML = '';
    if (resultSection) resultSection.querySelector('.result-content').innerHTML = '';
}

function openSchemes() {
    modals.schemes.style.display = 'block';
    // Reset form fields
    const schemeForm = document.getElementById('schemeForm');
    if (schemeForm) schemeForm.reset();
    // Load available schemes
    loadAvailableSchemes();
}

function openUpdates() {
    modals.updates.style.display = 'block';
    // Initialize weather and market updates
    initWeatherMarket();
    // Focus on location search
    setTimeout(() => {
        const locationSearch = document.getElementById('locationSearch');
        if (locationSearch) locationSearch.focus();
    }, 300);
}

function searchSchemes() {
    const location = document.getElementById('location').value;
    const landSize = document.getElementById('landSize').value;
    const cropType = document.getElementById('cropType').value;
    const state = document.getElementById('state').value;

    // Show loading state
    const resultDiv = document.getElementById('schemesResult');
    resultDiv.innerHTML = '<div class="loading-spinner"></div>';

    // Example response based on input criteria
    const schemes = getEligibleSchemes(state, landSize, cropType);
    displaySchemes(schemes);
}

function getEligibleSchemes(state, landSize, cropType) {
    // This is a simplified example. In a real application, this would fetch from a database
    const allSchemes = {
        'PM-KISAN': {
            name: 'PM-KISAN',
            description: 'Direct income support of ₹6000 per year',
            eligibility: 'Small and marginal farmers with less than 2 hectares of land',
            benefits: '₹6000 per year in three equal installments',
            documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details']
        },
        'Soil Health Card': {
            name: 'Soil Health Card Scheme',
            description: 'Free soil testing and recommendations',
            eligibility: 'All farmers',
            benefits: 'Free soil testing and crop-specific recommendations',
            documents: ['Aadhaar Card', 'Land Records']
        },
        'PMFBY': {
            name: 'Pradhan Mantri Fasal Bima Yojana',
            description: 'Crop insurance scheme',
            eligibility: 'All farmers growing notified crops',
            benefits: 'Insurance coverage and financial support in case of crop failure',
            documents: ['Aadhaar Card', 'Land Records', 'Bank Account Details']
        }
    };

    // Filter schemes based on criteria
    return Object.values(allSchemes).filter(scheme => {
        if (landSize > 5 && scheme.name === 'PM-KISAN') return false;
        return true;
    });
}

function displaySchemes(schemes) {
    const resultDiv = document.getElementById('schemesResult');
    resultDiv.innerHTML = schemes.map(scheme => `
        <div class="scheme-item">
            <h3>${scheme.name}</h3>
            <p>${scheme.description}</p>
            <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
            <p><strong>Benefits:</strong> ${scheme.benefits}</p>
            <p><strong>Required Documents:</strong></p>
            <ul>
                ${scheme.documents.map(doc => `<li>${doc}</li>`).join('')}
            </ul>
            <button onclick="applyForScheme('${scheme.name}')">Apply Now</button>
        </div>
    `).join('');
}

function openUpdates() {
    modals.updates.style.display = 'block';
    fetchWeatherData();
    fetchMarketData();
}

async function fetchWeatherData() {
    const weatherDiv = document.getElementById('weatherData');
    weatherDiv.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        
        weatherDiv.innerHTML = `
            <div class="weather-card">
                <div class="weather-info">
                    <h4>Today's Weather</h4>
                    <p>Temperature: ${data.temperature}°C</p>
                    <p>Humidity: ${data.humidity}%</p>
                    <p>Precipitation: ${data.precipitation}%</p>
                    <p>Wind Speed: ${data.windSpeed} km/h</p>
                </div>
                <div class="weather-forecast">
                    <h4>5-Day Forecast</h4>
                    ${data.forecast.map(day => `
                        <div class="forecast-day">
                            <p>${day.date}</p>
                            <p>${day.temperature}°C</p>
                            <p>${day.condition}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        weatherDiv.innerHTML = '<p class="error-message">Failed to load weather data. Please try again later.</p>';
    }
}

async function fetchMarketData() {
    const marketDiv = document.getElementById('marketData');
    marketDiv.innerHTML = '<div class="loading-spinner"></div>';

    try {
        const response = await fetch('/api/market-prices');
        const data = await response.json();
        
        marketDiv.innerHTML = `
            <div class="market-prices">
                <div class="price-filters">
                    <select id="cropFilter" onchange="filterMarketData()">
                        <option value="all">All Crops</option>
                        ${data.crops.map(crop => `
                            <option value="${crop.toLowerCase()}">${crop}</option>
                        `).join('')}
                    </select>
                    <select id="marketFilter" onchange="filterMarketData()">
                        <option value="all">All Markets</option>
                        ${data.markets.map(market => `
                            <option value="${market.toLowerCase()}">${market}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="price-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Crop</th>
                                <th>Market</th>
                                <th>Price (₹/Quintal)</th>
                                <th>Price Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.prices.map(price => `
                                <tr class="price-row" data-crop="${price.crop.toLowerCase()}" data-market="${price.market.toLowerCase()}">
                                    <td>${price.crop}</td>
                                    <td>${price.market}</td>
                                    <td>₹${price.price}</td>
                                    <td class="${price.trend.toLowerCase()}">${price.trend}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } catch (error) {
        marketDiv.innerHTML = '<p class="error-message">Failed to load market data. Please try again later.</p>';
    }
}

function filterMarketData() {
    const cropFilter = document.getElementById('cropFilter').value;
    const marketFilter = document.getElementById('marketFilter').value;
    const rows = document.querySelectorAll('.price-row');

    rows.forEach(row => {
        const crop = row.dataset.crop;
        const market = row.dataset.market;
        const showCrop = cropFilter === 'all' || crop === cropFilter;
        const showMarket = marketFilter === 'all' || market === marketFilter;
        row.style.display = showCrop && showMarket ? '' : 'none';
    });
}

// Chatbot functionality
let chatMessages = document.getElementById('chatMessages');
let userInput = document.getElementById('userInput');

async function sendMessage() {
    if (!userInput.value.trim()) return;

    // Add user message
    appendMessage('user', userInput.value);
    const userQuestion = userInput.value;
    userInput.value = '';

    try {
        const response = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userQuestion })
        });
        const data = await response.json();
        appendMessage('bot', data.response);
    } catch (error) {
        appendMessage('bot', 'Sorry, I encountered an error. Please try again.');
    }
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add animation class for smooth appearance
    setTimeout(() => messageDiv.classList.add('message-appear'), 100);
}

// Disease Detection functionality
async function detectDisease() {
    const fileInput = document.getElementById('imageUpload');
    const resultSection = document.getElementById('resultSection');
    const previewSection = document.getElementById('imagePreview');

    if (!fileInput.files[0]) {
        alert('Please select an image first');
        return;
    }

    // Show image preview
    const reader = new FileReader();
    reader.onload = function(e) {
        previewSection.innerHTML = `<img src="${e.target.result}" class="preview-image" alt="Crop Image">`;
    };
    reader.readAsDataURL(fileInput.files[0]);

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('language', document.getElementById('languageSelect').value);

    try {
        resultSection.innerHTML = '<p>Analyzing image...</p>';
        const response = await fetch('/api/disease', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        resultSection.innerHTML = `
            <h3>Analysis Results:</h3>
            <p>Disease: ${data.disease}</p>
            <p>Confidence: ${data.confidence}%</p>
            <h4>Treatment Suggestions:</h4>
            <p>${data.treatment}</p>
        `;
    } catch (error) {
        resultSection.innerHTML = '<p>Error analyzing image. Please try again.</p>';
    }
}

// Government Schemes functionality
document.getElementById('schemeForm').onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObj = Object.fromEntries(formData);
    const schemesResult = document.getElementById('schemesResult');

    // Check if this is a scheme search or application submission
    const isApplicationSubmission = e.submitter && e.submitter.classList.contains('submit-btn');

    if (isApplicationSubmission) {
        // Handle scheme application submission
        try {
            schemesResult.innerHTML = '<div class="loading-spinner"></div><p>Submitting application...</p>';
            
            // Get selected scheme name if any
            const selectedScheme = document.querySelector('.scheme-item.selected');
            if (selectedScheme) {
                formDataObj.schemeName = selectedScheme.querySelector('h4').textContent;
            }

            const response = await fetch('/api/schemes/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObj)
            });
            
            const data = await response.json();
            
            if (data.success) {
                schemesResult.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Application Submitted Successfully!</h3>
                        <p>Your application ID: <strong>${data.applicationId}</strong></p>
                        <p>Submission Date: ${data.submissionDate}</p>
                        <p>We will review your application and contact you soon.</p>
                        <p>Please save your application ID for future reference.</p>
                    </div>
                `;
                // Reset form
                e.target.reset();
            } else {
                throw new Error(data.error || 'Failed to submit application');
            }
        } catch (error) {
            schemesResult.innerHTML = `<p class="error-message"><i class="fas fa-exclamation-circle"></i> ${error.message || 'Error submitting application. Please try again.'}</p>`;
        }
    } else {
        // Handle scheme search
        try {
            schemesResult.innerHTML = '<div class="loading-spinner"></div><p>Searching for schemes...</p>';
            const response = await fetch('/api/schemes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObj)
            });
            const data = await response.json();
            
            if (data.schemes && data.schemes.length > 0) {
                schemesResult.innerHTML = `
                    <h3>Available Schemes:</h3>
                    <p>The following schemes are available based on your details:</p>
                    <div class="schemes-list">
                        ${data.schemes.map(scheme => `
                            <div class="scheme-item" onclick="selectScheme(this)">
                                <h4>${scheme.name}</h4>
                                <p>${scheme.description}</p>
                                <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                                <p><strong>Benefits:</strong> ${scheme.benefits}</p>
                                <a href="${scheme.link}" target="_blank" class="scheme-link">Learn More</a>
                            </div>
                        `).join('')}
                    </div>
                    <p class="selection-hint">Click on a scheme to select it for your application</p>
                `;
            } else {
                schemesResult.innerHTML = '<p>No schemes found matching your criteria. Please try different parameters.</p>';
            }
        } catch (error) {
            schemesResult.innerHTML = '<p class="error-message"><i class="fas fa-exclamation-circle"></i> Error fetching schemes. Please try again.</p>';
        }
    }
};

// Function to select a scheme
function selectScheme(element) {
    // Remove selected class from all schemes
    document.querySelectorAll('.scheme-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selected class to clicked scheme
    element.classList.add('selected');
    
    // Scroll to form
    document.getElementById('schemeForm').scrollIntoView({ behavior: 'smooth' });
}

// Weather Updates functionality
async function getWeatherUpdates() {
    const weatherData = document.getElementById('weatherData');
    const updatesContainer = document.querySelector('.updates-container');
    
    // Add location search if it doesn't exist
    if (!document.getElementById('locationSearch')) {
        const locationSearchHTML = `
            <div class="location-search">
                <h3>Enter Location for Weather & Market Updates</h3>
                <div class="location-input">
                    <input type="text" id="locationInput" placeholder="Enter city or district name">
                    <button onclick="searchLocationWeather()">Search</button>
                </div>
            </div>
        `;
        updatesContainer.insertAdjacentHTML('afterbegin', locationSearchHTML);
    }

    try {
        // Default weather data (no location)
        const response = await fetch('/api/weather');
        const data = await response.json();
        
        weatherData.innerHTML = generateWeatherHTML(data);
    } catch (error) {
        weatherData.innerHTML = '<p class="error-message"><i class="fas fa-exclamation-circle"></i> Error fetching weather data. Please try again.</p>';
    }
}

// Function to search weather by location
async function searchLocationWeather() {
    const locationInput = document.getElementById('locationInput').value.trim();
    const weatherData = document.getElementById('weatherData');
    const marketData = document.getElementById('marketData');
    
    if (!locationInput) {
        alert('Please enter a location');
        return;
    }
    
    // Show loading state
    weatherData.innerHTML = '<div class="loading-spinner"></div><p>Fetching weather data...</p>';
    marketData.innerHTML = '<div class="loading-spinner"></div><p>Fetching market data...</p>';
    
    try {
        // Fetch weather data for location
        const weatherResponse = await fetch(`/api/weather?location=${encodeURIComponent(locationInput)}`);
        const weatherData = await weatherResponse.json();
        
        // Update weather section
        document.getElementById('weatherData').innerHTML = generateWeatherHTML(weatherData);
        
        // Also update market data for the same location
        getMarketUpdates(locationInput);
    } catch (error) {
        document.getElementById('weatherData').innerHTML = '<p class="error-message"><i class="fas fa-exclamation-circle"></i> Error fetching weather data. Please try again.</p>';
    }
}

// Generate weather HTML
function generateWeatherHTML(data) {
    return `
        <div class="weather-info">
            <div class="weather-header">
                <h4>${data.location || 'Your Area'} Weather</h4>
                <div class="weather-main">
                    <div class="weather-temp">
                        <i class="fas fa-temperature-high"></i> ${data.temperature}°C
                    </div>
                    <div class="weather-conditions">
                        <p><i class="fas fa-tint"></i> Humidity: ${data.humidity}%</p>
                        <p><i class="fas fa-cloud-rain"></i> Rainfall: ${data.rainfall_probability}%</p>
                        <p><i class="fas fa-wind"></i> Wind: ${data.wind_speed} km/h</p>
                    </div>
                </div>
            </div>
            
            <h4>5-Day Forecast:</h4>
            <div class="forecast-grid">
                ${data.forecast.map(day => `
                    <div class="forecast-day">
                        <p class="forecast-date">${day.date}</p>
                        <p class="forecast-temp">${day.temperature}°C</p>
                        <p class="forecast-condition">${day.condition}</p>
                    </div>
                `).join('')}
            </div>
            
            ${data.advisory ? `
                <div class="weather-advisory">
                    <h4><i class="fas fa-info-circle"></i> Farming Advisory:</h4>
                    <ul>
                        ${data.advisory.map(advice => `<li>${advice}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
    `;
}

// Market Updates functionality
async function getMarketUpdates(location = null) {
    const marketData = document.getElementById('marketData');

    try {
        // Construct URL with location parameter if provided
        const url = location 
            ? `/api/market?location=${encodeURIComponent(location)}` 
            : '/api/market';
            
        const response = await fetch(url);
        const data = await response.json();
        
        marketData.innerHTML = generateMarketHTML(data);
    } catch (error) {
        marketData.innerHTML = '<p class="error-message"><i class="fas fa-exclamation-circle"></i> Error fetching market data. Please try again.</p>';
    }
}

// Generate market HTML
function generateMarketHTML(data) {
    return `
        <div class="market-info">
            <div class="market-header">
                <h4>${data.marketName || 'Agricultural Market'}</h4>
                <p class="market-location"><i class="fas fa-map-marker-alt"></i> ${data.location}</p>
                <p class="market-updated"><i class="fas fa-clock"></i> Last Updated: ${data.lastUpdated || new Date().toLocaleString()}</p>
            </div>
            
            <h4>Today's Crop Prices:</h4>
            <div class="crop-prices-grid">
                ${data.prices.map(crop => `
                    <div class="crop-price-card">
                        <div class="crop-name">${crop.name}</div>
                        <div class="crop-price-value">₹${crop.price}/quintal</div>
                        <div class="crop-trend ${crop.trend === 'up' ? 'trend-up' : 'trend-down'}">
                            <i class="fas fa-${crop.trend === 'up' ? 'arrow-up' : 'arrow-down'}"></i> ${crop.change}%
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="market-tips">
                <h4><i class="fas fa-lightbulb"></i> Market Tips:</h4>
                <ul>
                    <li>Consider ${getHighestPriceCrop(data.prices).name} cultivation as prices are currently high (₹${getHighestPriceCrop(data.prices).price}/quintal)</li>
                    <li>Monitor price trends before making major selling decisions</li>
                    <li>Check government MSP (Minimum Support Price) for better price comparison</li>
                </ul>
            </div>
        </div>
    `;
}

// Helper function to get highest price crop
function getHighestPriceCrop(prices) {
    return prices.reduce((max, crop) => crop.price > max.price ? crop : max, prices[0]);
}

// Language Translation
document.getElementById('languageSelect').onchange = async (e) => {
    const lang = e.target.value;
    try {
        const response = await fetch(`/api/translate?lang=${lang}`);
        const translations = await response.json();
        updatePageContent(translations);
    } catch (error) {
        console.error('Error changing language:', error);
    }
};

function updatePageContent(translations) {
    // Update all translatable content on the page
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
            element.textContent = translations[key];
        }
    });
}