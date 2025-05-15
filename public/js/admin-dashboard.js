// Admin Dashboard JavaScript with Enhanced Features

// Show loading state in table
function showTableLoading() {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading user data...</p>
            </td>
        </tr>
    `;
}

// Fetch and display recent user registrations with enhanced error handling
async function fetchRecentUsers() {
    showTableLoading();
    try {
        const adminToken = localStorage.getItem('adminToken');
        if (!adminToken) {
            window.location.href = 'admin-login.html';
            return;
        }

        const response = await fetch('/api/auth/recent-users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch recent users');
        }

        const data = await response.json();
        displayUsers(data.users);
        updateStats(data.stats);
    } catch (error) {
        console.error('Error fetching recent users:', error);
        document.getElementById('userTableBody').innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center;">Error loading user data</td>
            </tr>
        `;
    }
}

// Display users in the table with enhanced visualization
function displayUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    
    if (!users || users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <div class="empty-icon">👥</div>
                    <p>No users registered yet</p>
                    <small>New registrations will appear here</small>
                </td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = '';
    
    users.forEach(user => {
        const registrationDate = new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const location = `${user.city}, ${user.state}`;
        
        const loginStatus = user.isLoggedIn ? '<span class="status-badge online">Online</span>' : '<span class="status-badge offline">Offline</span>';
        const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'Never';

        tableBody.innerHTML += `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.mobileNumber}</td>
                <td>${location}</td>
                <td>${loginStatus}</td>
                <td>${lastLogin}</td>
                <td>${registrationDate}</td>
                <td>
                    <button class="action-btn view-btn" onclick="viewUserDetails('${user._id}')">View</button>
                </td>
            </tr>
        `;
    });
}

// Update dashboard statistics
function updateStats(stats) {
    if (stats) {
        document.querySelector('.stat-card:nth-child(1) p').textContent = stats.totalUsers || 0;
        document.querySelector('.stat-card:nth-child(2) p').textContent = stats.newUsers || 0;
        document.querySelector('.stat-card:nth-child(3) p').textContent = stats.activeSessions || 0;
    }
}

// View user details in a modal
function viewUserDetails(userId) {
    const modal = document.createElement('div');
    modal.className = 'modal-animated';
    modal.innerHTML = `
        <div class="modal-content modal-content-animated">
            <div class="modal-header">
                <h2>User Details</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="loading-spinner"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add close functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.onclick = () => {
        modal.classList.add('modal-closing');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    // Fetch and display user details
    fetchUserDetails(userId, modal);
}

// Fetch user details from API
async function fetchUserDetails(userId, modal) {
    try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch(`/api/auth/user/${userId}`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        const user = await response.json();
        
        const modalBody = modal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="user-details">
                <img src="${user.profilePicture || '/images/default-avatar.svg'}" alt="Profile Picture" class="user-avatar">
                <div class="detail-group">
                    <label>Username</label>
                    <p>${user.username}</p>
                </div>
                <div class="detail-group">
                    <label>Email</label>
                    <p>${user.email}</p>
                </div>
                <div class="detail-group">
                    <label>Mobile</label>
                    <p>${user.mobileNumber}</p>
                </div>
                <div class="detail-group">
                    <label>Location</label>
                    <p>${user.city}, ${user.state}</p>
                </div>
                <div class="detail-group">
                    <label>Joined</label>
                    <p>${new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>
            </div>
        `;
    } catch (error) {
        modal.querySelector('.modal-body').innerHTML = `
            <div class="error-message">
                <p>Failed to load user details. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize dashboard
function initDashboard() {
    updateDate();
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken');
    const isAdmin = localStorage.getItem('isAdmin');
    
    if (!adminToken || !isAdmin) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Fetch user data
    fetchRecentUsers();
}

// Display current date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Handle admin logout
function handleLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    window.location.href = 'admin-login.html';
}

// Run initialization on page load
window.addEventListener('load', initDashboard);