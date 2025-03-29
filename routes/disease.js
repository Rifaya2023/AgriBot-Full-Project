const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Mock disease detection function (replace with actual AI model integration)
function analyzeCropDisease(imageBuffer) {
    // This is a mock implementation. In production, you would:
    // 1. Use a proper AI model (e.g., TensorFlow.js, custom API)
    // 2. Process the image
    // 3. Return real analysis results
    
    const mockDiseases = [
        {
            disease: 'Leaf Blight',
            confidence: 95,
            treatment: 'Apply copper-based fungicide. Ensure proper spacing between plants for better air circulation.'
        },
        {
            disease: 'Powdery Mildew',
            confidence: 88,
            treatment: 'Apply sulfur-based fungicide. Reduce humidity around plants and avoid overhead watering.'
        },
        {
            disease: 'Bacterial Spot',
            confidence: 92,
            treatment: 'Remove infected leaves. Apply copper-based bactericide. Improve air circulation.'
        }
    ];

    return mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
}

// Disease detection endpoint
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file uploaded' });
        }

        // Process the image and get disease analysis
        const result = analyzeCropDisease(req.file.buffer);

        res.json(result);
    } catch (error) {
        console.error('Disease Detection Error:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

module.exports = router;