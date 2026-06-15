import api from '@/lib/axios';

export const getAsset = async () => {
  const response = await api.get('/asset');
  return response.data;
};