// Agriculture-related questions and answers for the chatbot
const chatbotData = {
    questions: [
        {
            question: 'What are the best practices for sustainable agriculture?',
            answer: 'Key sustainable agriculture practices include: 1) Crop rotation and diversification, 2) Integrated pest management, 3) Water conservation techniques, 4) Soil health management, 5) Reduced tillage, 6) Use of organic fertilizers, and 7) Agroforestry integration.'
        },
        {
            question: 'What are the best practices for organic farming?',
            answer: 'Key organic farming practices include: 1) Crop rotation to maintain soil health, 2) Natural pest control using beneficial insects, 3) Composting for natural fertilization, 4) Cover cropping to prevent soil erosion, and 5) Using organic seeds and materials.'
        },
        {
            question: 'How can I improve soil fertility naturally?',
            answer: 'Natural soil fertility can be improved by: 1) Adding organic matter through composting, 2) Growing legumes for nitrogen fixation, 3) Mulching to retain moisture and add nutrients, 4) Using green manure crops, and 5) Maintaining proper soil pH through natural amendments.'
        },
        {
            question: 'What are common signs of nutrient deficiency in crops?',
            answer: 'Common signs include: 1) Yellowing leaves (nitrogen deficiency), 2) Purple leaves (phosphorus deficiency), 3) Brown leaf edges (potassium deficiency), 4) Stunted growth, and 5) Leaf chlorosis. Regular soil testing helps identify specific deficiencies.'
        },
        {
            question: 'How do I manage water efficiently in farming?',
            answer: 'Efficient water management includes: 1) Drip irrigation systems, 2) Mulching to reduce evaporation, 3) Rainwater harvesting, 4) Proper timing of irrigation, and 5) Using drought-resistant crop varieties when appropriate.'
        },
        {
            question: 'What are effective natural pest control methods?',
            answer: 'Natural pest control methods include: 1) Companion planting, 2) Using beneficial insects like ladybugs, 3) Neem oil and other organic sprays, 4) Crop rotation to break pest cycles, and 5) Maintaining biodiversity in the farm ecosystem.'
        },
        {
            question: 'How do I prepare my field for the next growing season?',
            answer: 'Field preparation steps: 1) Remove previous crop residue, 2) Test and amend soil as needed, 3) Deep plowing or no-till based on soil conditions, 4) Add organic matter, and 5) Plan crop rotation sequence.'
        },
        {
            question: 'What are the best practices for seed selection?',
            answer: 'Consider these factors: 1) Local climate suitability, 2) Disease resistance, 3) Yield potential, 4) Market demand, and 5) Seed quality and certification. Always buy from reliable sources.'
        },
        {
            question: 'How can I prevent common crop diseases?',
            answer: 'Disease prevention strategies: 1) Use resistant varieties, 2) Maintain proper plant spacing, 3) Practice good field hygiene, 4) Monitor crops regularly, and 5) Apply appropriate fungicides when necessary.'
        },
        {
            question: 'What are sustainable farming practices?',
            answer: 'Sustainable practices include: 1) Crop rotation, 2) Minimal tillage, 3) Water conservation, 4) Integrated pest management, and 5) Using renewable energy sources. These help maintain long-term farm productivity.'
        },
        {
            question: 'How do I maximize crop yields naturally?',
            answer: 'Natural yield maximization: 1) Improve soil health, 2) Proper timing of planting and harvesting, 3) Efficient irrigation, 4) Natural pest control, and 5) Regular monitoring and maintenance of crop health.'
        }
    ],
    
    // Tamil translations
    tamil: {
        questions: [
            {
                question: 'நிலையான விவசாயத்திற்கான சிறந்த நடைமுறைகள் என்ன?',
                answer: 'முக்கிய நிலையான விவசாய நடைமுறைகள்: 1) பயிர் சுழற்சி மற்றும் பன்முகத்தன்மை, 2) ஒருங்கிணைந்த பூச்சி மேலாண்மை, 3) நீர் பாதுகாப்பு நுட்பங்கள், 4) மண் ஆரோக்கிய மேலாண்மை, 5) குறைந்த உழவு, 6) இயற்கை உரங்களின் பயன்பாடு, 7) வேளாண் காடு வளர்ப்பு ஒருங்கிணைப்பு.'
            },
            {
                question: 'பருவநிலை மாற்றத்திற்கு ஏற்ப விவசாயத்தை எவ்வாறு தகவமைக்கலாம்?',
                answer: 'பருவநிலை மாற்ற தகவமைப்பு முறைகள்: 1) வறட்சி தாங்கும் பயிர் ரகங்களைத் தேர்வு செய்தல், 2) நீர் சேமிப்பு முறைகளை பின்பற்றுதல், 3) பல்வேறு பயிர்களை சாகுபடி செய்தல், 4) மண் ஈரப்பதத்தை பாதுகாத்தல், 5) பருவநிலைக்கு ஏற்ற பயிர் காலத்தை தேர்வு செய்தல்.'
            },
            {
                question: 'இயற்கை விவசாயத்திற்கான சிறந்த நடைமுறைகள் என்ன?',
                answer: 'முக்கிய இயற்கை விவசாய நடைமுறைகள்: 1) மண் ஆரோக்கியத்திற்கு பயிர் சுழற்சி, 2) பயனுள்ள பூச்சிகளைப் பயன்படுத்தி இயற்கை பூச்சி கட்டுப்பாடு, 3) இயற்கை உரமாக்கல், 4) மண் அரிப்பைத் தடுக்க மூடுபயிர், 5) இயற்கை விதைகள் மற்றும் பொருட்களைப் பயன்படுத்துதல்.'
            },
            {
                question: 'மண் வளத்தை இயற்கையாக எப்படி மேம்படுத்துவது?',
                answer: 'இயற்கை மண் வளத்தை மேம்படுத்த: 1) கம்போஸ்ட் மூலம் கரிம பொருட்களை சேர்த்தல், 2) நைட்ரஜன் நிலைப்படுத்த பருப்பு வகைகளை வளர்த்தல், 3) ஈரப்பதத்தை தக்கவைக்க மல்ச்சிங், 4) பசுமை உர பயிர்கள், 5) இயற்கை திருத்தங்கள் மூலம் சரியான மண் pH பராமரிப்பு.'
            }
        ]
    }
};

