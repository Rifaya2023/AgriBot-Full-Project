// Form validation utilities
const validators = {
    username: (value) => value.length >= 3 ? '' : 'Username must be at least 3 characters',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email',
    password: (value) => value.length >= 8 ? '' : 'Password must be at least 8 characters',
    mobileNumber: (value) => /^\d{10}$/.test(value) ? '' : 'Please enter a valid 10-digit mobile number'
};

// Show loading state
function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.innerHTML = '<span class="loading-spinner"></span> Processing...';
    }
}

// Reset button state
function resetButton(buttonId, text) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        button.innerHTML = text;
    }
}

// Handle user registration with enhanced validation
async function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const mobileNumber = document.getElementById('mobileNumber').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const profilePicture = document.getElementById('profilePicture').files[0];

    // Validate all fields
    const errors = [];
    Object.entries(validators).forEach(([field, validator]) => {
        const value = eval(field);
        const error = validator(value);
        if (error) errors.push(error);
    });

    if (password !== confirmPassword) {
        errors.push('Passwords do not match!');
    }

    if (!city || !state) {
        errors.push('Please fill in all location fields');
    }

    if (errors.length > 0) {
        const messageContainer = document.getElementById('registerMessage');
        messageContainer.innerHTML = `<div class="error-message">${errors.join('<br>')}</div>`;
        return;
    }

    showLoading('registerButton');

    try {
        // Use FormData to handle file uploads
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobileNumber', mobileNumber);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('profilePicture', profilePicture);

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            const messageContainer = document.getElementById('registerMessage');
            messageContainer.innerHTML = '<div class="success-message">You are registered successfully!</div>';
            localStorage.setItem('token', data.token);
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            const messageContainer = document.getElementById('registerMessage');
            messageContainer.innerHTML = `<div class="error-message">${data.message || 'Registration failed'}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
}

// Handle user login
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
    }
}

// Check authentication status
function checkAuth() {
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');
    
    // If on admin pages, check for admin token
    if (window.location.pathname.includes('admin-') && 
        window.location.pathname !== '/admin-login.html') {
        if (!adminToken) {
            window.location.href = 'admin-login.html';
            return;
        }
    }
    
    // For regular pages, check for user token
    if (!token && !adminToken) {
        if (window.location.pathname !== '/login.html' && 
            window.location.pathname !== '/register.html' &&
            window.location.pathname !== '/admin-login.html') {
            window.location.href = 'login.html';
        }
    }
}

// Handle user logout
function handleLogout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Add authentication check on page load
window.addEventListener('load', checkAuth);