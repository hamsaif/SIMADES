import api from '@/lib/axios';

export const getKategori = async () => {
  const response = await api.get(
    '/kategori',
  );

  return response.data;
};

export const createKategori = async (
  nama: string,
) => {
  const response = await api.post(
    '/kategori',
    {
      nama,
    },
  );

  return response.data;
};

export const updateKategori = async (
  id: string,
  nama: string,
) => {
  const response = await api.patch(
    `/kategori/${id}`,
    {
      nama,
    },
  );

  return response.data;
};

export const deleteKategori = async (
  id: string,
) => {
  const response = await api.delete(
    `/kategori/${id}`,
  );

  return response.data;
};