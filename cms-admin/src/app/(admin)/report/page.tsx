'use client';

import { useEffect, useState } from 'react';
import { getAsset } from '@/services/asset.service';

export default function ReportPage() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getAsset();
    setTotal(response.data.length);
  };

  return (
    <article className="page-container">

      <header className="page-header">
        <h2 className="page-title">
          Report Asset
        </h2>
      </header>

      <section className="card">
        <h3>Total Asset</h3>

        <p
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
          }}
        >
          {total}
        </p>
      </section>

    </article>
  );
}