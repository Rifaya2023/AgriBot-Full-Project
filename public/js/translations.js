// Language translations for AgriBot
const translations = {
    // Store the selected language in localStorage
    setLanguagePreference: function(lang) {
        localStorage.setItem('preferredLanguage', lang);
    },

    // Get the stored language preference
    getLanguagePreference: function() {
        return localStorage.getItem('preferredLanguage') || 'en';
    },

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
    },
    hi: {
        // Navigation
        home: 'होम',
        services: 'सेवाएं',
        about: 'हमारे बारे में',
        contact: 'संपर्क',
        login: 'लॉगिन',
        register: 'रजिस्टर',

        // Hero Section
        welcome: 'AgriBot में आपका स्वागत है',
        subtitle: 'AI द्वारा संचालित आपका स्मार्ट कृषि सहायक',
        explore: 'सेवाएं देखें',

        // Services
        servicesTitle: 'हमारी सेवाएं',
        chatbotTitle: 'AI चैटबॉट',
        chatbotDesc: 'अपने कृषि प्रश्नों के तुरंत उत्तर प्राप्त करें',
        startChat: 'चैट शुरू करें',
        diseaseTitle: 'फसल रोग पहचान',
        diseaseDesc: 'पौधों की बीमारियों की पहचान के लिए छवियां अपलोड करें',
        detectDisease: 'रोग का पता लगाएं',
        schemesTitle: 'सरकारी योजनाएं',
        schemesDesc: 'पात्र कृषि योजनाओं और सब्सिडी का पता लगाएं',
        viewSchemes: 'योजनाएं देखें',
        weatherTitle: 'मौसम और बाजार अपडेट',
        weatherDesc: 'दैनिक मौसम और फसल मूल्य अपडेट प्राप्त करें',
        checkUpdates: 'अपडेट देखें',

        // Forms
        fullName: 'पूरा नाम',
        aadhaarNumber: 'आधार नंबर',
        mobileNumber: 'मोबाइल नंबर',
        location: 'गांव/शहर',
        district: 'जिला',
        state: 'राज्य',
        landSize: 'भूमि का आकार (एकड़ में)',
        cropType: 'मुख्य फसल',
        submit: 'आवेदन जमा करें',
        search: 'उपलब्ध योजनाएं खोजें'
    },
    te: {
        // Navigation
        home: 'హోమ్',
        services: 'సేవలు',
        about: 'మా గురించి',
        contact: 'సంప్రదించండి',
        login: 'లాగిన్',
        register: 'రిజిస్టర్',

        // Hero Section
        welcome: 'AgriBot కి స్వాగతం',
        subtitle: 'AI ద్వారా నడిచే మీ స్మార్ట్ వ్యవసాయ సహాయకుడు',
        explore: 'సేవలను అన్వేషించండి',

        // Services
        servicesTitle: 'మా సేవలు',
        chatbotTitle: 'AI చాట్‌బాట్',
        chatbotDesc: 'మీ వ్యవసాయ ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి',
        startChat: 'చాట్ ప్రారంభించండి',
        diseaseTitle: 'పంట వ్యాధి గుర్తింపు',
        diseaseDesc: 'మొక్కల వ్యాధులను గుర్తించడానికి చిత్రాలను అప్‌లోడ్ చేయండి',
        detectDisease: 'వ్యాధిని కనుగొనండి',
        schemesTitle: 'ప్రభుత్వ పథకాలు',
        schemesDesc: 'అర్హత ఉన్న వ్యవసాయ పథకాలు మరియు సబ్సిడీలను కనుగొనండి',
        viewSchemes: 'పథకాలను వీక్షించండి',
        weatherTitle: 'వాతావరణం & మార్కెట్ నవీకరణలు',
        weatherDesc: 'రోజువారీ వాతావరణం మరియు పంట ధరల నవీకరణలను పొందండి',
        checkUpdates: 'నవీకరణలను తనిఖీ చేయండి',

        // Forms
        fullName: 'పూర్తి పేరు',
        aadhaarNumber: 'ఆధార్ నంబర్',
        mobileNumber: 'మొబైల్ నంబర్',
        location: 'గ్రామం/పట్టణం',
        district: 'జిల్లా',
        state: 'రాష్ట్రం',
        landSize: 'భూమి పరిమాణం (ఎకరాలలో)',
        cropType: 'ప్రధాన పంట',
        submit: 'దరఖాస్తును సమర్పించండి',
        search: 'అందుబాటులో ఉన్న పథకాలను శోధించండి'
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

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update language selector value
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }

    // Store the language preference
    translations.setLanguagePreference(lang);
}

// Initialize language selector
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        // Load saved language preference
        const savedLang = translations.getLanguagePreference();
        
        // Update language selector and content
        languageSelect.value = savedLang;
        updateLanguage(savedLang);

        languageSelect.addEventListener('change', (e) => {
            updateLanguage(e.target.value);
        });
    }
});