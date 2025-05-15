// Government Schemes functionality

// Initialize schemes form and search
function initSchemesForm() {
    setupFormValidation();
    setupDocumentUpload();
    loadStatesList();
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('schemesForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                submitSchemeApplication();
            }
        });
    }
}

// Validate form fields
function validateForm() {
    const requiredFields = [
        'fullName',
        'aadhaarNumber',
        'mobileNumber',
        'location',
        'district',
        'state',
        'landSize',
        'cropType',
        'bankName',
        'accountNumber',
        'ifscCode'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            markFieldAsError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Validate Aadhaar number format
    const aadhaar = document.getElementById('aadhaarNumber').value;
    if (!/^\d{12}$/.test(aadhaar)) {
        markFieldAsError(document.getElementById('aadhaarNumber'), 'Invalid Aadhaar number');
        isValid = false;
    }
    
    // Validate mobile number format
    const mobile = document.getElementById('mobileNumber').value;
    if (!/^\d{10}$/.test(mobile)) {
        markFieldAsError(document.getElementById('mobileNumber'), 'Invalid mobile number');
        isValid = false;
    }
    
    return isValid;
}

// Handle document upload
function setupDocumentUpload() {
    const uploadFields = [
        'aadhaarCard',
        'landRecords',
        'bankStatement',
        'photoId'
    ];
    
    uploadFields.forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('change', function(e) {
                handleFileUpload(e, field);
            });
        }
    });
}

// Handle file upload
function handleFileUpload(event, fieldName) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    if (!validateFile(file)) {
        event.target.value = '';
        return;
    }
    
    // Show preview or filename
    const previewDiv = document.getElementById(`${fieldName}Preview`);
    if (previewDiv) {
        previewDiv.innerHTML = `
            <div class="upload-preview">
                <span class="filename">${file.name}</span>
                <span class="filesize">${formatFileSize(file.size)}</span>
            </div>
        `;
    }
}

// Validate uploaded file
function validateFile(file) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if (file.size > maxSize) {
        showError('File size should not exceed 5MB');
        return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
        showError('Only JPG, PNG and PDF files are allowed');
        return false;
    }
    
    return true;
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Load states list
function loadStatesList() {
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
    
    const stateSelect = document.getElementById('state');
    if (stateSelect) {
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
}

// Submit scheme application
function submitSchemeApplication() {
    const formData = new FormData(document.getElementById('schemesForm'));
    
    // Show loading state
    const submitBtn = document.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Simulate API call
    setTimeout(() => {
        showSuccess('Application submitted successfully!');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        document.getElementById('schemesForm').reset();
    }, 2000);
}

// Search available schemes
function searchSchemes() {
    const state = document.getElementById('schemeState').value;
    const landSize = document.getElementById('schemeLandSize').value;
    const cropType = document.getElementById('schemeCropType').value;
    
    // Show loading state
    const resultDiv = document.getElementById('searchResults');
    resultDiv.innerHTML = '<div class="loading-spinner"></div>';
    
    // Simulate API call
    setTimeout(() => {
        const schemes = getEligibleSchemes(state, landSize, cropType);
        displaySearchResults(schemes);
    }, 1500);
}

// Display search results
function displaySearchResults(schemes) {
    const resultDiv = document.getElementById('searchResults');
    
    if (schemes.length === 0) {
        resultDiv.innerHTML = '<p class="no-results">No schemes found matching your criteria</p>';
        return;
    }
    
    resultDiv.innerHTML = schemes.map(scheme => `
        <div class="scheme-card">
            <h3>${scheme.name}</h3>
            <p class="description">${scheme.description}</p>
            <div class="scheme-details">
                <h4>Eligibility:</h4>
                <p>${scheme.eligibility}</p>
                <h4>Benefits:</h4>
                <p>${scheme.benefits}</p>
                <h4>Required Documents:</h4>
                <ul>
                    ${scheme.documents.map(doc => `<li>${doc}</li>`).join('')}
                </ul>
            </div>
            <button onclick="applyForScheme('${scheme.name}')" class="apply-btn">Apply Now</button>
        </div>
    `).join('');
}

// Apply for specific scheme
function applyForScheme(schemeName) {
    // Scroll to application form
    document.getElementById('applicationForm').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill scheme name if field exists
    const schemeInput = document.getElementById('schemeName');
    if (schemeInput) {
        schemeInput.value = schemeName;
    }
}

// Utility functions
function showError(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger';
    alertDiv.textContent = message;
    document.getElementById('alertContainer').appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

function showSuccess(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.textContent = message;
    document.getElementById('alertContainer').appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

function markFieldAsError(field, message) {
    field.classList.add('is-invalid');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
        errorDiv.textContent = message;
    } else {
        const div = document.createElement('div');
        div.className = 'invalid-feedback';
        div.textContent = message;
        field.parentNode.insertBefore(div, field.nextSibling);
    }
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
        errorDiv.textContent = '';
    }
}

// Initialize when modal opens
document.getElementById('schemesModal').addEventListener('shown.bs.modal', initSchemesForm);