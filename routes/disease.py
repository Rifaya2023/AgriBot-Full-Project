from flask import Blueprint, request, jsonify
import numpy as np
from PIL import Image
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
import tensorflow as tf

disease_bp = Blueprint('disease', __name__)

# Initialize the model and scaler
model = MobileNetV2(weights='imagenet', include_top=False)
scaler = StandardScaler()

# Disease information in multiple languages
disease_info = {
    'en': {
        'Rice Blast': {
            'description': 'A devastating fungal disease affecting rice crops worldwide',
            'symptoms': ['Diamond-shaped lesions with dark borders', 'White to grayish centers on leaves', 'Infected nodes turn blackish', 'Panicle neck shows brown lesions'],
            'treatment': ['Use resistant rice varieties', 'Apply systemic fungicides', 'Maintain proper spacing between plants', 'Avoid excess nitrogen fertilization', 'Improve field drainage']
        },
        'Bacterial Leaf Streak': {
            'description': 'A bacterial disease causing significant yield losses in rice',
            'symptoms': ['Long, narrow dark brown to black lesions', 'Yellow halos around lesions', 'Translucent leaf streaks', 'Lesions merge as disease progresses'],
            'treatment': ['Use disease-free seeds', 'Rotate crops with non-host plants', 'Apply copper-based bactericides', 'Maintain proper field sanitation', 'Avoid overhead irrigation']
        },
        'Bacterial Leaf Blight': {
            'description': 'A serious bacterial disease affecting rice crops',
            'symptoms': ['Yellow to white lesions along leaf veins', 'Wilting of leaves', 'Greyish spots'],
            'treatment': ['Use disease-resistant varieties', 'Apply copper-based bactericides', 'Improve field drainage']
        },
        'Brown Spot': {
            'description': 'A fungal disease affecting rice and other crops',
            'symptoms': ['Brown circular spots on leaves', 'Dark brown lesions on grains', 'Yellowing of leaves'],
            'treatment': ['Apply fungicides', 'Use balanced fertilization', 'Proper spacing between plants']
        },
        'Leaf Blast': {
            'description': 'A devastating fungal disease in rice',
            'symptoms': ['Diamond-shaped lesions', 'White to gray center spots', 'Brown margins'],
            'treatment': ['Use resistant varieties', 'Apply fungicides', 'Maintain proper water management']
        }
    },
    'ta': {
        'Rice Blast': {
            'description': 'உலகளவில் நெல் பயிர்களை பாதிக்கும் மோசமான பூஞ்சை நோய்',
            'symptoms': ['கருமை விளிம்புகளுடன் வைர வடிவ புள்ளிகள்', 'இலைகளில் வெள்ளை முதல் சாம்பல் நிற மையங்கள்', 'பாதிக்கப்பட்ட முடிச்சுகள் கருப்பாக மாறும்', 'கதிர் கழுத்தில் பழுப்பு நிற புள்ளிகள்'],
            'treatment': ['நோய் எதிர்ப்பு நெல் ரகங்களைப் பயன்படுத்துங்கள்', 'அமைப்பு பூஞ்சைக்கொல்லிகளை பயன்படுத்துங்கள்', 'செடிகளுக்கு இடையே சரியான இடைவெளியை பராமரிக்கவும்', 'அதிக நைட்ரஜன் உரமிடுவதை தவிர்க்கவும்', 'வயல் வடிகால் அமைப்பை மேம்படுத்துங்கள்']
        },
        'Bacterial Leaf Streak': {
            'description': 'நெல்லில் குறிப்பிடத்தக்க மகசூல் இழப்பை ஏற்படுத்தும் பாக்டீரியா நோய்',
            'symptoms': ['நீண்ட, குறுகிய கருமை பழுப்பு முதல் கருப்பு வரை புள்ளிகள்', 'புள்ளிகளைச் சுற்றி மஞ்சள் வளையங்கள்', 'ஒளி ஊடுருவும் இலை கோடுகள்', 'நோய் முன்னேறும்போது புள்ளிகள் இணைகின்றன'],
            'treatment': ['நோயற்ற விதைகளைப் பயன்படுத்துங்கள்', 'ஓம்புயிர் அல்லாத தாவரங்களுடன் பயிர் சுழற்சி செய்யுங்கள்', 'செம்பு அடிப்படையிலான பாக்டீரியா கொல்லிகளைப் பயன்படுத்துங்கள்', 'சரியான வயல் சுகாதாரத்தை பராமரிக்கவும்', 'மேல்நிலை நீர்ப்பாசனத்தை தவிர்க்கவும்']
        },
        'Bacterial Leaf Blight': {
            'description': 'நெல் பயிர்களை பாதிக்கும் தீவிர பாக்டீரியா நோய்',
            'symptoms': ['இலை நரம்புகளில் மஞ்சள் முதல் வெள்ளை வரை புள்ளிகள்', 'இலைகள் வாடுதல்', 'சாம்பல் நிற புள்ளிகள்'],
            'treatment': ['நோய் எதிர்ப்பு ரகங்களைப் பயன்படுத்துங்கள்', 'செம்பு அடிப்படையிலான பாக்டீரியா கொல்லிகளைப் பயன்படுத்துங்கள்', 'வயல் வடிகால் அமைப்பை மேம்படுத்துங்கள்']
        },
        'Brown Spot': {
            'description': 'நெல் மற்றும் பிற பயிர்களை பாதிக்கும் பூஞ்சை நோய்',
            'symptoms': ['இலைகளில் பழுப்பு வட்ட புள்ளிகள்', 'தானியங்களில் கருமை பழுப்பு புள்ளிகள்', 'இலைகள் மஞ்சள் நிறமாதல்'],
            'treatment': ['பூஞ்சைக்கொல்லிகளை பயன்படுத்துங்கள்', 'சமச்சீர் உரமிடுதல்', 'செடிகளுக்கு இடையே சரியான இடைவெளி']
        },
        'Leaf Blast': {
            'description': 'நெல்லில் ஏற்படும் மோசமான பூஞ்சை நோய்',
            'symptoms': ['வைர வடிவ புள்ளிகள்', 'வெள்ளை முதல் சாம்பல் நிற மைய புள்ளிகள்', 'பழுப்பு விளிம்புகள்'],
            'treatment': ['எதிர்ப்பு ரகங்களை பயன்படுத்துங்கள்', 'பூஞ்சைக்கொல்லிகளை பயன்படுத்துங்கள்', 'சரியான நீர் மேலாண்மையை பராமரிக்கவும்']
        }
    }
}

@disease_bp.route('/api/disease/predict', methods=['POST'])
def predict_disease():
    try:
        # Get language preference
        language = request.form.get('language', 'en')
        if language not in ['en', 'ta']:
            language = 'en'

        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400

        image = request.files['image']
        img = Image.open(image)
        
        # Preprocess image
        img = img.resize((224, 224))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Extract features using MobileNetV2
        features = model.predict(img_array)
        features_flat = features.reshape(1, -1)
        features_scaled = scaler.fit_transform(features_flat)

        # Simulate disease prediction (in production, use a trained classifier)
        diseases = list(disease_info[language].keys())
        probabilities = tf.nn.softmax(features_scaled[:, :len(diseases)], axis=1)
        predicted_index = np.argmax(probabilities)
        predicted_disease = diseases[predicted_index]
        confidence = float(probabilities[0][predicted_index])

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