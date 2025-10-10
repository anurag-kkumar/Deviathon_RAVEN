import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, MessageSquare, DollarSign, Target, Calendar, Filter, Download, Eye, BarChart3, PieChart } from 'lucide-react';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('engagement');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data);
      } else {
        throw new Error('Failed to fetch analytics');
      }
    } catch (error) {
      console.error('Using demo analytics data:', error);
      setAnalyticsData(getDemoAnalyticsData());
    } finally {
      setLoading(false);
    }
  };

  const getDemoAnalyticsData = () => ({
    overview: {
      totalCampaigns: 12,
      totalInfluencers: 45,
      totalReach: 2500000,
      totalEngagement: 125000,
      averageROI: 3.8,
      responseRate: 28.5,
      conversionRate: 12.3
    },
    campaignPerformance: [
      { name: 'Summer Launch', reach: 450000, engagement: 22500, conversions: 1250, roi: 4.2 },
      { name: 'Product Review', reach: 320000, engagement: 16000, conversions: 890, roi: 3.5 },
      { name: 'Brand Awareness', reach: 280000, engagement: 14000, conversions: 750, roi: 2.8 },
      { name: 'Holiday Campaign', reach: 510000, engagement: 25500, conversions: 1420, roi: 4.8 }
    ],
    platformBreakdown: [
      { platform: 'Instagram', campaigns: 8, reach: 1800000, engagement: 90000 },
      { platform: 'YouTube', campaigns: 4, reach: 700000, engagement: 35000 }
    ],
    engagementTrend: [
      { date: '2024-06-01', engagement: 1200, reach: 45000 },
      { date: '2024-06-08', engagement: 1800, reach: 62000 },
      { date: '2024-06-15', engagement: 2500, reach: 89000 },
      { date: '2024-06-22', engagement: 3200, reach: 112000 },
      { date: '2024-06-29', engagement: 2800, reach: 98000 }
    ],
    influencerPerformance: [
      { name: 'Emma Chen', platform: 'Instagram', engagementRate: 4.2, conversions: 450, roi: 4.5 },
      { name: 'Mike Roberts', platform: 'YouTube', engagementRate: 3.8, conversions: 320, roi: 3.9 },
      { name: 'Sarah Wilson', platform: 'Instagram', engagementRate: 5.1, conversions: 280, roi: 4.2 },
      { name: 'Alex Kumar', platform: 'YouTube', engagementRate: 3.2, conversions: 190, roi: 3.1 }
    ]
  });

  const exportAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ range: timeRange })
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics-${timeRange}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('Demo: Analytics data exported!');
      }
    } catch (error) {
      console.error('Error exporting analytics:', error);
      alert('Demo: Analytics data exported!');
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color = 'purple' }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/20`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <span className={`text-sm font-medium text-${color}-600 dark:text-${color}-400 ${change?.startsWith('+') ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'} px-2 py-1 rounded-full`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {typeof value === 'number' && value > 1000 ? (value / 1000).toFixed(1) + 'K' : value}
        {title.includes('ROI') && 'x'}
        {title.includes('Rate') && '%'}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Track Your Actions
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportAnalytics}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Influencers"
            value={analyticsData.overview.totalInfluencers}
            change="+12%"
            color="blue"
          />
          <StatCard
            icon={Eye}
            title="Total Reach"
            value={analyticsData.overview.totalReach}
            change="+18%"
            color="purple"
          />
          <StatCard
            icon={TrendingUp}
            title="Average ROI"
            value={analyticsData.overview.averageROI}
            change="+8%"
            color="green"
          />
          <StatCard
            icon={MessageSquare}
            title="Response Rate"
            value={analyticsData.overview.responseRate}
            change="+5%"
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Campaign Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Campaign Performance
                </h2>
                <div className="flex space-x-2">
                  {['engagement', 'reach', 'roi'].map((chart) => (
                    <button
                      key={chart}
                      onClick={() => setActiveChart(chart)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                        activeChart === chart
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {chart.charAt(0).toUpperCase() + chart.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {analyticsData.campaignPerformance.map((campaign, index) => (
                  <motion.div
                    key={campaign.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {campaign.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {campaign.reach.toLocaleString()} reach
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {activeChart === 'engagement' && `${(campaign.engagement / 1000).toFixed(1)}K`}
                          {activeChart === 'reach' && `${(campaign.reach / 1000000).toFixed(1)}M`}
                          {activeChart === 'roi' && `${campaign.roi}x`}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {activeChart}
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        campaign.roi >= 4 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : campaign.roi >= 3
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        ROI: {campaign.roi}x
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Engagement Trend */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Engagement Trend
              </h2>
              
              <div className="space-y-4">
                {analyticsData.engagementTrend.map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-20 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.engagement / 4000) * 100}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                        />
                      </div>
                      
                      <div className="w-20 text-right text-sm font-semibold text-gray-900 dark:text-white">
                        {day.engagement.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* Platform Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Platform Breakdown
              </h2>
              
              <div className="space-y-4">
                {analyticsData.platformBreakdown.map((platform, index) => (
                  <motion.div
                    key={platform.platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        platform.platform === 'Instagram' 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500'
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}>
                        {platform.platform === 'Instagram' ? (
                          <Instagram className="w-5 h-5 text-white" />
                        ) : (
                          <Youtube className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {platform.platform}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {platform.campaigns} campaigns
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {(platform.reach / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Reach</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Performers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Top Performing Influencers
              </h2>
              
              <div className="space-y-4">
                {analyticsData.influencerPerformance.map((influencer, index) => (
                  <motion.div
                    key={influencer.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {influencer.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {influencer.platform} • {influencer.engagementRate}% engagement
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-bold ${
                        influencer.roi >= 4 
                          ? 'text-green-600 dark:text-green-400'
                          : influencer.roi >= 3
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {influencer.roi}x ROI
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {influencer.conversions} sales
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Icon components
const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const Youtube = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

export default Analytics;