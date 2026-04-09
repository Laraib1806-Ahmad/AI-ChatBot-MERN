import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const MessageInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-dark-lighter border-t border-dark-light px-4 py-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
              disabled={disabled}
              rows="1"
              className="w-full px-4 py-3 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition resize-none max-h-32 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                minHeight: '50px',
                maxHeight: '128px',
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>

          <button
            type="submit"
            disabled={disabled || !message.trim()}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <FaPaperPlane />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI can make mistakes. Check important info.
        </p>
      </form>
    </div>
  );
};

export default MessageInput;
