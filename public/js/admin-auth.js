// Handle admin login
async function handleAdminLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageContainer = document.getElementById('loginMessage');

    try {
        const response = await fetch('/api/auth/admin-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageContainer.innerHTML = '<div class="success-message">Login successful!</div>';
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('isAdmin', true);
            
            // Redirect to admin dashboard after successful login
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);
        } else {
            messageContainer.innerHTML = `<div class="error-message">${data.message || 'Login failed'}</div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        messageContainer.innerHTML = '<div class="error-message">An error occurred during login</div>';
    }
}

// Check admin authentication status
function checkAdminAuth() {
    const adminToken = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('isAdmin');
    
    // If on admin pages but not authenticated as admin, redirect to admin login
    if (!adminToken || !isAdmin) {
        if (window.location.pathname.includes('admin-') && 
            window.location.pathname !== '/admin-login.html') {
            window.location.href = 'admin-login.html';
        }
    }
}

// Add admin authentication check on page load for admin pages
window.addEventListener('load', checkAdminAuth);