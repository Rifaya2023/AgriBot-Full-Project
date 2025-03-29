// Language translations for AgriBot
const translations = {
    en: {
        // Navigation
        home: 'Home',
        services: 'Services',
        about: 'About',
        contact: 'Contact',
        login: 'Login',
        register: 'Register',

        // Hero Section
        welcome: 'Welcome to AgriBot',
        subtitle: 'Your Smart Farming Assistant powered by AI',
        explore: 'Explore Services',

        // Services
        servicesTitle: 'Our Services',
        chatbotTitle: 'AI Chatbot',
        chatbotDesc: 'Get instant answers to your farming queries',
        startChat: 'Start Chat',
        diseaseTitle: 'Crop Disease Detection',
        diseaseDesc: 'Upload images to identify plant diseases',
        detectDisease: 'Detect Disease',
        schemesTitle: 'Government Schemes',
        schemesDesc: 'Find eligible farming schemes and subsidies',
        viewSchemes: 'View Schemes',
        weatherTitle: 'Weather & Market Updates',
        weatherDesc: 'Get daily weather and crop price updates',
        checkUpdates: 'Check Updates',

        // Forms
        fullName: 'Full Name',
        aadhaarNumber: 'Aadhaar Number',
        mobileNumber: 'Mobile Number',
        location: 'Village/Town',
        district: 'District',
        state: 'State',
        landSize: 'Land Size (in acres)',
        cropType: 'Primary Crop',
        submit: 'Submit Application',
        search: 'Search Available Schemes'
    },
    ta: {
        // Navigation
        home: 'முகப்பு',
        services: 'சேவைகள்',
        about: 'எங்களை பற்றி',
        contact: 'தொடர்பு',
        login: 'உள்நுழைய',
        register: 'பதிவு செய்ய',

        // Hero Section
        welcome: 'AgriBot-க்கு வரவேற்கிறோம்',
        subtitle: 'AI ஆல் இயங்கும் உங்கள் விவசாய உதவியாளர்',
        explore: 'சேவைகளை ஆராய',

        // Services
        servicesTitle: 'எங்கள் சேவைகள்',
        chatbotTitle: 'AI சாட்பாட்',
        chatbotDesc: 'உங்கள் விவசாய கேள்விகளுக்கு உடனடி பதில்கள்',
        startChat: 'அரட்டையைத் தொடங்கு',
        diseaseTitle: 'பயிர் நோய் கண்டறிதல்',
        diseaseDesc: 'பயிர் நோய்களை கண்டறிய படங்களை பதிவேற்றவும்',
        detectDisease: 'நோயை கண்டறிய',
        schemesTitle: 'அரசு திட்டங்கள்',
        schemesDesc: 'தகுதியான விவசாய திட்டங்கள் மற்றும் மானியங்களைக் கண்டறியவும்',
        viewSchemes: 'திட்டங்களைக் காண',
        weatherTitle: 'வானிலை & சந்தை புதுப்பிப்புகள்',
        weatherDesc: 'தினசரி வானிலை மற்றும் பயிர் விலை புதுப்பிப்புகளைப் பெறுங்கள்',
        checkUpdates: 'புதுப்பிப்புகளை சரிபார்க்கவும்',

        // Forms
        fullName: 'முழு பெயர்',
        aadhaarNumber: 'ஆதார் எண்',
        mobileNumber: 'கைபேசி எண்',
        location: 'கிராமம்/நகரம்',
        district: 'மாவட்டம்',
        state: 'மாநிலம்',
        landSize: 'நில அளவு (ஏக்கரில்)',
        cropType: 'முதன்மை பயிர்',
        submit: 'விண்ணப்பத்தை சமர்ப்பிக்கவும்',
        search: 'கிடைக்கக்கூடிய திட்டங்களைத் தேடுங்கள்'
    }
};

// Function to update page content based on selected language
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
        
        // Set initial language
        const initialLang = languageSelect.value;
        updateLanguage(initialLang);
    }
});