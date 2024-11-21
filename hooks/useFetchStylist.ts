import { useEffect, useState } from 'react';
import { request } from '~/apis/HttpClient';
import type Stylist from '~/interfaces/Stylist';

const useFetchStylist = (): {
  stylist: Stylist[];
  isLoading: boolean;
} => {
  const [stylist, setStylist] = useState<Stylist[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStylist = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const response = await request.get<Stylist[]>('stylist');
        if (response?.success && response.data) {
          setStylist(response.data);
        }
      } catch (err) {
        console.error('Error fetching stylist:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStylist();
  }, []);

  return { stylist, isLoading };
};

export default useFetchStylist;
