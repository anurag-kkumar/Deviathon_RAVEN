import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, User, Menu, X, Sun, Moon, LogOut, Settings, CheckCircle, MessageSquare, UserPlus, XCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ darkMode, setDarkMode, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notifications data - replace with actual API calls
  const mockNotifications = [
    {
      id: 1,
      type: 'acceptance',
      title: 'Influencer Request Accepted',
      message: 'Sarah Johnson accepted your collaboration request',
      influencerName: 'Sarah Johnson',
      campaign: 'Summer Collection 2024',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
      actionUrl: '/outreach'
    },
    {
      id: 2,
      type: 'collaboration',
      title: 'New Collaboration Request',
      message: 'Mike Chen wants to collaborate with your brand',
      influencerName: 'Mike Chen',
      campaign: 'Tech Gadgets Review',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      actionUrl: '/influencers'
    },
    {
      id: 3,
      type: 'acceptance',
      title: 'Influencer Request Accepted',
      message: 'Emma Davis accepted your outreach campaign',
      influencerName: 'Emma Davis',
      campaign: 'Beauty Product Launch',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: true,
      actionUrl: '/outreach'
    },
    {
      id: 4,
      type: 'collaboration',
      title: 'Collaboration Proposal',
      message: 'Alex Rodriguez sent a collaboration proposal',
      influencerName: 'Alex Rodriguez',
      campaign: 'Fitness Equipment',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      actionUrl: '/influencers'
    }
  ];

  useEffect(() => {
    // Simulate fetching notifications from API
    setNotifications(mockNotifications);
    updateUnreadCount(mockNotifications);
    
    // Set up real-time updates (WebSocket or polling)
    const interval = setInterval(() => {
      // In real app, this would be WebSocket or API poll
      simulateNewNotification();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const simulateNewNotification = () => {
    // Simulate random new notifications for demo
    if (Math.random() > 0.7) { // 30% chance
      const newNotification = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'acceptance' : 'collaboration',
        title: Math.random() > 0.5 ? 'Influencer Request Accepted' : 'New Collaboration Request',
        message: `New ${Math.random() > 0.5 ? 'acceptance' : 'collaboration'} from influencer`,
        influencerName: 'New Influencer',
        campaign: 'New Campaign',
        timestamp: new Date(),
        read: false,
        actionUrl: Math.random() > 0.5 ? '/outreach' : '/influencers'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      updateUnreadCount([newNotification, ...notifications]);
    }
  };

  const updateUnreadCount = (notifs) => {
    const unread = notifs.filter(notification => !notification.read).length;
    setUnreadCount(unread);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      // Mark all as read when opening notifications
      markAllAsRead();
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setIsNotificationsOpen(false);
    navigate(notification.actionUrl);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'acceptance':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'collaboration':
        return <UserPlus className="w-4 h-4 text-blue-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-purple-500" />;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Influencers', path: '/influencers' },
    { name: 'Outreach', path: '/outreach' },
    { name: 'Analytics', path: '/analytics' }
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      onLogout();
      navigate('/login');
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center" style={{ borderRadius: '25%' }}>
              <img src="https://i.postimg.cc/9QK2sdm4/Whats-App-Image-2025-10-09-at-22-04-35-d755a2a6.jpg" alt="Logo" className="w-13 h-13 object-cover border-2 border-white" style={{ borderRadius: '25%' }} />
            </div>
            <span className="text-2xl font-bold text-gray-500">
              RAVEN
            </span>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(item.path)}
                className={`font-medium transition-colors ${
                  isActiveRoute(item.path)
                    ? 'text-purple-600 dark:text-purple-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleNotifications}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-semibold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  </motion.span>
                )}
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
                    >
                      {/* Notifications Header */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Notifications
                        </h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>

                      {/* Notifications List */}
                      <div className="overflow-y-auto max-h-80">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(243, 244, 246, 0.5)' }}
                              onClick={() => handleNotificationClick(notification)}
                              className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                                !notification.read ? 'bg-purple-50 dark:bg-purple-900/20' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                {getNotificationIcon(notification.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                      {notification.title}
                                    </p>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                      {getTimeAgo(notification.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                                    <span>Campaign: {notification.campaign}</span>
                                    <span>•</span>
                                    <span>{notification.influencerName}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>

                      {/* Notifications Footer */}
                      {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
                          <button
                            onClick={() => navigate('/notifications')}
                            className="w-full text-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                          >
                            View all notifications
                          </button>
                        </div>
                      )}
                    </motion.div>

                    {/* Overlay for notifications dropdown */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsNotificationsOpen(false)}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {getUserInitials()}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-gray-900 dark:text-white font-medium block text-sm">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {user?.company || 'Company'}
                  </span>
                </div>
              </motion.div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 z-50"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {user?.company || 'Company Name'}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                      onClick={() => {
                        navigate('/settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 10 }}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-2 font-medium transition-colors ${
                    isActiveRoute(item.path)
                      ? 'text-purple-600 dark:text-purple-400 font-semibold'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Mobile Notifications */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border ${
                        !notification.read 
                          ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' 
                          : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mobile User Info */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {getUserInitials()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.company || 'Company'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Overlay for dropdowns */}
      {(isProfileOpen || isNotificationsOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsProfileOpen(false);
            setIsNotificationsOpen(false);
          }}
        />
      )}
    </motion.header>
  );
};

export default Header;
