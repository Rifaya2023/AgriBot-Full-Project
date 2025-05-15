const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chatbot', require('./routes/chatbot'));
app.use('/api/disease', require('./routes/disease'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/weather', require('./routes/weather'));

// Add market route
app.get('/api/market', async (req, res) => {
    try {
        // Create mock market data similar to the Python implementation
        const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Corn'];
        const prices = [];

        crops.forEach(crop => {
            prices.push({
                name: crop,
                price: Math.floor(Math.random() * (5000 - 1000) + 1000),
                trend: Math.random() > 0.5 ? 'up' : 'down',
                change: (Math.random() * 5).toFixed(2)
            });
        });

        res.json({ prices });
    } catch (error) {
        console.error('Market API Error:', error);
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

// Translation endpoint
app.get('/api/translate', (req, res) => {
    try {
        const lang = req.query.lang || 'en';
        const translations = require('./public/js/translations');
        
        if (translations[lang]) {
            res.json(translations[lang]);
        } else {
            res.json(translations.en); // Default to English
        }
    } catch (error) {
        console.error('Translation API Error:', error);
        res.status(500).json({ error: 'Failed to fetch translations' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});