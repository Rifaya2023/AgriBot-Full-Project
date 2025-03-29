const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Chatbot endpoint
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        // Create a farming-focused prompt
        const prompt = `As an agricultural expert, please provide advice on: ${message}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are an expert agricultural advisor with deep knowledge of farming practices, crop management, pest control, and sustainable agriculture."
            }, {
                role: "user",
                content: prompt
            }],
            max_tokens: 200,
            temperature: 0.7
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Chatbot API Error:', error);
        res.status(500).json({ error: 'Failed to process your query' });
    }
});

module.exports = router;