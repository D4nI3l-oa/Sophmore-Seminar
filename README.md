# Sophmore-Seminar
InsureConnect 🏥
A full-stack web application helping international students find and compare affordable health insurance providers.
🎯 Overview
InsureConnect centralizes insurance provider information, allowing students to filter by price and quickly compare options instead of visiting multiple websites.
Built with: React, Node.js, Express, MongoDB, Tailwind CSS
✨ Features

Browse all insurance providers with pricing
Filter by price range (min/max)
Responsive design for all devices
Direct links to provider websites
Real-time input validation

🚀 Quick Start
Prerequisites

Node.js (v16+)
MongoDB (v5+)

Installation
bash# Clone the repository
git clone https://github.com/yourusername/insureconnect.git
cd insureconnect

# Setup backend
cd backend
npm install
echo "PORT=5000\nMONGODB_URI=mongodb://localhost:27017/insureconnect" > .env
npm start

# Seed database (in new terminal)
curl -X POST http://localhost:5000/api/seed

# Setup frontend (in new terminal)
cd frontend
npm install
npm run dev
Visit http://localhost:5173
📡 API Endpoints
bashGET    /api/providers                    # Get all providers
GET    /api/providers?minPrice=400&maxPrice=500  # Filter by price
POST   /api/providers                    # Create provider
GET    /api/providers/:id                # Get single provider
DELETE /api/providers/:id                # Delete provider
POST   /api/seed                         # Seed database (dev only)
🏗 Architecture
Three-tier design:

Frontend: React + Tailwind CSS (presentation layer)
Backend: Node.js + Express (application layer)
Database: MongoDB (data layer)

📁 Project Structure
insureconnect/
├── backend/
│   ├── server.js          # Express server & API routes
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   └── App.jsx        # Main React component
│   └── package.json
└── README.md
🗄 Database Schema
javascriptInsuranceProvider {
  provider_id: String (unique)
  name: String
  price: Number
  website_link: String
}
🔮 Future Enhancements

 Search by provider name
 Coverage type filters
 User ratings and reviews
 Save favorite providers
 Email price alerts

🛠 Tech Stack
Frontend: React 18, Tailwind CSS, Lucide Icons, Vite
Backend: Node.js, Express, MongoDB, Mongoose, CORS
Tools: Git, Postman, MongoDB Compass
📝 License
MIT License
👨‍💻 Author
Daniel Onuoha-Amaechi
Fisk University | CSCI-210-01.2025FA
