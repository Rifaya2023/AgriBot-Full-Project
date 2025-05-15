// Chatbot functionality
let messageHistory = [];

// Initialize chatbot when the modal opens
function initChatbot() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    
    // Clear previous messages
    chatMessages.innerHTML = '';
    
    // Add welcome message
    addBotMessage('Hello! I\'m AgriBot, your farming assistant. How can I help you today?');
    
    // Setup input handler
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            handleUserInput(this.value.trim());
            this.value = '';
        }
    });
}

// Handle user input and generate response
function handleUserInput(input) {
    // Add user message to chat
    addUserMessage(input);
    
    // Find best matching question and response
    const response = findBestResponse(input);
    
    // Add bot response with typing animation
    setTimeout(() => {
        addBotMessage(response);
    }, 1000);
    
    // Scroll to bottom
    scrollToBottom();
}

// Find best matching response from chatbot data
function findBestResponse(input) {
    const userQuestion = input.toLowerCase();
    let bestMatch = {
        question: '',
        answer: 'I\'m sorry, I don\'t have specific information about that. Please try asking about common farming practices, soil management, pest control, or crop diseases.',
        score: 0
    };
    
    chatbotData.questions.forEach(qa => {
        const score = calculateSimilarity(userQuestion, qa.question.toLowerCase());
        if (score > bestMatch.score) {
            bestMatch = { ...qa, score };
        }
    });
    
    return bestMatch.answer;
}

// Calculate similarity between user input and stored questions
function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    let matches = 0;
    
    words1.forEach(word => {
        if (words2.includes(word)) matches++;
    });
    
    return matches / Math.max(words1.length, words2.length);
}

// Add user message to chat
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    messageHistory.push({ type: 'user', message });
}

// Add bot message to chat
function addBotMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bot-message';
    messageDiv.innerHTML = `
        <div class="bot-avatar">
            <img src="images/chatbot-icon.jpg" alt="AgriBot Avatar">
        </div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    messageHistory.push({ type: 'bot', message });
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize chatbot when modal opens
document.getElementById('chatbotModal').addEventListener('shown.bs.modal', initChatbot);