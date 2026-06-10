'use client';

import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-between border-b p-4">

      <h1 className="font-semibold">
        Admin SIMADES
      </h1>

      <button
        onClick={logout}
        className="rounded bg-red-500 px-4 py-2 text-white"
      >
        Logout
      </button>

    </div>
  );
}