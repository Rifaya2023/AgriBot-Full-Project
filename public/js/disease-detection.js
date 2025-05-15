// Disease Detection functionality
let uploadedImage = null;

// Initialize disease detection modal
function initDiseaseDetection() {
    const fileInput = document.getElementById('diseaseImageUpload');
    const preview = document.getElementById('imagePreview');
    const resultSection = document.getElementById('diseaseResult');
    
    // Reset previous results
    preview.innerHTML = '';
    resultSection.innerHTML = '';
    
    // Setup file input handler
    fileInput.addEventListener('change', handleImageUpload);
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showError('Please upload an image file');
        return;
    }
    
    // Show preview
    const preview = document.getElementById('imagePreview');
    const reader = new FileReader();
    
    reader.onload = function(e) {
        preview.innerHTML = `
            <img src="${e.target.result}" alt="Uploaded crop image" class="preview-image">
            <button onclick="analyzeDisease()" class="analyze-btn">Analyze Disease</button>
        `;
        uploadedImage = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

// Analyze disease in uploaded image
function analyzeDisease() {
    if (!uploadedImage) {
        showError('Please upload an image first');
        return;
    }
    
    const resultSection = document.getElementById('diseaseResult');
    resultSection.innerHTML = '<div class="loading-spinner"></div>';
    
    // Simulate API call to disease detection service
    setTimeout(() => {
        // This is a mock response. In production, this would come from the backend API
        const mockResult = {
            disease_name: 'Leaf Blight',
            confidence: 95,
            description: 'Leaf blight is a common disease that affects various crops, causing brown spots and eventual tissue death.',
            treatment: [
                'Remove and destroy infected leaves',
                'Apply copper-based fungicide',
                'Improve air circulation between plants',
                'Avoid overhead watering'
            ],
            prevention: [
                'Use disease-resistant varieties',
                'Practice crop rotation',
                'Maintain proper plant spacing',
                'Keep the field clean of debris'
            ]
        };
        
        displayDiseaseResult(mockResult);
    }, 2000);
}

// Display disease analysis result
function displayDiseaseResult(result) {
    const resultSection = document.getElementById('diseaseResult');
    
    resultSection.innerHTML = `
        <div class="disease-info">
            <h3>${result.disease_name}</h3>
            <p class="confidence">Confidence: ${result.confidence}%</p>
            <p class="description">${result.description}</p>
            
            <div class="treatment-section">
                <h4>Treatment Guidelines:</h4>
                <ul>
                    ${result.treatment.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            
            <div class="prevention-section">
                <h4>Prevention Tips:</h4>
                <ul>
                    ${result.prevention.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
            
            <button onclick="resetDiseaseDetection()" class="reset-btn">Analyze Another Image</button>
        </div>
    `;
}

// Show error message
function showError(message) {
    const resultSection = document.getElementById('diseaseResult');
    resultSection.innerHTML = `<div class="error-message">${message}</div>`;
}

// Reset disease detection
function resetDiseaseDetection() {
    uploadedImage = null;
    document.getElementById('diseaseImageUpload').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('diseaseResult').innerHTML = '';
}

// Initialize when modal opens
document.getElementById('diseaseModal').addEventListener('shown.bs.modal', initDiseaseDetection);