export default function DashboardPage() {
  const stats = [
    {
      label: 'Total Kategori',
      value: '—',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      iconClass: 'stat-icon-primary',
    },
    {
      label: 'Total Asset',
      value: '—',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
          <line x1="7" y1="2" x2="7" y2="22" />
          <line x1="17" y1="2" x2="17" y2="22" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),
      iconClass: 'stat-icon-warning', // or secondary etc
    },
    {
      label: 'Laporan Masuk',
      value: '—',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      iconClass: 'stat-icon-success',
    },
  ];

  return (
    <article className="page-container">
      {/* Page Header */}
      <header className="page-header">
        <h2 className="page-title">
          Dashboard
        </h2>
        <p className="page-subtitle">
          Selamat datang di panel admin SIMADES
        </p>
      </header>

      {/* Stat Cards */}
      <section className="dashboard-stats">
        {stats.map((stat) => (
          <article key={stat.label} className="stat-card">
            <div className={`stat-icon-wrapper ${stat.iconClass}`}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3 className="stat-label">
                {stat.label}
              </h3>
              <p className="stat-value">
                {stat.value}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* Info Banner */}
      <section className="card" style={{ background: 'var(--primary-light)', borderColor: '#c7d2fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#3730a3' }}>
              Sistem Informasi Manajemen Desa (SIMADES)
            </h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#4338ca' }}>
              Gunakan menu di sebelah kiri untuk mengelola data kategori, asset, dan laporan.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}