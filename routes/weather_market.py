from flask import Blueprint, request, jsonify
import requests
from datetime import datetime, timedelta
import random

weather_market_bp = Blueprint('weather_market', __name__)

# Simulated market prices for different crops
market_prices = {
    'rice': {'min': 15, 'max': 25},
    'wheat': {'min': 20, 'max': 30},
    'cotton': {'min': 50, 'max': 70},
    'sugarcane': {'min': 25, 'max': 35},
    'pulses': {'min': 40, 'max': 60},
    'vegetables': {'min': 20, 'max': 40},
    'fruits': {'min': 30, 'max': 50}
}

# Tamil translations for market updates
tamil_translations = {
    'market_update': 'சந்தை புதுப்பிப்புகள்',
    'price_range': 'விலை வரம்பு',
    'current_price': 'தற்போதைய விலை',
    'trend': 'போக்கு',
    'increasing': 'அதிகரித்து வருகிறது',
    'decreasing': 'குறைந்து வருகிறது',
    'stable': 'நிலையானது',
    'per_kg': 'கிலோ',
    'weather_forecast': 'வானிலை முன்னறிவிப்பு',
    'temperature': 'வெப்பநிலை',
    'humidity': 'ஈரப்பதம்',
    'rainfall': 'மழைப்பொழிவு',
    'wind': 'காற்று வேகம்'
}

@weather_market_bp.route('/api/weather/location', methods=['POST'])
def get_weather_by_location():
    try:
        data = request.get_json()
        location = data.get('location')
        language = data.get('language', 'en')

        if not location:
            return jsonify({'error': 'Location is required'}), 400

        # Simulate weather data (in real implementation, use actual weather API)
        weather_data = generate_weather_forecast()
        
        # Translate if Tamil is requested
        if language == 'ta':
            weather_data = translate_weather_data(weather_data)

        return jsonify(weather_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@weather_market_bp.route('/api/market/prices', methods=['POST'])
def get_market_prices():
    try:
        data = request.get_json()
        location = data.get('location')
        language = data.get('language', 'en')

        if not location:
            return jsonify({'error': 'Location is required'}), 400

        # Generate market prices for different crops
        prices = generate_market_prices()
        
        # Translate if Tamil is requested
        if language == 'ta':
            prices = translate_market_data(prices)

        return jsonify(prices)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_weather_forecast():
    """Generate simulated weather forecast data"""
    forecast = []
    current_date = datetime.now()

    for i in range(7):  # 7-day forecast
        date = current_date + timedelta(days=i)
        forecast.append({
            'date': date.strftime('%Y-%m-%d'),
            'temperature': {
                'min': round(random.uniform(20, 25), 1),
                'max': round(random.uniform(28, 35), 1)
            },
            'humidity': round(random.uniform(60, 85), 1),
            'rainfall_probability': round(random.uniform(0, 1), 2),
            'wind_speed': round(random.uniform(5, 15), 1)
        })

    return {
        'location': 'Sample Location',  # Replace with actual location
        'forecast': forecast
    }

def generate_market_prices():
    """Generate simulated market prices for different crops"""
    prices = {}
    for crop, range_data in market_prices.items():
        current_price = round(random.uniform(range_data['min'], range_data['max']), 2)
        trend = random.choice(['increasing', 'decreasing', 'stable'])
        prices[crop] = {
            'price_range': f"₹{range_data['min']} - ₹{range_data['max']}",
            'current_price': f"₹{current_price}",
            'trend': trend
        }
    return prices

def translate_weather_data(data):
    """Translate weather data to Tamil"""
    translated = {
        'location': data['location'],
        'forecast': []
    }

    for day in data['forecast']:
        translated['forecast'].append({
            'date': day['date'],
            tamil_translations['temperature']: {
                'min': day['temperature']['min'],
                'max': day['temperature']['max']
            },
            tamil_translations['humidity']: day['humidity'],
            tamil_translations['rainfall']: day['rainfall_probability'],
            tamil_translations['wind']: day['wind_speed']
        })

    return translated

def translate_market_data(data):
    """Translate market data to Tamil"""
    translated = {}
    for crop, info in data.items():
        translated[crop] = {
            tamil_translations['price_range']: info['price_range'],
            tamil_translations['current_price']: info['current_price'],
            tamil_translations['trend']: tamil_translations[info['trend']]
        }
    return translated