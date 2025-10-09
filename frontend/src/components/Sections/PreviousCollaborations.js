import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

const PreviousCollaborations = ({ data }) => {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    if (data) {
      setCollaborations(data);
    } else {
      fetchPreviousCollaborations();
    }
  }, [data]);

  const fetchPreviousCollaborations = async () => {
    try {
      const response = await fetch('/api/collaborations/previous');
      const data = await response.json();
      setCollaborations(data);
    } catch (error) {
      console.error('Error fetching previous collaborations:', error);
      setCollaborations([
        {
          id: 1,
          influencer: { name: 'Emma Chen', platform: 'YouTube', followers: '128K' },
          campaign: 'Winter Skincare Routine',
          duration: '2 weeks',
          completedDate: '2024-06-20',
          engagement: 4.2,
          roi: 3.8,
          status: 'completed'
        }
      ]);
    }
  };

  const getROIColor = (roi) => {
    if (roi >= 3) return 'text-green-600 dark:text-green-400';
    if (roi >= 2) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Previous Collaborations</h2>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
          {collaborations.length} Completed
        </span>
      </div>

      <div className="space-y-4">
        {collaborations.map((collab, index) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {collab.influencer.name}
                    </h3>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded">
                      {collab.influencer.platform}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {collab.campaign}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Completed {new Date(collab.completedDate).toLocaleDateString()}</span>
                    </div>
                    <span>•</span>
                    <span>{collab.duration}</span>
                  </div>
                </div>
              </div>

              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {collab.engagement}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Engagement</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center space-x-1 text-sm">
                    <TrendingUp className={`w-4 h-4 ${getROIColor(collab.roi)}`} />
                    <span className={`font-medium ${getROIColor(collab.roi)}`}>
                      {collab.roi}x
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">ROI</p>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                collab.status === 'completed' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {collab.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {collaborations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No previous collaborations</p>
        </div>
      )}
    </motion.div>
  );
};

export default PreviousCollaborations;