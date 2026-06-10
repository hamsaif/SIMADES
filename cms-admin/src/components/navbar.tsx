'use client';

import { useRouter, usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/kategori': 'Manajemen Kategori',
  '/asset': 'Manajemen Asset',
  '/report': 'Laporan',
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const title = pageTitles[pathname] ?? 'Admin SIMADES';

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <header className="navbar">
      {/* Page Title */}
      <div>
        <h1 className="navbar-title">
          {title}
        </h1>
      </div>

      {/* Right side */}
      <div className="navbar-right">
        {/* Admin badge */}
        <div className="user-badge">
          <div className="user-avatar">
            A
          </div>
          <span className="user-name">
            Admin
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="btn-logout"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}