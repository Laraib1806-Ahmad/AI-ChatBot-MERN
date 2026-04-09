const express = require('express');
const router = express.Router();
const {
  createChat,
  sendMessage,
  getChats,
  getChat,
  searchChats,
  deleteChat,
  updateChat,
} = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// Chat routes
router.post('/', createChat);
router.get('/', getChats);
router.get('/search', searchChats);
router.get('/:chatId', getChat);
router.put('/:chatId', updateChat);
router.delete('/:chatId', deleteChat);

// Message routes
router.post('/:chatId/messages', sendMessage);

module.exports = router;
