import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardCard from '@/components/admin/DashboardCard';

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

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Overview of GeoHog Newsletter</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">Total Subscribers</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">Newsletters Sent</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 truncate">Content Items</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="Recent Subscribers">
            <p className="text-gray-500 text-sm">No subscribers yet</p>
          </DashboardCard>
          
          <DashboardCard title="Subscriber Growth">
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              <p className="text-gray-500">Chart placeholder - Subscriber growth over time</p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </AdminLayout>
  );
}