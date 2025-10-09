import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calendar, Users, TrendingUp } from 'lucide-react';

const CampaignProgress = ({ data }) => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    if (data) {
      setCampaigns(data);
    } else {
      fetchCampaignProgress();
    }
  }, [data]);

  const fetchCampaignProgress = async () => {
    try {
      const response = await fetch('/api/campaigns/progress');
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error('Error fetching campaign progress:', error);
      setCampaigns([
        {
          id: 1,
          name: 'Summer Collection Launch',
          progress: 75,
          targetInfluencers: 50,
          currentInfluencers: 42,
          startDate: '2024-06-01',
          endDate: '2024-07-15',
          budget: 5000,
          spent: 3750,
          status: 'active'
        }
      ]);
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'text-green-500';
    if (progress >= 50) return 'text-blue-500';
    if (progress >= 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressBarColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Campaign Progress</h2>
        <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
          {campaigns.filter(c => c.status === 'active').length} Active
        </span>
      </div>

      <div className="space-y-6">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {campaign.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Ends {new Date(campaign.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{campaign.currentInfluencers}/{campaign.targetInfluencers} influencers</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-2xl font-bold ${getProgressColor(campaign.progress)}`}>
                  {campaign.progress}%
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  campaign.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {campaign.status}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Campaign Progress</span>
                <span>{campaign.progress}% complete</span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(campaign.progress)}`}
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-sm mb-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {campaign.currentInfluencers}/{campaign.targetInfluencers}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Influencers</p>
                </div>

                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-center space-x-1 text-sm mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${campaign.spent.toLocaleString()}/${campaign.budget.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No active campaigns</p>
        </div>
      )}
    </motion.div>
  );
};

export default CampaignProgress;