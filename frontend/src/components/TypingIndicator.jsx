import { FaRobot } from 'react-icons/fa';

const TypingIndicator = () => {
  return (
    <div className="flex items-start space-x-4 message-enter">
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
        <FaRobot className="text-white text-sm" />
      </div>

      {/* Typing Animation */}
      <div className="bg-dark-lighter border border-dark-light rounded-lg px-4 py-3">
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
