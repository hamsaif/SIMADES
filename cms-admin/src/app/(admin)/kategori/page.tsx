'use client';

import { useEffect, useState } from 'react';

import {
  createKategori,
  deleteKategori,
  getKategori,
  updateKategori,
} from '@/services/kategori.service';


export default function KategoriPage() {

  const [kategori, setKategori] =
    useState<any[]>([]);

  const [nama, setNama] =
    useState('');

  const [editId, setEditId] =
    useState('');

  const [editNama, setEditNama] =
    useState('');

  const loadKategori = async () => {
    const response =
      await getKategori();

    setKategori(response.data);
  };

  useEffect(() => {
    loadKategori();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    await createKategori(nama);

    setNama('');

    loadKategori();
  };

  const handleDelete = async (
    id: string,
  ) => {

    if (
      !confirm(
        'Hapus kategori?',
      )
    ) {
      return;
    }

    await deleteKategori(id);

    loadKategori();
  };

  const handleUpdate = async () => {
    await updateKategori(
      editId,
      editNama,
    );

    setEditId('');
    setEditNama('');

    loadKategori();
  };

  return (
    <div>

      <h1 className="mb-6 text-3xl font-bold">
        Kategori
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-6 flex gap-3"
      >

        <input
          type="text"
          placeholder="Nama kategori"
          value={nama}
          onChange={(e) =>
            setNama(
              e.target.value,
            )
          }
          className="rounded border p-3"
          required
        />

        <button
          className="rounded bg-blue-600 px-4 text-white"
        >
          Tambah
        </button>

      </form>

      <table className="w-full border">

        <thead>

          <tr className="bg-gray-100">

            <th className="border p-3">
              Nama
            </th>

            <th className="border p-3">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {kategori.map((item) => (

            <tr key={item.id}>

              <td className="border p-3">
                {item.nama}
              </td>

              <td className="border p-3">
                <button
                  onClick={() => {
                    setEditId(item.id);
                    setEditNama(item.nama);
                  }}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      item.id,
                    )
                  }
                  className="rounded bg-red-500 px-3 py-1 text-white"
                >
                  Hapus
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}