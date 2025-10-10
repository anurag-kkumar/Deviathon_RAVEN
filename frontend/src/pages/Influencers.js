import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Instagram, Youtube, Mail } from 'lucide-react';

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    platform: 'all',
    category: 'all',
    audience: 'all',
    productType: 'all',
  });

  // Fetch mock influencers on component mount
  useEffect(() => {
    fetchInfluencers();
  }, []);

  // Fetch YouTube data when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      filterInfluencers();
      setError(null);
      return;
    }

    const fetchYouTubeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/youtube/search?q=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        const data = await response.json();
        const normalizedData = Array.isArray(data.items)
          ? data.items.map((item) => ({
              id: item.id.channelId || item.id || `channel-${Math.random().toString(36).slice(2)}`,
              title: item.snippet.title || 'Unknown Channel',
              thumbnail: item.snippet.thumbnails?.medium?.url || 'https://via.placeholder.com/150',
              category: item.snippet.categoryId || 'unknown',
              stats: {
                subscribers: parseInt(item.statistics?.subscriberCount || 0),
                views: parseInt(item.statistics?.viewCount || 0),
                videos: parseInt(item.statistics?.videoCount || 0),
                engagement_rate: item.engagementRate || 2.5, // Placeholder
              },
            }))
          : [];
        setFilteredInfluencers(normalizedData);
        setError(null);
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        setFilteredInfluencers([]);
        setError('Failed to fetch YouTube data. Please check if the server is running and try again.');
      }
    };

    const timeout = setTimeout(fetchYouTubeData, 600);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Fetch mock influencers
  const fetchInfluencers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/influencers');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data = await response.json();
      setInfluencers(data);
      setFilteredInfluencers(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching influencers:', error);
      const mockData = [
        {
          id: '1',
          title: 'Emma Chen',
          thumbnail: 'https://via.placeholder.com/150',
          category: 'beauty',
          platform: 'instagram',
          audience: 'women_25_40',
          productType: 'skincare',
          stats: {
            subscribers: 128000,
            views: 5000000,
            videos: 150,
            engagement_rate: 4.2,
          },
        },
        {
          id: '2',
          title: 'Mike Roberts',
          thumbnail: 'https://via.placeholder.com/150',
          category: 'technology',
          platform: 'youtube',
          audience: 'men_18_35',
          productType: 'gadgets',
          stats: {
            subscribers: 450000,
            views: 12000000,
            videos: 200,
            engagement_rate: 3.8,
          },
        },
      ];
      setInfluencers(mockData);
      setFilteredInfluencers(mockData);
      setError('Using mock data due to API failure.');
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to mock data
  const filterInfluencers = () => {
    let filtered = influencers;

    if (filters.platform !== 'all') {
      filtered = filtered.filter((influencer) => influencer.platform === filters.platform);
    }
    if (filters.category !== 'all') {
      filtered = filtered.filter((influencer) => influencer.category === filters.category);
    }
    if (filters.audience !== 'all') {
      filtered = filtered.filter((influencer) => influencer.audience === filters.audience);
    }
    if (filters.productType !== 'all') {
      filtered = filtered.filter((influencer) => influencer.productType === filters.productType);
    }

    setFilteredInfluencers(filtered);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      filterInfluencers();
    }
  }, [filters, influencers]);

  const handleOutreach = async (influencerId) => {
    try {
      const response = await fetch('http://localhost:5000/api/outreach/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ influencerId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        alert('Outreach message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending outreach:', error);
      alert('Failed to send outreach message. Please try again.');
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      beauty: 'Beauty & Skincare',
      fashion: 'Fashion',
      technology: 'Technology',
      fitness: 'Fitness',
      food: 'Food & Cooking',
      travel: 'Travel',
      lifestyle: 'Lifestyle',
      unknown: 'Unknown',
    };
    return categories[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Influencers Database
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Discover top influencers and their impact
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
          >
            Export Data
          </motion.button>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, category, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="all">All Categories</option>
              <option value="beauty">Beauty & Skincare</option>
              <option value="fashion">Fashion</option>
              <option value="technology">Technology</option>
              <option value="fitness">Fitness</option>
              <option value="food">Food & Cooking</option>
              <option value="travel">Travel</option>
              <option value="lifestyle">Lifestyle</option>
            </select>
            <select
              value={filters.audience}
              onChange={(e) => setFilters({ ...filters, audience: e.target.value })}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              <option value="all">All Audiences</option>
              <option value="women_18_25">Women 18-25</option>
              <option value="women_25_40">Women 25-40</option>
              <option value="men_18_35">Men 18-35</option>
              <option value="men_25_45">Men 25-45</option>
              <option value="teens">Teens 13-19</option>
              <option value="family">Family</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Influencer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInfluencers.length > 0 &&
            filteredInfluencers.map((channel, index) => (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/50 dark:from-purple-900/30 dark:to-indigo-900/30 opacity-50"></div>
                <div className="relative z-10">
                  <div className="flex justify-center">
                    <img
                      src={channel.thumbnail}
                      alt={channel.title}
                      className="w-24 h-24 rounded-full border-4 border-purple-200 dark:border-purple-900 object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mt-4 text-gray-900 dark:text-white truncate">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                    {getCategoryLabel(channel.category)}
                  </p>
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <div className="flex justify-between">
                      <span>Subscribers</span>
                      <span className="font-semibold">{channel.stats.subscribers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Views</span>
                      <span className="font-semibold">{channel.stats.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Videos</span>
                      <span className="font-semibold">{channel.stats.videos}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Engagement</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {channel.stats.engagement_rate}%
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOutreach(channel.id)}
                    className="mt-6 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-md"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Reach Out</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>

        {filteredInfluencers.length === 0 && !error && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No influencers found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Influencers;
