import api from '@/lib/axios';

export const getAsset = async () => {
  const response = await api.get('/asset');
  return response.data;
};

export const createAsset = async (data: any) => {
  const response = await api.post('/asset', data);
  return response.data;
};

