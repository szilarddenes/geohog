import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import SubscribersList from '@/components/admin/SubscribersList';

export default function Subscribers() {
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
        <title>Subscriber Management | GeoHog Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <SubscribersList />
    </AdminLayout>
  );
}