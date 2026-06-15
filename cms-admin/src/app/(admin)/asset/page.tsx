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
  return (
    <article>
      <h2>Asset Desa</h2>
    </article>
  );
}
