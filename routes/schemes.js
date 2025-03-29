const express = require('express');
const router = express.Router();

// Mock database of government schemes
const governmentSchemes = [
    {
        name: 'PM-KISAN',
        description: 'Direct income support of ₹6000 per year to farmer families',
        eligibility: 'Small and marginal farmers with cultivable land up to 2 hectares',
        benefits: '₹6000 annually in three installments',
        link: 'https://pmkisan.gov.in'
    },
    {
        name: 'Soil Health Card Scheme',
        description: 'Provides information on soil health and fertilizer recommendations',
        eligibility: 'All farmers with agricultural land',
        benefits: 'Free soil testing and fertilizer recommendations',
        link: 'https://soilhealth.dac.gov.in'
    },
    {
        name: 'Pradhan Mantri Fasal Bima Yojana',
        description: 'Crop insurance scheme to protect against natural calamities',
        eligibility: 'All farmers growing notified crops',
        benefits: 'Insurance coverage and financial support',
        link: 'https://pmfby.gov.in'
    },
    {
        name: 'Kisan Credit Card',
        description: 'Provides credit support to farmers for agriculture and allied activities',
        eligibility: 'All farmers, tenant farmers, and share croppers',
        benefits: 'Easy access to credit at lower interest rates',
        link: 'https://www.nabard.org/content.aspx?id=591'
    }
];

// Function to filter schemes based on farmer details
function getEligibleSchemes(location, landSize, cropType, state) {
    // In a real implementation, this would query a database and apply complex eligibility rules
    // For now, we'll return all schemes with a mock relevance check
    return governmentSchemes.filter(scheme => {
        // Mock eligibility check based on land size and location
        if (landSize <= 5) { // Small farmer
            return true;
        } else if (landSize <= 10) { // Medium farmer
            return scheme.name !== 'PM-KISAN'; // Exclude certain schemes for larger farmers
        } else { // Large farmer
            return scheme.name === 'Pradhan Mantri Fasal Bima Yojana' || 
                   scheme.name === 'Soil Health Card Scheme';
        }
    });
}

// Schemes endpoint
router.post('/', async (req, res) => {
    try {
        const { location, landSize, cropType, state, district } = req.body;

        // Validate input
        if (!location || !landSize || !cropType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get eligible schemes
        const eligibleSchemes = getEligibleSchemes(location, landSize, cropType, state);

        res.json({ schemes: eligibleSchemes });
    } catch (error) {
        console.error('Schemes API Error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// Scheme application endpoint
router.post('/apply', async (req, res) => {
    try {
        const { 
            farmerName, 
            aadhaar, 
            phone, 
            location, 
            district, 
            state, 
            landSize, 
            cropType, 
            schemeName,
            accountName,
            accountNumber,
            ifscCode
        } = req.body;

        // Validate input
        if (!farmerName || !aadhaar || !phone || !accountNumber || !ifscCode) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // In a real implementation, this would save the application to a database
        // For now, we'll just return a success message
        
        res.json({ 
            success: true, 
            message: 'Application submitted successfully', 
            applicationId: 'APP' + Math.floor(Math.random() * 1000000),
            submissionDate: new Date().toISOString().split('T')[0]
        });
    } catch (error) {
        console.error('Scheme Application Error:', error);
        res.status(500).json({ error: 'Failed to process application' });
    }
});

module.exports = router;