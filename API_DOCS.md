# 📡 API Documentation

Complete API reference for the AI Chatbot backend.

## Base URL

\`\`\`
http://localhost:5000/api
\`\`\`

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:

\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## Auth Endpoints

### 1. Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
\`\`\`

**Success Response (201):**
\`\`\`json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
\`\`\`

**Error Response (400):**
\`\`\`json
{
  "message": "User already exists"
}
\`\`\`

### 2. Login

Authenticate existing user.

**Endpoint:** `POST /auth/login`

**Request Body:**
\`\`\`json
{
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
\`\`\`

**Error Response (401):**
\`\`\`json
{
  "message": "Invalid email or password"
}
\`\`\`

### 3. Get Profile

Get current user profile.

**Endpoint:** `GET /auth/profile`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "_id": "65abc123...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
\`\`\`

### 4. Update Profile

Update user profile information.

**Endpoint:** `PUT /auth/profile`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword123"
}
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "_id": "65abc123...",
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
\`\`\`

---

## Chat Endpoints

### 5. Create New Chat

Start a new chat conversation.

**Endpoint:** `POST /chats`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "message": "Hello, can you help me with React?"
}
\`\`\`

**Success Response (201):**
\`\`\`json
{
  "chat": {
    "_id": "65def456...",
    "userId": "65abc123...",
    "title": "Hello, can you help me with React?",
    "isPinned": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "messages": [
    {
      "_id": "65xyz789...",
      "chatId": "65def456...",
      "sender": "user",
      "content": "Hello, can you help me with React?",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65xyz790...",
      "chatId": "65def456...",
      "sender": "ai",
      "content": "Of course! I'd be happy to help you with React...",
      "timestamp": "2024-01-15T10:30:02.000Z"
    }
  ]
}
\`\`\`

### 6. Get All Chats

Retrieve all user's chats.

**Endpoint:** `GET /chats`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Success Response (200):**
\`\`\`json
[
  {
    "_id": "65def456...",
    "userId": "65abc123...",
    "title": "React Help",
    "isPinned": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  {
    "_id": "65def457...",
    "userId": "65abc123...",
    "title": "Python Question",
    "isPinned": true,
    "createdAt": "2024-01-14T09:20:00.000Z",
    "updatedAt": "2024-01-14T10:15:00.000Z"
  }
]
\`\`\`

### 7. Get Single Chat

Get a specific chat with all messages.

**Endpoint:** `GET /chats/:chatId`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "chat": {
    "_id": "65def456...",
    "userId": "65abc123...",
    "title": "React Help",
    "isPinned": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  },
  "messages": [
    {
      "_id": "65xyz789...",
      "chatId": "65def456...",
      "sender": "user",
      "content": "Hello, can you help me with React?",
      "timestamp": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65xyz790...",
      "chatId": "65def456...",
      "sender": "ai",
      "content": "Of course! I'd be happy to help you with React...",
      "timestamp": "2024-01-15T10:30:02.000Z"
    }
  ]
}
\`\`\`

### 8. Send Message

Send a message in an existing chat.

**Endpoint:** `POST /chats/:chatId/messages`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "message": "Can you explain React hooks?"
}
\`\`\`

**Success Response (201):**
\`\`\`json
{
  "userMessage": {
    "_id": "65xyz791...",
    "chatId": "65def456...",
    "sender": "user",
    "content": "Can you explain React hooks?",
    "timestamp": "2024-01-15T11:45:00.000Z"
  },
  "aiMessage": {
    "_id": "65xyz792...",
    "chatId": "65def456...",
    "sender": "ai",
    "content": "React hooks are functions that let you use state...",
    "timestamp": "2024-01-15T11:45:02.000Z"
  }
}
\`\`\`

### 9. Search Chats

Search for chats by title or content.

**Endpoint:** `GET /chats/search?q=query`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Query Parameters:**
- `q` (required): Search query string

**Example:** `GET /chats/search?q=react`

**Success Response (200):**
\`\`\`json
[
  {
    "_id": "65def456...",
    "userId": "65abc123...",
    "title": "React Help",
    "isPinned": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
]
\`\`\`

### 10. Update Chat

Update chat title or pin status.

**Endpoint:** `PUT /chats/:chatId`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Request Body:**
\`\`\`json
{
  "title": "React Hooks Tutorial",
  "isPinned": true
}
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "_id": "65def456...",
  "userId": "65abc123...",
  "title": "React Hooks Tutorial",
  "isPinned": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
\`\`\`

### 11. Delete Chat

Delete a chat and all its messages.

**Endpoint:** `DELETE /chats/:chatId`

**Headers:**
\`\`\`
Authorization: Bearer <token>
\`\`\`

**Success Response (200):**
\`\`\`json
{
  "message": "Chat deleted successfully"
}
\`\`\`

---

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "message": "Please fill in all fields"
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "message": "Not authorized, no token"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "message": "Chat not found"
}
\`\`\`

### 500 Server Error
\`\`\`json
{
  "message": "Server error"
}
\`\`\`

---

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Response when exceeded:**
  \`\`\`json
  {
    "message": "Too many requests from this IP, please try again later."
  }
  \`\`\`

---

## cURL Examples

### Sign Up
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
\`\`\`

### Create Chat
\`\`\`bash
curl -X POST http://localhost:5000/api/chats \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "message": "Hello AI!"
  }'
\`\`\`

### Get All Chats
\`\`\`bash
curl -X GET http://localhost:5000/api/chats \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
\`\`\`

---

## WebSocket (Future Enhancement)

Currently, the app uses HTTP polling. WebSocket support can be added for:
- Real-time message updates
- Typing indicators
- Multi-device sync

---

## Notes

1. All timestamps are in ISO 8601 format
2. JWT tokens expire after 7 days (configurable)
3. Passwords must be at least 6 characters
4. Chat titles are auto-generated from first message
5. AI responses maintain context from last 10 messages
6. Messages support Markdown formatting

---

For more details, see the main README.md and source code.
