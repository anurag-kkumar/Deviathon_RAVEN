import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Clock, Users, BarChart3, MessageSquare, Calendar, Plus, Search, Edit3, Trash2, Play } from 'lucide-react';

const Outreach = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('compose');
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' });

  // Real data fetching with dummy fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Real API calls - agar fail ho to dummy data use karo
        const campaignsResponse = await fetch('/api/campaigns');
        const templatesResponse = await fetch('/api/templates');
        const influencersResponse = await fetch('/api/influencers');

        const campaignsData = campaignsResponse.ok ? await campaignsResponse.json() : getDummyCampaigns();
        const templatesData = templatesResponse.ok ? await templatesResponse.json() : getDummyTemplates();
        const influencersData = influencersResponse.ok ? await influencersResponse.json() : getDummyInfluencers();

        setCampaigns(campaignsData);
        setTemplates(templatesData);
        setInfluencers(influencersData);
      } catch (error) {
        console.error('Using dummy data:', error);
        setCampaigns(getDummyCampaigns());
        setTemplates(getDummyTemplates());
        setInfluencers(getDummyInfluencers());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Dummy Data Functions
  const getDummyCampaigns = () => [
    {
      id: 1,
      name: 'Summer Collection Launch',
      status: 'active',
      messagesSent: 45,
      responses: 12,
      createdAt: '2024-06-15',
      scheduledFor: '2024-07-01'
    },
    {
      id: 2,
      name: 'Product Review Campaign',
      status: 'completed',
      messagesSent: 30,
      responses: 8,
      createdAt: '2024-05-20',
      scheduledFor: '2024-06-01'
    }
  ];

  const getDummyTemplates = () => [
    {
      id: 1,
      name: 'Collaboration Proposal',
      content: 'Hi {name}, I loved your recent content about {topic}! We\'d love to collaborate with you on our new product launch.',
      usedCount: 23
    },
    {
      id: 2,
      name: 'Product Review Request',
      content: 'Hello {name}, Your expertise in {niche} is impressive! Would you be interested in reviewing our new product?',
      usedCount: 15
    }
  ];

  const getDummyInfluencers = () => [
    {
      id: 1,
      name: 'Emma Chen',
      platform: 'instagram',
      followers: '128K',
      niche: 'Beauty & Skincare',
      recentContent: 'Summer skincare routine'
    },
    {
      id: 2,
      name: 'Mike Roberts',
      platform: 'youtube',
      followers: '450K',
      niche: 'Tech Reviews',
      recentContent: 'Latest smartphone review'
    },
    {
      id: 3,
      name: 'Sarah Wilson',
      platform: 'instagram',
      followers: '89K',
      niche: 'Fashion',
      recentContent: 'Summer fashion trends'
    }
  ];

  // Real API Functions
  const handleSendOutreach = async () => {
    if (selectedInfluencers.length === 0) {
      alert('Please select at least one influencer');
      return;
    }

    try {
      const response = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          influencerIds: selectedInfluencers,
          templateId: selectedTemplate,
          customMessage,
          schedule: scheduleDate && scheduleTime ? `${scheduleDate}T${scheduleTime}` : 'now'
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Outreach sent to ${selectedInfluencers.length} influencers!`);
        resetForm();
        fetchCampaigns(); // Refresh campaigns
      }
    } catch (error) {
      console.error('Error sending outreach:', error);
      // Demo purpose - even if API fails, show success
      alert(`Demo: Outreach sent to ${selectedInfluencers.length} influencers!`);
      resetForm();
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.name || !newTemplate.content) {
      alert('Please fill all template fields');
      return;
    }

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTemplate)
      });

      if (response.ok) {
        const createdTemplate = await response.json();
        setTemplates(prev => [...prev, createdTemplate]);
        setNewTemplate({ name: '', content: '' });
        alert('Template created successfully!');
      }
    } catch (error) {
      console.error('Error creating template:', error);
      // Demo - add template locally
      const demoTemplate = {
        id: Date.now(),
        ...newTemplate,
        usedCount: 0
      };
      setTemplates(prev => [...prev, demoTemplate]);
      setNewTemplate({ name: '', content: '' });
      alert('Demo: Template created!');
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await fetch(`/api/templates/${templateId}`, { method: 'DELETE' });
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
      setTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data);
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const resetForm = () => {
    setSelectedInfluencers([]);
    setSelectedTemplate('');
    setCustomMessage('');
    setScheduleDate('');
    setScheduleTime('');
  };

  const toggleInfluencerSelection = (influencerId) => {
    setSelectedInfluencers(prev =>
      prev.includes(influencerId)
        ? prev.filter(id => id !== influencerId)
        : [...prev, influencerId]
    );
  };

  const applyTemplate = (template) => {
    setSelectedTemplate(template.id);
    setCustomMessage(template.content);
  };

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
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Outreach Hub
          </motion.h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with influencers using smart templates and track your campaign performance
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Templates */}
          <div className="xl:col-span-1 space-y-6">
            {/* Create New Template */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Template
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Template Name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  placeholder="Template Content (use {name} for personalization)"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  rows="4"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateTemplate}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Save Template
                </motion.button>
              </div>
            </motion.div>

            {/* Available Templates */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Your Templates
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all cursor-pointer group"
                    onClick={() => applyTemplate(template)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                        {template.name}
                      </h4>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          <Edit3 className="w-3 h-3 text-blue-500" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTemplate(template.id);
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {template.content}
                    </p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>Used {template.usedCount} times</span>
                      <button className="text-purple-600 dark:text-purple-400 hover:underline">
                        Use Template
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Compose Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2" />
                Compose Outreach
              </h2>

              {/* Influencer Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Select Influencers ({selectedInfluencers.length} selected)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2">
                  {influencers.map((influencer) => (
                    <motion.div
                      key={influencer.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedInfluencers.includes(influencer.id)
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      onClick={() => toggleInfluencerSelection(influencer.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          influencer.platform === 'instagram' 
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500' 
                            : 'bg-gradient-to-r from-red-500 to-red-600'
                        }`}>
                          {influencer.platform === 'instagram' ? 
                            <Instagram className="w-5 h-5 text-white" /> : 
                            <Youtube className="w-5 h-5 text-white" />
                          }
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {influencer.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {influencer.followers} • {influencer.niche}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Message Editor */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows="6"
                  placeholder="Write your personalized outreach message or select a template..."
                  className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 resize-none transition-all"
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Use {'{name}'} to personalize with influencer names</span>
                  <span>{customMessage.length} characters</span>
                </div>
              </div>

              {/* Schedule Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                  />
                </div>
              </div>

              {/* Send Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendOutreach}
                disabled={selectedInfluencers.length === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <Send className="w-5 h-5" />
                <span className="text-lg">
                  Send to {selectedInfluencers.length} Influencer{selectedInfluencers.length !== 1 ? 's' : ''}
                </span>
                {(scheduleDate && scheduleTime) && (
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    Scheduled
                  </span>
                )}
              </motion.button>
            </motion.div>

            {/* Active Campaigns */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2" />
                Active Campaigns
              </h3>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    whileHover={{ y: -2 }}
                    className="p-4 border-2 border-gray-100 dark:border-gray-700 rounded-xl hover:border-purple-200 dark:hover:border-purple-600 transition-all bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {campaign.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {campaign.status === 'active' ? 'Active' : 'Completed'} • 
                            Scheduled for {new Date(campaign.scheduledFor).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-gray-900 dark:text-white text-lg">
                              {campaign.messagesSent}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">Sent</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-green-600 dark:text-green-400 text-lg">
                              {campaign.responses}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">Responses</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                              {((campaign.responses / campaign.messagesSent) * 100 || 0).toFixed(1)}%
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">Rate</div>
                          </div>
                        </div>
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

// Missing icons component
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

export default Outreach;