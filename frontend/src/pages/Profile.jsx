import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import { FaArrowLeft, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password, newPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const updateData = { name, email };
      
      if (newPassword) {
        if (newPassword.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        updateData.password = newPassword;
      }

      const data = await authAPI.updateProfile(updateData);
      updateUser(data);
      setMessage('Profile updated successfully!');
      setFormData({ ...formData, password: '', newPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-400 mt-2">
            Manage your account information
          </p>
        </div>

        {/* Profile Form */}
        <div className="bg-dark-lighter rounded-xl border border-dark-light p-8">
          {message && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500 rounded-lg text-green-500 text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password (leave blank to keep current)
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={onChange}
                  minLength="6"
                  className="w-full pl-10 pr-4 py-3 bg-dark border border-dark-light rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          {/* Account Info */}
          <div className="mt-8 pt-8 border-t border-dark-light">
            <h3 className="text-lg font-semibold text-white mb-4">
              Account Information
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">
                <span className="text-gray-500">Account created:</span>{' '}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
