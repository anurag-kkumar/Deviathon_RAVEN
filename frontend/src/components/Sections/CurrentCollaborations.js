import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Calendar, MoreVertical } from 'lucide-react';

const CurrentCollaborations = ({ data }) => {
  const [collaborations, setCollaborations] = useState([]);

  useEffect(() => {
    if (data) {
      setCollaborations(data);
    } else {
      fetchCurrentCollaborations();
    }
  }, [data]);

  const fetchCurrentCollaborations = async () => {
    try {
      const response = await fetch('/api/collaborations/current');
      const data = await response.json();
      setCollaborations(data);
    } catch (error) {
      console.error('Error fetching current collaborations:', error);
      setCollaborations([
        {
          id: 1,
          influencer: { name: 'Sarah Wilson', platform: 'Instagram', followers: '45.2K' },
          campaign: 'Summer Collection Launch',
          progress: 65,
          deadline: '2024-07-15',
          status: 'active'
        }
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Current Collaborations</h2>
        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">
          {collaborations.length} Active
        </span>
      </div>

      <div className="space-y-4">
        {collaborations.map((collab, index) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {collab.influencer.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {collab.influencer.platform} • {collab.influencer.followers}
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  {collab.campaign}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="175.92"
                      strokeDashoffset={175.92 - (175.92 * collab.progress) / 100}
                      className="text-green-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {collab.progress}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Due {new Date(collab.deadline).toLocaleDateString()}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  collab.status === 'active' 
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {collab.status}
                </div>
              </div>

              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {collaborations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No active collaborations</p>
        </div>
      )}
    </motion.div>
  );
};

export default CurrentCollaborations;