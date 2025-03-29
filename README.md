# AgriBot - Smart Farming Solutions

AgriBot is a comprehensive web application that provides smart farming solutions powered by AI technology. It offers various features to help farmers make informed decisions and access essential agricultural services.

## Features

### 1. AI-Powered Chatbot
- Get instant answers to farming-related questions
- Expert guidance on pest control, soil health, and irrigation
- Real-time AI-driven responses for crop selection

### 2. Crop Disease Detection
- Upload images of affected crops
- AI-powered image recognition for disease detection
- Get treatment recommendations and preventive measures

### 3. Government Schemes
- Find eligible farming schemes and subsidies
- Personalized recommendations based on location and farm size
- Access to loans, grants, and support programs

### 4. Weather & Market Updates
- Daily weather forecasts and rainfall predictions
- Real-time crop price updates
- Market trends and agricultural news

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   PORT=3000
   ```
4. Start the server:
   ```bash
   npm start
   ```

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB
- AI Integration: OpenAI API
- Image Processing: Multer

## Features Overview

- Modern, responsive UI with green theme
- Multi-language support
- Real-time data processing
- Secure file handling and data storage
- Interactive modals for service access

## Development

To run in development mode with auto-reload:
```bash
npm run dev
```

## License

MIT License