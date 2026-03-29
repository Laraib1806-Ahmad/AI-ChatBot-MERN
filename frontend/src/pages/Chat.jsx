import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { chatAPI } from '../utils/api';
import Sidebar from '../components/Sidebar';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import TypingIndicator from '../components/TypingIndicator';
import { FaBars } from 'react-icons/fa';

const Chat = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { user } = useContext(AuthContext);

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiTyping]);

  // Fetch all chats on mount
  useEffect(() => {
    fetchChats();
  }, []);

  // Load specific chat when chatId changes
  useEffect(() => {
    if (chatId) {
      loadChat(chatId);
    } else {
      setCurrentChat(null);
      setMessages([]);
    }
  }, [chatId]);

  const fetchChats = async () => {
    try {
      const data = await chatAPI.getChats();
      setChats(data);
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  };

  const loadChat = async (id) => {
    setLoading(true);
    try {
      const data = await chatAPI.getChat(id);
      setCurrentChat(data.chat);
      setMessages(data.messages);
    } catch (error) {
      console.error('Failed to load chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async (message) => {
    setAiTyping(true);
    try {
      const data = await chatAPI.createChat(message);
      setChats([data.chat, ...chats]);
      setCurrentChat(data.chat);
      setMessages(data.messages);
      navigate(`/chat/${data.chat._id}`);
    } catch (error) {
      console.error('Failed to create chat:', error);
    } finally {
      setAiTyping(false);
    }
  };

  const handleSendMessage = async (message) => {
    if (!currentChat) {
      // Create new chat if none exists
      return handleNewChat(message);
    }

    // Add user message immediately
    const userMessage = {
      sender: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    setAiTyping(true);
    try {
      const data = await chatAPI.sendMessage(currentChat._id, message);

      // Replace the temporary user message with the saved one and add AI response (if present)
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg._id);
        const next = [];
        if (data.userMessage) next.push(data.userMessage);
        if (data.aiMessage) next.push(data.aiMessage);
        return [...filtered, ...next];
      });

      // Update chat in sidebar
      fetchChats();
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) => prev.slice(0, -1)); // Remove failed message
    } finally {
      setAiTyping(false);
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      await chatAPI.deleteChat(id);
      setChats(chats.filter((chat) => chat._id !== id));
      
      if (currentChat?._id === id) {
        setCurrentChat(null);
        setMessages([]);
        navigate('/chat');
      }
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  const handleSelectChat = (chat) => {
    navigate(`/chat/${chat._id}`);
  };

  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        chats={chats}
        currentChat={currentChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onNewChat={() => navigate('/chat')}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-dark-lighter border-b border-dark-light px-6 py-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-4 text-gray-400 hover:text-white"
          >
            <FaBars className="text-xl" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {currentChat ? currentChat.title : 'New Chat'}
            </h1>
            <p className="text-sm text-gray-400">
              {user ? `Chatting as ${user.name}` : ''}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-400">Loading chat...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Start a conversation
                </h2>
                <p className="text-gray-400">
                  Ask me anything! I'm here to help with questions, ideas, or
                  just to chat.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {aiTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <MessageInput onSend={handleSendMessage} disabled={aiTyping} />
      </div>
    </div>
  );
};

export default Chat;
