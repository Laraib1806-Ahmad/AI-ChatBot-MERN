# 🚀 Complete Setup Guide - AI Chatbot MERN Stack

This guide will walk you through setting up the AI Chatbot application from scratch.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting API Keys](#getting-api-keys)
3. [Database Setup](#database-setup)
4. [Backend Configuration](#backend-configuration)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Deployment](#deployment)

## Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **MongoDB**
   - **Option A:** Local MongoDB
     - Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
     - Or use Homebrew (Mac): `brew install mongodb-community`
   - **Option B:** MongoDB Atlas (Cloud)
     - Free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

3. **Git** (Optional)
   - Download from [git-scm.com](https://git-scm.com/)

4. **Code Editor**
   - VS Code recommended: [code.visualstudio.com](https://code.visualstudio.com/)

## Getting API Keys

### OpenAI API Key (Recommended)

1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy and save your API key (starts with `sk-`)
6. **Important:** Add payment method for API usage

### Google Gemini API Key (Alternative)

1. Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and save your API key

## Database Setup

### Option A: Local MongoDB

1. **Start MongoDB:**
   \`\`\`bash
   # Mac (with Homebrew)
   brew services start mongodb-community

   # Windows (run as Administrator)
   net start MongoDB

   # Linux
   sudo systemctl start mongod
   \`\`\`

2. **Verify MongoDB is running:**
   \`\`\`bash
   mongo --version
   \`\`\`

3. **Your connection string:**
   \`\`\`
   mongodb://localhost:27017/ai-chatbot
   \`\`\`

### Option B: MongoDB Atlas (Cloud)

1. **Create Account:**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free tier

2. **Create Cluster:**
   - Click "Build a Cluster"
   - Choose FREE tier (M0)
   - Select your region
   - Click "Create Cluster"

3. **Setup Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Grant "Read and write to any database"

4. **Setup Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP

5. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-chatbot`

## Backend Configuration

1. **Navigate to backend folder:**
   \`\`\`bash
   cd backend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Create .env file:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Or manually create `.env` file with this content:

   \`\`\`env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database - Choose one:
   # Local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/ai-chatbot
   
   # OR MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ai-chatbot

   # JWT Secret - Generate a random string
   JWT_SECRET=your_super_secret_jwt_key_12345_change_this
   JWT_EXPIRE=7d

   # AI Configuration - Choose one:
   
   # For OpenAI:
   OPENAI_API_KEY=sk-your-openai-api-key-here
   AI_PROVIDER=openai

   # OR for Google Gemini:
   # GEMINI_API_KEY=your-gemini-api-key-here
   # AI_PROVIDER=gemini

   # CORS
   CORS_ORIGIN=http://localhost:5173
   \`\`\`

4. **Generate JWT Secret:**
   \`\`\`bash
   # Run in terminal to generate random string:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   \`\`\`

5. **Test Backend:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   You should see:
   \`\`\`
   🚀 Server running on port 5000
   ✅ MongoDB Connected: localhost
   \`\`\`

## Frontend Setup

1. **Navigate to frontend folder:**
   \`\`\`bash
   cd ../frontend
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **No .env needed for frontend** (using Vite proxy)

4. **Test Frontend:**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   You should see:
   \`\`\`
   VITE v5.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   \`\`\`

## Running the Application

### Development Mode

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

### Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

## Testing

### 1. Test Backend API

\`\`\`bash
# Health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"ok","message":"AI Chatbot API is running"}
\`\`\`

### 2. Test User Registration

\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
\`\`\`

### 3. Test Frontend

1. Open http://localhost:5173
2. Click "Sign Up"
3. Create an account
4. Start chatting!

## Common Issues & Solutions

### Port Already in Use

\`\`\`bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
\`\`\`

### MongoDB Connection Error

- **Local MongoDB:** Ensure MongoDB service is running
- **Atlas:** Check username, password, and IP whitelist
- **Both:** Verify connection string format

### AI Not Responding

- Check API key is correct
- Verify AI_PROVIDER matches your API key type
- Check API credits/billing
- Look at backend console for error messages

### Cannot Login

- Clear browser localStorage
- Check JWT_SECRET is set in .env
- Verify MongoDB is connected
- Check backend console for errors

## Production Deployment

### Backend Deployment (Example: Heroku)

\`\`\`bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Add MongoDB Atlas connection string
heroku config:set MONGODB_URI="your-atlas-connection-string"
heroku config:set JWT_SECRET="your-secret"
heroku config:set OPENAI_API_KEY="your-key"
heroku config:set AI_PROVIDER="openai"

# Deploy
git push heroku main
\`\`\`

### Frontend Deployment (Example: Vercel)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel

# Update API URL in vite.config.js to your backend URL
\`\`\`

## Security Checklist

- [ ] Never commit .env file
- [ ] Use strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS in production
- [ ] Set proper CORS_ORIGIN
- [ ] Keep API keys secure
- [ ] Use environment variables for all secrets
- [ ] Enable rate limiting
- [ ] Regular security updates

## Performance Tips

1. **MongoDB Indexing:**
   - Indexes are already set up in schemas
   - Monitor slow queries

2. **API Rate Limiting:**
   - Already configured in server.js
   - Adjust as needed

3. **Frontend Optimization:**
   - Build for production: `npm run build`
   - Enable gzip compression
   - Use CDN for static assets

## Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. 📝 Customize the UI
4. 🔧 Add custom features
5. 🚀 Deploy to production
6. 📊 Monitor and optimize

## Need Help?

- Check the main README.md
- Review error logs in backend console
- Check browser console for frontend errors
- Open an issue on GitHub

---

Happy Coding! 🎉
