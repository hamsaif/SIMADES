import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <main className="p-6">
            {children}
          </main>

        </div>

      </div>

    </ProtectedRoute>
  );
}