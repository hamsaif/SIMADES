'use client';

import { useState } from 'react';

import {
  getAsset,
  createAsset,
  deleteAsset,
} from '@/services/asset.service';

export default function AssetPage() {
  const [asset, setAsset] = useState<any[]>([]);

  const [form, setForm] = useState({
  nama: '',
  deskripsi: '',
  lokasi: '',
  foto: '',
  kondisi: 'BAIK',
  kategoriId: '',
});

const loadAsset = async () => {
  const response = await getAsset();
  setAsset(response.data);
};

useEffect(() => {
  loadAsset();
}, []);

const handleSubmit = async (
  e: React.FormEvent,
) => {
  e.preventDefault();

  await createAsset(form);

  setForm({
  nama: '',
  deskripsi: '',
  lokasi: '',
  foto: '',
  kondisi: 'BAIK',
  kategoriId: '',
});

loadAsset();
};
  return (
    <article className="page-container">
  <header className="page-header">
    <h2 className="page-title">
      Asset Desa
    </h2>
  </header>
</article>
  );
}
