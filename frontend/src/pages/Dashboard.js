import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageSquare, BarChart3, TrendingUp, Target, Calendar, 
  Settings, LogOut, Edit3, Camera, Plus, Search, Filter,
  Instagram, Youtube, Mail, Phone, MapPin, Star
} from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    fetchCollaborators();
  }, []);

  // Backend API calls
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
        setProfileData(data.user || {});
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Demo data
      setDashboardData(getDemoDashboardData());
      setProfileData(getDemoUserData());
    } finally {
      setLoading(false);
    }
  };

  const fetchCollaborators = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/collaborators', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCollaborators(data);
      } else {
        throw new Error('Failed to fetch collaborators');
      }
    } catch (error) {
      console.error('Error fetching collaborators:', error);
      setCollaborators(getDemoCollaborators());
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
        setEditingProfile(false);
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Demo success
      setProfileData(updatedData);
      setEditingProfile(false);
      alert('Demo: Profile updated successfully!');
    }
  };

  const addCollaborator = async (collaboratorData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/collaborators', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(collaboratorData)
      });

      if (response.ok) {
        const newCollaborator = await response.json();
        setCollaborators(prev => [...prev, newCollaborator]);
      } else {
        throw new Error('Failed to add collaborator');
      }
    } catch (error) {
      console.error('Error adding collaborator:', error);
      // Demo success
      const newCollaborator = {
        id: Date.now(),
        ...collaboratorData,
        joinDate: new Date().toISOString()
      };
      setCollaborators(prev => [...prev, newCollaborator]);
    }
  };

  // Demo data functions
  const getDemoDashboardData = () => ({
    user: {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@company.com',
      company: 'TechStyle Fashion',
      industry: 'Fashion & Lifestyle',
      memberSince: '2023',
      avatar: null,
      phone: '+1 (555) 123-4567',
      location: 'New York, USA'
    },
    stats: {
      totalInfluencers: 1247,
      activeCampaigns: 8,
      responseRate: 28.5,
      totalReach: 2450000,
      engagementRate: 5.2,
      totalROI: 3.8
    },
    campaigns: [
      {
        id: 1,
        name: 'Summer Collection Launch',
        progress: 78,
        status: 'active',
        influencers: 24,
        budget: 5000,
        spent: 3900,
        startDate: '2024-06-01',
        endDate: '2024-07-15'
      },
      {
        id: 2,
        name: 'Product Review Campaign',
        progress: 45,
        status: 'active',
        influencers: 18,
        budget: 3000,
        spent: 1350,
        startDate: '2024-06-15',
        endDate: '2024-07-30'
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: 'campaign_created',
        message: 'New campaign "Summer Launch" created',
        timestamp: '2024-06-20T10:30:00Z',
        user: 'You'
      },
      {
        id: 2,
        type: 'influencer_added',
        message: 'Emma Chen added to campaign',
        timestamp: '2024-06-20T09:15:00Z',
        user: 'System'
      }
    ]
  });

  const getDemoUserData = () => ({
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@company.com',
    company: 'TechStyle Fashion',
    industry: 'Fashion & Lifestyle',
    memberSince: '2023',
    avatar: null,
    phone: '+1 (555) 123-4567',
    location: 'New York, USA'
  });

  const getDemoCollaborators = () => [
    {
      id: 1,
      name: 'Sarah Wilson',
      email: 'sarah@design.com',
      role: 'Marketing Manager',
      avatar: null,
      joinDate: '2024-01-15',
      status: 'active',
      permissions: ['view_campaigns', 'manage_influencers']
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@analytics.com',
      role: 'Data Analyst',
      avatar: null,
      joinDate: '2024-03-22',
      status: 'active',
      permissions: ['view_analytics', 'view_reports']
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {profileData.name}! Here's your campaign overview.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Campaign</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                {/* Profile Image */}
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {profileData.name?.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button 
                    onClick={() => setEditingProfile(true)}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {profileData.company}
                </p>
                <div className="flex items-center justify-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {dashboardData?.stats.activeCampaigns}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {dashboardData?.stats.totalInfluencers}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Influencers</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', icon: BarChart3, label: 'Overview' },
                  { id: 'campaigns', icon: Target, label: 'Campaigns' },
                  { id: 'collaborators', icon: Users, label: 'Collaborators' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                  Create Campaign
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                  Add Influencer
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                  Generate Report
                </button>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Stats Overview */}
            {activeSection === 'overview' && (
              <OverviewSection 
                stats={dashboardData.stats} 
                campaigns={dashboardData.campaigns}
                recentActivity={dashboardData.recentActivity}
              />
            )}

            {/* Campaigns Section */}
            {activeSection === 'campaigns' && (
              <CampaignsSection campaigns={dashboardData.campaigns} />
            )}

            {/* Collaborators Section */}
            {activeSection === 'collaborators' && (
              <CollaboratorsSection 
                collaborators={collaborators}
                onAddCollaborator={addCollaborator}
              />
            )}

            {/* Settings Section */}
            {activeSection === 'settings' && (
              <SettingsSection 
                profileData={profileData}
                editingProfile={editingProfile}
                onEditProfile={setEditingProfile}
                onUpdateProfile={updateProfile}
                onProfileDataChange={setProfileData}
              />
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {editingProfile && (
        <ProfileEditModal
          profileData={profileData}
          onSave={updateProfile}
          onCancel={() => setEditingProfile(false)}
          onDataChange={setProfileData}
        />
      )}
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ stats, campaigns, recentActivity }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-6"
  >
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { icon: Users, label: 'Total Influencers', value: stats.totalInfluencers, color: 'blue' },
        { icon: Target, label: 'Active Campaigns', value: stats.activeCampaigns, color: 'purple' },
        { icon: MessageSquare, label: 'Response Rate', value: `${stats.responseRate}%`, color: 'green' },
        { icon: TrendingUp, label: 'Total Reach', value: `${(stats.totalReach / 1000000).toFixed(1)}M`, color: 'orange' },
        { icon: BarChart3, label: 'Engagement Rate', value: `${stats.engagementRate}%`, color: 'pink' },
        { icon: Star, label: 'Average ROI', value: `${stats.totalROI}x`, color: 'yellow' }
      ].map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Campaign Progress */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Campaign Progress</h3>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">{campaign.name}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      campaign.progress >= 70 ? 'bg-green-500' : 
                      campaign.progress >= 40 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(activity.timestamp).toLocaleDateString()} • {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Campaigns Section Component
const CampaignsSection = ({ campaigns }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
  >
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Management</h2>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center space-x-2">
        <Plus className="w-5 h-5" />
        <span>New Campaign</span>
      </button>
    </div>
    
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{campaign.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {campaign.influencers} influencers • Budget: ${campaign.budget.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{campaign.progress}%</div>
              <div className={`text-sm ${
                campaign.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
              }`}>
                {campaign.status}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Collaborators Section Component
const CollaboratorsSection = ({ collaborators, onAddCollaborator }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState({
    name: '',
    email: '',
    role: '',
    permissions: []
  });

  const handleAddCollaborator = () => {
    if (newCollaborator.name && newCollaborator.email && newCollaborator.role) {
      onAddCollaborator(newCollaborator);
      setNewCollaborator({ name: '', email: '', role: '', permissions: [] });
      setShowAddForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Collaborators</h2>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Add Collaborator Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-700/50"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Add New Collaborator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newCollaborator.name}
              onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={newCollaborator.email}
              onChange={(e) => setNewCollaborator({...newCollaborator, email: e.target.value})}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Role"
              value={newCollaborator.role}
              onChange={(e) => setNewCollaborator({...newCollaborator, role: e.target.value})}
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleAddCollaborator}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Add Collaborator
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Collaborators List */}
      <div className="space-y-4">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-semibold">
                {collaborator.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{collaborator.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{collaborator.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{collaborator.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                collaborator.status === 'active' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {collaborator.status}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Joined {new Date(collaborator.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Settings Section Component
const SettingsSection = ({ profileData, editingProfile, onEditProfile, onUpdateProfile, onProfileDataChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
  >
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
    
    <div className="space-y-6">
      {/* Profile Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => onProfileDataChange({...profileData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => onProfileDataChange({...profileData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={profileData.company}
              onChange={(e) => onProfileDataChange({...profileData, company: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => onProfileDataChange({...profileData, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onUpdateProfile(profileData)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  </motion.div>
);

// Profile Edit Modal Component
const ProfileEditModal = ({ profileData, onSave, onCancel, onDataChange }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Profile</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={profileData.name}
            onChange={(e) => onDataChange({...profileData, name: e.target.value})}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => onDataChange({...profileData, email: e.target.value})}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={() => onSave(profileData)}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);

export default Dashboard;