import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Layout/Sidebar.js';
import WelcomeSection from '../components/Sections/WelcomeSection.js';
import StatsGrid from '../components/Sections/StatsGrid.js';
import CurrentCollaborations from '../components/Sections/CurrentCollaborations.js';
import PreviousCollaborations from '../components/Sections/PreviousCollaborations.js';
import CampaignProgress from '../components/Sections/CampaignProgress.js';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDashboardData({
        brand: { name: 'Your Brand', industry: 'Fashion', memberSince: '2024' },
        stats: { totalInfluencers: 0, activeCampaigns: 0, responseRate: 0, totalReach: 0 },
        previousCollabs: [],
        currentCollabs: [],
        campaignProgress: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar brandData={dashboardData?.brand} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <WelcomeSection brandData={dashboardData?.brand} />
          <StatsGrid stats={dashboardData?.stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CurrentCollaborations data={dashboardData?.currentCollabs} />
            <PreviousCollaborations data={dashboardData?.previousCollabs} />
          </div>
          
          <CampaignProgress data={dashboardData?.campaignProgress} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;