import { api, MOCK_MODE } from './api.js';

// Real API calls
const realAPI = {
  getAnalytics: async () => {
    const response = await api.get('/api/analytics');
    return response.data;
  },

  getCampaignAnalytics: async (campaignId) => {
    const response = await api.get(`/api/analytics/campaigns/${campaignId}`);
    return response.data;
  },

  getInfluencerAnalytics: async (influencerId) => {
    const response = await api.get(`/api/analytics/influencers/${influencerId}`);
    return response.data;
  },

  getPerformanceMetrics: async (timeRange = '30d') => {
    const response = await api.get(`/api/analytics/performance?range=${timeRange}`);
    return response.data;
  }
};

// Mock data - same structure as real API
const mockAPI = {
  getAnalytics: async () => ({
    totalInfluencers: '1,247',
    responseRate: '89%',
    totalReach: '2.4M',
    roi: '5.2x',
    activeCampaigns: 12,
    totalMessages: 845,
    engagementRate: '5.2%',
    avgResponseTime: '6.2h'
  }),

  getCampaignAnalytics: async (campaignId) => ({
    campaignId,
    name: 'Summer Skincare',
    metrics: {
      reach: 2400000,
      engagement: 5.2,
      responses: 89,
      conversions: 124,
      roi: 5.8
    },
    timeline: [
      { date: '2024-01-01', reach: 120000, engagement: 4.8 },
      { date: '2024-01-02', reach: 450000, engagement: 5.1 },
      { date: '2024-01-03', reach: 890000, engagement: 5.4 },
      { date: '2024-01-04', reach: 1240000, engagement: 5.2 },
      { date: '2024-01-05', reach: 2400000, engagement: 5.2 }
    ]
  }),

  getInfluencerAnalytics: async (influencerId) => ({
    influencerId,
    name: 'Emma Green',
    metrics: {
      followers: 84500,
      engagement: 6.8,
      responseTime: '2.4h',
      collaborationRate: 92
    },
    performance: [
      { campaign: 'Skincare Launch', roi: 7.2 },
      { campaign: 'Wellness Week', roi: 5.8 },
      { campaign: 'Summer Beauty', roi: 6.4 }
    ]
  }),

  getPerformanceMetrics: async (timeRange) => ({
    timeRange,
    metrics: {
      messagesSent: 845,
      responsesReceived: 752,
      collaborationRate: 89,
      avgEngagement: 5.2,
      totalReach: 12400000
    },
    trends: [
      { week: 'W1', engagement: 4.8, responses: 45 },
      { week: 'W2', engagement: 5.2, responses: 67 },
      { week: 'W3', engagement: 5.6, responses: 89 },
      { week: 'W4', engagement: 5.2, responses: 124 }
    ]
  })
};

// Export based on mode
export const analyticsService = MOCK_MODE ? mockAPI : realAPI;