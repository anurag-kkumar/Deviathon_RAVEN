import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Instagram, Youtube, Star, MessageCircle, Mail, TrendingUp } from 'lucide-react';

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    platform: 'all',
    category: 'all',
    audience: 'all',
    productType: 'all'
  });

  useEffect(() => {
    fetchInfluencers();
  }, []);

  useEffect(() => {
    filterInfluencers();
  }, [searchTerm, filters, influencers]);

  const fetchInfluencers = async () => {
    try {
      const response = await fetch('/api/influencers');
      const data = await response.json();
      setInfluencers(data);
    } catch (error) {
      console.error('Error fetching influencers:', error);
      const mockData = [
        {
          id: 1,
          name: 'Emma Chen',
          username: '@emmachen_beauty',
          platform: 'instagram',
          followers: 128000,
          engagement: 4.2,
          category: 'beauty',
          audience: 'women_25_40',
          productType: 'skincare',
          previousCollaborations: 3,
          influencedUsers: 45000,
          brandFit: 92,
          location: 'New York, USA',
          email: 'emma@example.com'
        },
        {
          id: 2,
          name: 'Mike Roberts',
          username: '@miketechreviews',
          platform: 'youtube',
          followers: 450000,
          engagement: 3.8,
          category: 'technology',
          audience: 'men_18_35',
          productType: 'gadgets',
          previousCollaborations: 2,
          influencedUsers: 125000,
          brandFit: 88,
          location: 'San Francisco, USA',
          email: 'mike@example.com'
        }
      ];
      setInfluencers(mockData);
    } finally {
      setLoading(false);
    }
  };

  const filterInfluencers = () => {
    let filtered = influencers;

    if (searchTerm) {
      filtered = filtered.filter(influencer =>
        influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        influencer.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.platform !== 'all') {
      filtered = filtered.filter(influencer => influencer.platform === filters.platform);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(influencer => influencer.category === filters.category);
    }

    if (filters.audience !== 'all') {
      filtered = filtered.filter(influencer => influencer.audience === filters.audience);
    }

    if (filters.productType !== 'all') {
      filtered = filtered.filter(influencer => influencer.productType === filters.productType);
    }

    setFilteredInfluencers(filtered);
  };

  const handleOutreach = async (influencerId) => {
    try {
      const response = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ influencerId })
      });
      const result = await response.json();
      if (result.success) {
        alert('Outreach message sent successfully!');
      }
    } catch (error) {
      console.error('Error sending outreach:', error);
      alert('Outreach message sent!');
    }
  };

  const getPlatformIcon = (platform) => {
    return platform === 'instagram' ? <Instagram className="w-4 h-4" /> : <Youtube className="w-4 h-4" />;
  };

  const getPlatformColor = (platform) => {
    return platform === 'instagram' ? 'text-pink-600' : 'text-red-600';
  };

  const getCategoryLabel = (category) => {
    const categories = {
      beauty: 'Beauty & Skincare',
      fashion: 'Fashion',
      technology: 'Technology',
      fitness: 'Fitness',
      food: 'Food & Cooking',
      travel: 'Travel',
      lifestyle: 'Lifestyle'
    };
    return categories[category] || category;
  };

  const getAudienceLabel = (audience) => {
    const audiences = {
      women_18_25: 'Women 18-25',
      women_25_40: 'Women 25-40',
      men_18_35: 'Men 18-35',
      men_25_45: 'Men 25-45',
      teens: 'Teens 13-19',
      family: 'Family'
    };
    return audiences[audience] || audience;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Influencers Database</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Discover influencers who have worked with us and their impact
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Export Data
          </motion.button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, category, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <select
              value={filters.platform}
              onChange={(e) => setFilters({...filters, platform: e.target.value})}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
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
              onChange={(e) => setFilters({...filters, audience: e.target.value})}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500"
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInfluencers.map((influencer, index) => (
            <motion.div
              key={influencer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {influencer.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {influencer.username}
                    </p>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${getPlatformColor(influencer.platform)} bg-gray-100 dark:bg-gray-700`}>
                  {getPlatformIcon(influencer.platform)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Followers</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(influencer.followers / 1000).toFixed(0)}K
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Engagement</span>
                  <span className="font-semibold text-green-600 dark:text-green-400 flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    {influencer.engagement}%
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Previous Collabs</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {influencer.previousCollaborations}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Influenced Users</span>
                  <span className="font-semibold text-purple-600 dark:text-purple-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {(influencer.influencedUsers / 1000).toFixed(0)}K
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Brand Fit</span>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {influencer.brandFit}%
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                  {getCategoryLabel(influencer.category)}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                  {getAudienceLabel(influencer.audience)}
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded">
                  {influencer.productType}
                </span>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOutreach(influencer.id)}
                  className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center space-x-1"
                >
                  <Mail className="w-4 h-4" />
                  <span>Reach Out</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No influencers found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Influencers;