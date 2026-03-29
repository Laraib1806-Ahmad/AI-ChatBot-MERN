import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FaRobot,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from 'react-icons/fa';
import { chatAPI } from '../utils/api';

const Sidebar = ({
  chats,
  currentChat,
  onSelectChat,
  onDeleteChat,
  onNewChat,
  isOpen,
  onToggle,
}) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await chatAPI.searchChats(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayChats = isSearching ? searchResults : chats;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-80 bg-dark-lighter border-r border-dark-light
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-dark-light">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl text-primary" />
              <span className="text-xl font-bold text-white">AI Chatbot</span>
            </div>
            <button
              onClick={onToggle}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
          >
            <FaPlus />
            <span>New Chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-dark-light">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {displayChats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              {isSearching ? 'No chats found' : 'No chats yet'}
            </div>
          ) : (
            displayChats.map((chat) => (
              <div
                key={chat._id}
                className={`
                  group flex items-center justify-between p-3 rounded-lg cursor-pointer transition
                  ${
                    currentChat?._id === chat._id
                      ? 'bg-primary text-white'
                      : 'hover:bg-dark-light text-gray-300'
                  }
                `}
                onClick={() => {
                  onSelectChat(chat);
                  if (window.innerWidth < 1024) onToggle();
                }}
              >
                <div className="flex-1 truncate">
                  <p className="truncate font-medium">{chat.title}</p>
                  <p className="text-xs opacity-75">
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        'Are you sure you want to delete this chat?'
                      )
                    ) {
                      onDeleteChat(chat._id);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 ml-2 p-2 hover:bg-red-500/20 rounded transition"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* User Menu */}
        <div className="p-4 border-t border-dark-light space-y-2">
          <button
            onClick={() => {
              navigate('/profile');
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-light rounded-lg transition"
          >
            <FaUser />
            <span>{user?.name || 'Profile'}</span>
          </button>

          <button
            onClick={() => {
              navigate('/settings');
              if (window.innerWidth < 1024) onToggle();
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-dark-light rounded-lg transition"
          >
            <FaCog />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
