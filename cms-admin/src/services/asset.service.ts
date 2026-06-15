import api from '@/lib/axios';

export const getAsset = async () => {
  const response = await api.get('/asset');
  return response.data;
};

export const createAsset = async (data: any) => {
  const response = await api.post('/asset', data);
  return response.data;
};

export const updateAsset = async (
  id: string,
  data: any,
) => {
  const response = await api.patch(
    `/asset/${id}`,
    data,
  );

  return response.data;
};

export const deleteAsset = async (
  id: string,
) => {
  const response = await api.delete(
    `/asset/${id}`,
  );

  return response.data;
};