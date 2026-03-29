# 🚀 Quick Start Guide - AI Chatbot

## Get Started in 5 Minutes!

### Step 1: Prerequisites
Make sure you have:
- ✅ Node.js installed
- ✅ MongoDB running (or Atlas account)
- ✅ OpenAI API key

### Step 2: Backend Setup
\`\`\`bash
cd backend
npm install
cp .env.example .env
# Edit .env file and add your:
# - MONGODB_URI
# - JWT_SECRET (any random string)
# - OPENAI_API_KEY
npm run dev
\`\`\`

### Step 3: Frontend Setup
\`\`\`bash
# In a new terminal
cd frontend
npm install
npm run dev
\`\`\`

### Step 4: Use the App
1. Open http://localhost:5173
2. Click "Sign Up"
3. Create an account
4. Start chatting! 🎉

## What You Get

✨ **Features:**
- User authentication (signup/login)
- AI-powered conversations
- Chat history saved automatically
- Search through your chats
- Beautiful dark theme UI
- Mobile responsive
- Real-time typing indicators

🛠️ **Tech Stack:**
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **AI:** OpenAI GPT-3.5 or Google Gemini

## File Structure

\`\`\`
ai-chatbot-mern/
├── backend/          # Node.js server
│   ├── controllers/  # Business logic
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   └── server.js     # Entry point
├── frontend/         # React app
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       └── context/     # Global state
└── Documentation files
\`\`\`

## Need Help?

📖 **Documentation:**
- README.md - Complete overview
- SETUP_GUIDE.md - Detailed setup instructions
- API_DOCS.md - API reference

❓ **Troubleshooting:**
- MongoDB not connecting? Check your connection string
- AI not responding? Verify your API key
- Port in use? Change PORT in .env

## Next Steps

1. ✅ Test all features
2. 🎨 Customize the UI colors
3. 🚀 Deploy to production
4. 📱 Add more features

---

**Made with MERN Stack** 💚

Happy Coding! 🎉
