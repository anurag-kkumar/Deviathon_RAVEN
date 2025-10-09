import { useState, useEffect } from 'react';
import { analyticsService } from '../services/analyticsService.js';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
      // Fallback mock data
      setAnalytics({
        totalInfluencers: '1,247',
        responseRate: '89%',
        totalReach: '2.4M',
        roi: '5.2x'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return { analytics, loading, error, refetch: fetchAnalytics };
};