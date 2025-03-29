from flask import Blueprint, request, jsonify
from langdetect import detect

# Import chatbot data
from routes.chatbot_data import chatbotData

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/api/chatbot/query', methods=['POST'])
def handle_query():
    try:
        data = request.get_json()
        if not data or 'query' not in data:
            return jsonify({'error': 'No query provided'}), 400

        user_query = data['query']
        
        # Detect language (default to English if detection fails)
        try:
            lang = detect(user_query)
            # Map detected language to our supported languages
            lang = 'ta' if lang == 'ta' else 'en'
        except:
            lang = 'en'

        # Get response based on language
        response = get_chatbot_response(user_query, lang)
        
        return jsonify({
            'response': response,
            'language': lang
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_chatbot_response(query, lang='en'):
    # Use the chatbot data to find the best matching response
    questions = chatbotData['tamil']['questions'] if lang == 'ta' else chatbotData['questions']
    
    # Simple matching algorithm (can be enhanced with more sophisticated NLP)
    best_match = None
    highest_score = 0
    
    for qa in questions:
        score = similarity(query.lower(), qa['question'].lower())
        if score > highest_score:
            highest_score = score
            best_match = qa
    
    if best_match and highest_score > 0.3:
        return best_match['answer']
    
    # Default responses based on language
    default_responses = {
        'en': 'I apologize, but I don\'t have enough information to answer that question accurately. Please try rephrasing your question or ask something else about farming.',
        'ta': 'மன்னிக்கவும், அந்தக் கேள்விக்கு துல்லியமான பதில் அளிக்க போதுமான தகவல்கள் இல்லை. தயவுசெய்து உங்கள் கேள்வியை மாற்றி கேளுங்கள் அல்லது விவசாயம் பற்றிய வேறு கேள்விகளைக் கேளுங்கள்.'
    }
    
    return default_responses.get(lang, default_responses['en'])

def similarity(s1, s2):
    """Simple string similarity function using character-based comparison"""
    if len(s1) < len(s2):
        return similarity(s2, s1)

    if len(s2) == 0:
        return 0.0

    return (len(s1) - edit_distance(s1, s2)) / float(len(s1))

def edit_distance(s1, s2):
    """Calculate the Levenshtein distance between two strings"""
    if len(s1) < len(s2):
        return edit_distance(s2, s1)

    if len(s2) == 0:
        return len(s1)

    previous_row = range(len(s2) + 1)
    for i, c1 in enumerate(s1):
        current_row = [i + 1]
        for j, c2 in enumerate(s2):
            insertions = previous_row[j + 1] + 1
            deletions = current_row[j] + 1
            substitutions = previous_row[j] + (c1 != c2)
            current_row.append(min(insertions, deletions, substitutions))
        previous_row = current_row

    return previous_row[-1]