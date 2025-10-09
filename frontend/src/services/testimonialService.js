import { api, MOCK_MODE } from './api.js';

const realAPI = {
  getTestimonials: async () => {
    const response = await api.get('/api/testimonials');
    return response.data;
  }
};

const mockAPI = {
  getTestimonials: async () => ({
    testimonials: [
      {
        id: '1',
        text: "Raven transformed our influencer marketing from guesswork to data-driven success. We saw a 3x increase in campaign ROI within the first month!",
        rating: 5,
        author: {
          name: "Sarah Chen",
          position: "Marketing Director", 
          company: "TechCorp"
        },
        results: [
          { value: "3x", label: "ROI Increase" },
          { value: "89%", label: "Response Rate" },
          { value: "2.4M", label: "Total Reach" }
        ]
      },
      {
        id: '2', 
        text: "The AI-powered influencer discovery saved us hundreds of hours. We found perfect brand matches we never would have discovered manually!",
        rating: 5,
        author: {
          name: "Marcus Rodriguez",
          position: "Head of Growth",
          company: "StyleHub"
        },
        results: [
          { value: "64%", label: "Time Saved" },
          { value: "94%", label: "Brand Fit Score" },
          { value: "5.2%", label: "Engagement Rate" }
        ]
      }
    ]
  })
};

export const testimonialService = MOCK_MODE ? mockAPI : realAPI;