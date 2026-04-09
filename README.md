<<<<<<< HEAD
# AI-ChatBot-MERN
=======
# 🤖 MERN Stack AI Chatbot

A full-stack AI chatbot application built with MongoDB, Express.js, React, and Node.js. Features user authentication, persistent chat history, context-aware AI responses, and a modern dark-themed UI.

![AI Chatbot](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🔐 **User Authentication** - Secure signup/login with JWT
- 💬 **AI Conversations** - Context-aware responses from OpenAI/Gemini
- 📝 **Chat History** - All chats automatically saved and searchable
- 🔍 **Search Functionality** - Find chats by title or content
- 🎨 **Modern UI** - Clean, dark-themed interface inspired by ChatGPT
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Typing** - See when AI is generating responses
- 🔒 **Private & Secure** - Each user's chats are completely private

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- React Markdown for message rendering
- React Icons

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Rate limiting & CORS protection

### AI Integration
- OpenAI GPT-3.5 Turbo
- Google Gemini (alternative)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- OpenAI API Key OR Google Gemini API Key

## 🛠️ Installation & Setup

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/ai-chatbot-mern.git
cd ai-chatbot-mern
\`\`\`

### 2. Backend Setup

\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file in the backend directory:

\`\`\`env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ai-chatbot
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-chatbot

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this

# JWT Expiry
JWT_EXPIRE=7d

# AI Configuration
# For OpenAI:
OPENAI_API_KEY=your_openai_api_key_here
AI_PROVIDER=openai

# OR for Google Gemini:
# GEMINI_API_KEY=your_gemini_api_key_here
# AI_PROVIDER=gemini

# CORS Origin
CORS_ORIGIN=http://localhost:5173
\`\`\`

### 3. Frontend Setup

\`\`\`bash
cd ../frontend
npm install
\`\`\`

### 4. Start MongoDB

Make sure MongoDB is running on your system:

\`\`\`bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just use the connection string in .env
\`\`\`

### 5. Run the Application

**Terminal 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**Terminal 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

The application should now be running:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

\`\`\`
ai-chatbot-mern/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── chatController.js     # Chat & message logic
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Chat.js              # Chat schema
│   │   └── Message.js           # Message schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── chatRoutes.js        # Chat endpoints
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── TypingIndicator.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth state
│   │   ├── pages/
│   │   │   ├── Landing.jsx       # Home page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Signup page
│   │   │   ├── Chat.jsx          # Main chat interface
│   │   │   ├── Profile.jsx       # User profile
│   │   │   └── Settings.jsx      # Settings page
│   │   ├── utils/
│   │   │   └── api.js            # API helper functions
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md
\`\`\`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Chats
- `POST /api/chats` - Create new chat (Protected)
- `GET /api/chats` - Get all user chats (Protected)
- `GET /api/chats/:chatId` - Get single chat with messages (Protected)
- `GET /api/chats/search?q=query` - Search chats (Protected)
- `PUT /api/chats/:chatId` - Update chat title/pin (Protected)
- `DELETE /api/chats/:chatId` - Delete chat (Protected)
- `POST /api/chats/:chatId/messages` - Send message (Protected)

## 🎨 UI Features

### Landing Page
- Hero section with call-to-action
- Feature highlights
- Clean navigation

### Authentication
- Signup with validation
- Login with remember me option
- Secure password handling

### Chat Dashboard
- Collapsible sidebar with chat history
- Search functionality
- New chat creation
- Message typing area with auto-resize
- Real-time AI responses
- Markdown support in AI messages
- Typing indicators

### Profile & Settings
- Update name and email
- Change password
- Account information display
- Theme preferences (upcoming)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Rate limiting on API calls
- CORS configuration
- Input validation
- Secure password requirements

## 🌟 How It Works

1. **User Signs Up** → Account created with hashed password
2. **User Logs In** → JWT token generated and stored
3. **User Starts Chat** → New chat created in database
4. **User Sends Message** → Message saved to database
5. **AI Processing** → Last N messages sent to AI API for context
6. **AI Response** → Response saved and displayed to user
7. **Chat History** → All messages auto-saved for future reference

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ai-chatbot` |
| `JWT_SECRET` | Secret key for JWT | Random string |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `GEMINI_API_KEY` | Google Gemini API key | Your key |
| `AI_PROVIDER` | Which AI to use | `openai` or `gemini` |
| `CORS_ORIGIN` | Frontend URL | `http://localhost:5173` |

## 🚧 Future Enhancements

- [ ] Voice input/output
- [ ] File uploads and processing
- [ ] Export chat to PDF
- [ ] Share chat functionality
- [ ] Multi-language support
- [ ] Custom AI model selection
- [ ] Admin dashboard
- [ ] Chat folders/categories
- [ ] Message editing
- [ ] Dark/Light theme toggle

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify network connectivity for Atlas

### AI Not Responding
- Verify API key is correct
- Check AI_PROVIDER setting
- Ensure sufficient API credits
- Check console for error messages

### Authentication Issues
- Clear browser localStorage
- Verify JWT_SECRET is set
- Check token expiration

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- OpenAI for GPT-3.5 API
- Google for Gemini API
- React & Vite communities
- MongoDB team

---

**Note:** Remember to never commit your `.env` file with actual API keys. Use `.env.example` as a template.

## 📧 Support

For support, email support@example.com or open an issue in the repository.

---

Made with ❤️ using MERN Stack
>>>>>>> aae8215 (Initial commit - MERN AI Chatbot)
