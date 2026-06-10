'use client';

import { useEffect, useState } from 'react';

import {
  createKategori,
  deleteKategori,
  getKategori,
  updateKategori,
} from '@/services/kategori.service';

export default function KategoriPage() {

  const [kategori, setKategori] = useState<any[]>([]);
  const [nama, setNama] = useState('');
  const [editId, setEditId] = useState('');
  const [editNama, setEditNama] = useState('');
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadKategori = async () => {
    const response = await getKategori();
    setKategori(response.data);
  };

  useEffect(() => {
    loadKategori();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await createKategori(nama);
    setNama('');
    await loadKategori();
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kategori ini?')) return;
    await deleteKategori(id);
    loadKategori();
  };

  const handleUpdate = async () => {
    await updateKategori(editId, editNama);
    setEditId('');
    setEditNama('');
    loadKategori();
  };

  const cancelEdit = () => {
    setEditId('');
    setEditNama('');
  };

  const filtered = kategori.filter((k) =>
    k.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <article className="page-container">

      {/* Page Header */}
      <header className="page-header">
        <h2 className="page-title">
          Kategori
        </h2>
        <p className="page-subtitle">
          Kelola daftar kategori yang tersedia dalam sistem
        </p>
      </header>

      {/* Add Form Card */}
      <section className="card" style={{ marginBottom: '20px' }}>
        <h3 className="card-title">
          Tambah Kategori Baru
        </h3>
        <form onSubmit={handleSubmit} className="form-group" style={{ marginBottom: 0 }}>
          <input
            type="text"
            placeholder="Nama kategori..."
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
            className="input-control"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          >
            {isSubmitting ? 'Menyimpan...' : '+ Tambah'}
          </button>
        </form>
      </section>

      {/* Edit Form – shown when editing */}
      {editId && (
        <section className="card" style={{ marginBottom: '20px', background: 'var(--warning-light)', borderColor: '#fde68a' }}>
          <h3 className="card-title" style={{ color: '#92400e', fontSize: '14px', marginBottom: '12px' }}>
            ✏️ Edit Kategori
          </h3>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <input
              value={editNama}
              onChange={(e) => setEditNama(e.target.value)}
              className="input-control"
              style={{ background: 'white', borderColor: '#fde68a' }}
            />
            <button
              onClick={handleUpdate}
              className="btn"
              style={{ background: 'var(--warning)', color: 'white' }}
            >
              Simpan
            </button>
            <button
              onClick={cancelEdit}
              className="btn"
              style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--sidebar-border)' }}
            >
              Batal
            </button>
          </div>
        </section>
      )}

      {/* Table Card */}
      <section className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table Header with Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--card-border)',
          }}
        >
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-heading)' }}>
            Daftar Kategori
            <span className="badge badge-primary" style={{ marginLeft: '12px' }}>
              {filtered.length}
            </span>
          </span>

          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <svg
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-control"
              style={{ paddingLeft: '34px', width: '220px' }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>No</th>
                <th>Nama Kategori</th>
                <th style={{ textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    {search ? 'Tidak ada hasil yang cocok' : 'Belum ada kategori'}
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ color: 'var(--text-muted)' }}>{idx + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: 'var(--primary-light)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: 'var(--primary)',
                            fontWeight: 700,
                          }}
                        >
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        {item.nama}
                      </div>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          onClick={() => {
                            setEditId(item.id);
                            setEditNama(item.nama);
                          }}
                          className="btn"
                          style={{
                            padding: '6px 12px',
                            background: 'var(--warning-light)',
                            color: '#92400e',
                            fontSize: '12px',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="btn"
                          style={{
                            padding: '6px 12px',
                            background: 'var(--danger-light)',
                            color: 'var(--danger)',
                            fontSize: '12px',
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}