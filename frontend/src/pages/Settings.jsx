import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/chat')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition"
          >
            <FaArrowLeft />
            <span>Back to Chat</span>
          </button>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-2">
            Customize your chatbot experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <div className="bg-dark-lighter rounded-xl border border-dark-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Appearance
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Current theme: Dark Mode (Default)
            </p>
            <button className="px-4 py-2 bg-dark border border-dark-light text-gray-400 rounded-lg hover:border-primary transition">
              Theme options coming soon
            </button>
          </div>

          {/* AI Settings */}
          <div className="bg-dark-lighter rounded-xl border border-dark-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              AI Settings
            </h2>
            <p className="text-gray-400 text-sm">
              AI provider and model settings are configured on the server.
            </p>
          </div>

          {/* Data & Privacy */}
          <div className="bg-dark-lighter rounded-xl border border-dark-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Data & Privacy
            </h2>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Your chats are stored securely and are only accessible by you.
              </p>
              <button className="px-4 py-2 bg-red-500/10 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/20 transition">
                Delete All Chats
              </button>
            </div>
          </div>

          {/* About */}
          <div className="bg-dark-lighter rounded-xl border border-dark-light p-6">
            <h2 className="text-xl font-semibold text-white mb-4">About</h2>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Version: 1.0.0</p>
              <p>AI Chatbot - MERN Stack Application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
