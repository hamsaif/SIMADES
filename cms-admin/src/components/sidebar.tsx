'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: 'Dashboard',
      href: '/dashboard',
    },
    {
      name: 'Kategori',
      href: '/kategori',
    },
    {
      name: 'Asset',
      href: '/asset',
    },
    {
      name: 'Report',
      href: '/report',
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        SIMADES
      </h1>

      <nav className="flex flex-col gap-2">

        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`rounded p-3 ${
              pathname === menu.href
                ? 'bg-slate-700'
                : 'hover:bg-slate-700'
            }`}
          >
            {menu.name}
          </Link>
        ))}

      </nav>

    </aside>
  );
}