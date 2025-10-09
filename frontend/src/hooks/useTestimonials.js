import { useState, useEffect } from 'react';
import { testimonialService } from '../services/testimonialService.js';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (err) {
      setError(err.message);
      // Fallback mock data
      setTestimonials([
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
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: fetchTestimonials };
};