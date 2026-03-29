import { Link } from 'react-router-dom';
import { FaRobot, FaComments, FaLock, FaBolt } from 'react-icons/fa';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-lighter to-dark">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaRobot className="text-3xl text-primary" />
            <span className="text-2xl font-bold text-white">AI Chatbot</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Your Intelligent
            <span className="text-primary"> AI Assistant</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Experience the power of AI conversations. Get instant, context-aware
            responses to all your questions. Your chats, always saved and
            searchable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white text-lg rounded-lg transition transform hover:scale-105 shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          <div className="bg-dark-lighter p-6 rounded-xl border border-dark-light hover:border-primary transition">
            <FaRobot className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              AI Powered
            </h3>
            <p className="text-gray-400">
              Advanced AI technology for accurate and helpful responses
            </p>
          </div>

          <div className="bg-dark-lighter p-6 rounded-xl border border-dark-light hover:border-primary transition">
            <FaComments className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Context Aware
            </h3>
            <p className="text-gray-400">
              Maintains conversation context for natural interactions
            </p>
          </div>

          <div className="bg-dark-lighter p-6 rounded-xl border border-dark-light hover:border-primary transition">
            <FaLock className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Private & Secure
            </h3>
            <p className="text-gray-400">
              Your conversations are encrypted and stored securely
            </p>
          </div>

          <div className="bg-dark-lighter p-6 rounded-xl border border-dark-light hover:border-primary transition">
            <FaBolt className="text-4xl text-accent mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-400">
              Get instant responses with minimal latency
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-primary to-accent p-12 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start chatting?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of users having intelligent conversations
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 bg-white text-primary text-lg font-semibold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Create Free Account
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-dark-light">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 AI Chatbot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
