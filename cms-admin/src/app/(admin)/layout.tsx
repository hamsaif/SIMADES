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
      <div className="admin-layout">

        <Sidebar />

        <div className="admin-main-wrapper">

          <Navbar />

          <main className="admin-main-content">
            {children}
          </main>

        </div>

      </div>
    </ProtectedRoute>
  );
}