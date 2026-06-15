'use client';

import { useEffect, useState } from 'react';

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

      <section
        className="card"
        style={{ marginBottom: '20px' }}
      >
        <form
          onSubmit={handleSubmit}
          className="form-group"
        >
          <input
            className="input-control"
            placeholder="Nama Asset"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama: e.target.value,
              })
            }
          />

          <input
            className="input-control"
            placeholder="Lokasi"
            value={form.lokasi}
            onChange={(e) =>
              setForm({
                ...form,
                lokasi: e.target.value,
              })
            }
          />

          <textarea
            className="input-control"
            placeholder="Deskripsi"
            value={form.deskripsi}
            onChange={(e) =>
              setForm({
                ...form,
                deskripsi: e.target.value,
              })
            }
          />

          <button
            className="btn btn-primary"
            type="submit"
          >
            Tambah Asset
          </button>
        </form>
      </section>

      <section className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Lokasi</th>
              <th>Kondisi</th>
            </tr>
          </thead>

          <tbody>
            {asset.map((item) => (
              <tr key={item.id}>
                <td>{item.nama}</td>
                <td>{item.lokasi}</td>
                <td>{item.kondisi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </article>
  );
}