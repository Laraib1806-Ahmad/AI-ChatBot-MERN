const Chat = require('../models/Chat');
const Message = require('../models/Message');
const axios = require('axios');
const { GoogleGenAI } = require('@google/genai');


// AI Service Configuration
const getAIResponse = async (messages) => {
  const provider = process.env.AI_PROVIDER || 'openai';

  if (provider === 'openai') {
    return await getOpenAIResponse(messages);
  } else if (provider === 'gemini') {
    return await getGeminiResponse(messages);
  } else if (provider === 'groq') {
    return await getGroqResponse(messages);
  } else {
    throw new Error('Invalid AI provider');
  }
};

// OpenAI API Integration
const getOpenAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
   model: 'gpt-4o-mini'  ,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};

// Groq API Integration (OpenAI-compatible)
const getGroqResponse = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};

// Google Gemini API Integration
const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const getGeminiResponse = async (messages) => {
  try {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

    const prompt = messages
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
      .join('\n');

    const result = await geminiClient.models.generateContent({
      model,
      contents: prompt,
    });
    return result.text;
  } catch (error) {
    console.error('Gemini Error:', error.message || error.toString());
    // Return a message so the user always sees *something* in the chat
    return 'Sorry, I could not reach the Gemini API right now. ' +
      'Please check your GEMINI_API_KEY and model configuration on the server.';
  }
};


// Generate chat title from first message
const generateChatTitle = (message) => {
  const maxLength = 50;
  let title = message.trim();

  if (title.length > maxLength) {
    title = title.substring(0, maxLength) + '...';
  }

  return title || 'New Chat';
};

// @desc    Create new chat
// @route   POST /api/chats
// @access  Private
const createChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Create new chat
    const chat = await Chat.create({
      userId: req.user._id,
      title: generateChatTitle(message),
    });

    // Save user message
    const userMessage = await Message.create({
      chatId: chat._id,
      sender: 'user',
      content: message,
    });

    // Get AI response
    try {
      const aiResponseText = await getAIResponse([
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.',
        },
        {
          role: 'user',
          content: message,
        },
      ]);

      // Save AI response
      const aiMessage = await Message.create({
        chatId: chat._id,
        sender: 'ai',
        content: aiResponseText,
      });

      res.status(201).json({
        chat,
        messages: [userMessage, aiMessage],
      });
    } catch (aiError) {
      // If AI fails, still return the chat with user message
      res.status(201).json({
        chat,
        messages: [userMessage],
        aiError: 'AI service temporarily unavailable',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send message to existing chat
// @route   POST /api/chats/:chatId/messages
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { chatId } = req.params;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Check if chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Save user message
    const userMessage = await Message.create({
      chatId: chat._id,
      sender: 'user',
      content: message,
    });

    // Get previous messages for context (last 10 messages)
    const previousMessages = await Message.find({ chatId: chat._id })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    // Reverse to get chronological order
    previousMessages.reverse();

    // Build context for AI
    const conversationContext = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, concise, and accurate responses.',
      },
      ...previousMessages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content,
      })),
    ];

    // Get AI response
    try {
      const aiResponseText = await getAIResponse(conversationContext);

      // Save AI response
      const aiMessage = await Message.create({
        chatId: chat._id,
        sender: 'ai',
        content: aiResponseText,
      });

      // Update chat's updatedAt
      chat.updatedAt = Date.now();
      await chat.save();

      res.status(201).json({
        userMessage,
        aiMessage,
      });
    } catch (aiError) {
      res.status(201).json({
        userMessage,
        aiError: 'AI service temporarily unavailable',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all user chats
// @route   GET /api/chats
// @access  Private
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .lean();

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single chat with messages
// @route   GET /api/chats/:chatId
// @access  Private
const getChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Check if chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Get all messages for this chat
    const messages = await Message.find({ chatId: chat._id })
      .sort({ timestamp: 1 })
      .lean();

    res.json({
      chat,
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Search chats
// @route   GET /api/chats/search?q=query
// @access  Private
const searchChats = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Search by title
    const chats = await Chat.find({
      userId: req.user._id,
      title: { $regex: q, $options: 'i' },
    })
      .sort({ updatedAt: -1 })
      .lean();

    // Also search in messages
    const messages = await Message.find({
      content: { $regex: q, $options: 'i' },
    }).distinct('chatId');

    // Get chats that have matching messages
    const messageChats = await Chat.find({
      _id: { $in: messages },
      userId: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .lean();

    // Combine and remove duplicates
    const allChats = [...chats, ...messageChats];
    const uniqueChats = Array.from(
      new Map(allChats.map((chat) => [chat._id.toString(), chat])).values()
    );

    res.json(uniqueChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete chat
// @route   DELETE /api/chats/:chatId
// @access  Private
const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Check if chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Delete all messages in this chat
    await Message.deleteMany({ chatId: chat._id });

    // Delete the chat
    await chat.deleteOne();

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update chat title
// @route   PUT /api/chats/:chatId
// @access  Private
const updateChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title, isPinned } = req.body;

    // Check if chat exists and belongs to user
    const chat = await Chat.findOne({ _id: chatId, userId: req.user._id });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    if (title) chat.title = title;
    if (typeof isPinned !== 'undefined') chat.isPinned = isPinned;

    await chat.save();

    res.json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createChat,
  sendMessage,
  getChats,
  getChat,
  searchChats,
  deleteChat,
  updateChat,
};
