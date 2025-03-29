from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import numpy as np
from PIL import Image
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from langdetect import detect
from routes.chatbot import chatbot_bp
from routes.weather_market import weather_market_bp
from routes.disease import disease_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(chatbot_bp)
app.register_blueprint(weather_market_bp)
app.register_blueprint(disease_bp)

# Initialize ML models and scalers
disease_classifier = RandomForestClassifier(n_estimators=100, random_state=42)
weather_predictor = RandomForestClassifier(n_estimators=100, random_state=42)
scaler = StandardScaler()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Python backend is running'})

@app.route('/api/predict/disease', methods=['POST'])
def predict_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Get language preference
        language = request.form.get('language', 'en')
        if language not in ['en', 'ta']:
            language = 'en'

        image = request.files['image']
        img = Image.open(image)
        
        # Enhanced image preprocessing
        img = img.convert('RGB')  # Ensure RGB format
        img = img.resize((224, 224))  # Standard size for deep learning models
        
        # Apply image enhancement
        img_array = np.array(img)
        img_array = img_array.astype('float32') / 255.0  # Normalize
        
        # Extract features using advanced techniques
        features = disease_classifier.predict_proba([img_array.flatten()])
        
        # Disease information in multiple languages
        disease_info = {
            'en': {
                'Bacterial Blight': {
                    'description': 'A serious bacterial disease affecting crops',
                    'symptoms': ['Yellow to white lesions', 'Wilting of leaves', 'Greyish spots'],
                    'treatment': ['Use resistant varieties', 'Apply copper-based bactericides', 'Improve drainage']
                },
                'Leaf Blast': {
                    'description': 'A devastating fungal disease in crops',
                    'symptoms': ['Diamond-shaped lesions', 'White to gray spots', 'Brown margins'],
                    'treatment': ['Use resistant varieties', 'Apply fungicides', 'Proper water management']
                },
                'Brown Spot': {
                    'description': 'Common fungal disease affecting various crops',
                    'symptoms': ['Brown circular spots', 'Dark lesions', 'Yellowing leaves'],
                    'treatment': ['Balanced fertilization', 'Proper spacing', 'Fungicide application']
                },
                'Healthy': {
                    'description': 'No disease detected',
                    'symptoms': ['Normal leaf color', 'Healthy growth', 'No visible lesions'],
                    'treatment': ['Regular monitoring', 'Maintain good practices', 'Preventive care']
                }
            },
            'ta': {
                'Bacterial Blight': {
                    'description': 'பயிர்களை பாதிக்கும் தீவிர பாக்டீரியா நோய்',
                    'symptoms': ['மஞ்சள் முதல் வெள்ளை வரை புள்ளிகள்', 'இலைகள் வாடுதல்', 'சாம்பல் நிற புள்ளிகள்'],
                    'treatment': ['நோய் எதிர்ப்பு ரகங்கள்', 'செம்பு அடிப்படை மருந்துகள்', 'வடிகால் மேம்பாடு']
                },
                'Leaf Blast': {
                    'description': 'பயிர்களில் ஏற்படும் மோசமான பூஞ்சை நோய்',
                    'symptoms': ['வைர வடிவ புள்ளிகள்', 'வெள்ளை முதல் சாம்பல் புள்ளிகள்', 'பழுப்பு விளிம்புகள்'],
                    'treatment': ['நோய் எதிர்ப்பு ரகங்கள்', 'பூஞ்சைக்கொல்லிகள்', 'சரியான நீர் மேலாண்மை']
                },
                'Brown Spot': {
                    'description': 'பல்வேறு பயிர்களை பாதிக்கும் பொதுவான பூஞ்சை நோய்',
                    'symptoms': ['பழுப்பு வட்ட புள்ளிகள்', 'கருமை புள்ளிகள்', 'மஞ்சள் இலைகள்'],
                    'treatment': ['சமச்சீர் உரமிடுதல்', 'சரியான இடைவெளி', 'பூஞ்சைக்கொல்லி பயன்பாடு']
                },
                'Healthy': {
                    'description': 'நோய் எதுவும் கண்டறியப்படவில்லை',
                    'symptoms': ['சாதாரண இலை நிறம்', 'ஆரோக்கியமான வளர்ச்சி', 'புள்ளிகள் இல்லை'],
                    'treatment': ['தொடர் கண்காணிப்பு', 'நல்ல நடைமுறைகள்', 'தடுப்பு பராமரிப்பு']
                }
            }
        }
        
        # Get prediction
        diseases = list(disease_info[language].keys())
        predicted_index = np.argmax(features)
        predicted_disease = diseases[predicted_index]
        confidence = float(features[0][predicted_index])
        
        # Get disease information in requested language
        disease_data = disease_info[language][predicted_disease]
        
        return jsonify({
            'disease': predicted_disease,
            'confidence': round(confidence * 100, 2),
            'description': disease_data['description'],
            'symptoms': disease_data['symptoms'],
            'treatment': disease_data['treatment']
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather/forecast', methods=['POST'])
def weather_forecast():
    try:
        data = request.get_json()
        location = data.get('location')
        
        # Simulate weather prediction (simplified example)
        # In real implementation, use actual weather data and trained model
        temperature = np.random.normal(25, 5)
        humidity = np.random.normal(65, 10)
        rainfall_prob = np.random.beta(2, 5)
        
        # Generate recommendations based on predictions
        recommendations = []
        if temperature > 30:
            recommendations.append('Consider additional irrigation')
        if humidity > 80:
            recommendations.append('Monitor for fungal diseases')
        if rainfall_prob > 0.6:
            recommendations.append('Delay pesticide application')
        if not recommendations:
            recommendations.append('Weather conditions are favorable for normal operations')
        
        forecast = {
            'temperature': round(float(temperature), 1),
            'humidity': round(float(humidity), 1),
            'rainfall_probability': round(float(rainfall_prob), 2),
            'recommendations': recommendations
        }
        return jsonify(forecast)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PYTHON_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)