import ReactMarkdown from 'react-markdown';
import { FaUser, FaRobot } from 'react-icons/fa';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex items-start space-x-4 message-enter ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}
    >
      {/* Avatar */}
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
          ${isUser ? 'bg-primary' : 'bg-accent'}
        `}
      >
        {isUser ? (
          <FaUser className="text-white text-sm" />
        ) : (
          <FaRobot className="text-white text-sm" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`
          flex-1 max-w-3xl px-4 py-3 rounded-lg
          ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-dark-lighter border border-dark-light text-gray-200'
          }
        `}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="markdown-content prose prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}

        <p
          className={`text-xs mt-2 ${
            isUser ? 'text-white/70' : 'text-gray-500'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