// Enhanced answer matching with multiple language support and fuzzy matching
function getAnswer(question, language = 'en') {
    // Normalize question
    question = question.toLowerCase().trim();
    
    // Get language-specific question list
    let questionList = language === 'ta' ? chatbotData.tamil.questions : chatbotData.questions;
    
    // Find all potential matches above threshold
    const SIMILARITY_THRESHOLD = 0.3;
    let matches = questionList
        .map(q => ({
            question: q.question,
            answer: q.answer,
            score: similarity(question, q.question.toLowerCase())
        }))
        .filter(match => match.score > SIMILARITY_THRESHOLD)
        .sort((a, b) => b.score - a.score);
    
    // If we have good matches
    if (matches.length > 0) {
        // If multiple close matches, combine their answers
        if (matches.length > 1 && (matches[0].score - matches[1].score < 0.1)) {
            return `Here are some relevant answers:\n\n${matches
                .slice(0, 2)
                .map((m, i) => `${i + 1}) ${m.answer}`)
                .join('\n\n')}`;
        }
        return matches[0].answer;
    }
    
    // No good matches found
    const suggestions = questionList
        .slice(0, 3)
        .map(q => q.question)
        .join('\n- ');
    
    return `I apologize, but I don't have enough information to answer that question accurately. \n\nHere are some questions you can ask:\n- ${suggestions}`;
}

// Simple string similarity function
function similarity(s1, s2) {
    let longer = s1.length > s2.length ? s1 : s2;
    let shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 1.0;
    
    return (longer.length - editDistance(longer, shorter)) / parseFloat(longer.length);
}

// Levenshtein distance implementation
function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}