import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function Admin() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If no user is logged in, redirect to login
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard | GeoHog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminDashboard />
    </AdminLayout>
  );
}