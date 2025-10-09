import { api, MOCK_MODE } from './api';

// Real API calls
const realAPI = {
  getCampaigns: async () => {
    const response = await api.get('/api/campaigns');
    return response.data;
  },
  createCampaign: async (data) => {
    const response = await api.post('/api/campaigns', data);
    return response.data;
  }
};

// Mock data - same structure as real API
const mockAPI = {
  getCampaigns: async () => ({
    campaigns: [
      {
        id: '1',
        name: 'Summer Skincare',
        status: 'active',
        metrics: { reach: 2400000, engagement: 5.2, responses: 89 },
        progress: 78
      }
    ]
  }),
  createCampaign: async (data) => ({ ...data, id: Date.now().toString() })
};

// Export based on mode
export const campaignService = MOCK_MODE ? mockAPI : realAPI;