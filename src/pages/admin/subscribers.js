import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { collection, getDocs, query, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/clientApp';

export default function Subscribers() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [subscribers, setSubscribers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  // If no user is logged in, redirect to login
  if (!loading && !user) {
    router.push('/login');
    return null;
  }

  // Load subscribers data
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setDataLoading(true);
        setError(null);
        
        const subscribersRef = collection(firestore, 'subscribers');
        const subscribersQuery = query(
          subscribersRef,
          orderBy('subscriptionDate', 'desc'),
          limit(20)
        );
        
        const querySnapshot = await getDocs(subscribersQuery);
        
        const fetchedSubscribers = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setSubscribers(fetchedSubscribers);
      } catch (err) {
        console.error('Error fetching subscribers:', err);
        setError('Failed to load subscribers. Please try again.');
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchSubscribers();
  }, []);

  const toggleSubscriberStatus = async (id, currentStatus) => {
    try {
      const subscriberRef = doc(firestore, 'subscribers', id);
      await updateDoc(subscriberRef, {
        active: !currentStatus
      });
      
      // Update local state
      setSubscribers(prev => 
        prev.map(subscriber => 
          subscriber.id === id 
            ? { ...subscriber, active: !currentStatus } 
            : subscriber
        )
      );
    } catch (err) {
      console.error('Error updating subscriber status:', err);
      setError('Failed to update subscriber status.');
    }
  };

  const deleteSubscriber = async (id) => {
    if (!confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')) {
      return;
    }
    
    try {
      const subscriberRef = doc(firestore, 'subscribers', id);
      await deleteDoc(subscriberRef);
      
      // Update local state
      setSubscribers(prev => prev.filter(subscriber => subscriber.id !== id));
    } catch (err) {
      console.error('Error deleting subscriber:', err);
      setError('Failed to delete subscriber.');
    }
  };

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <AdminLayout>
      <Head>
        <title>Subscriber Management | GeoHog Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
            <p className="mt-1 text-sm text-gray-500">Manage newsletter subscribers</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {subscribers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No subscribers found.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {subscribers.map(subscriber => (
                <li key={subscriber.id}>
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-800 truncate">{subscriber.email}</p>
                      <div className="mt-2 sm:flex sm:justify-start">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {subscriber.subscriptionDate?.toDate().toLocaleDateString() || 'Unknown date'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subscriber.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {subscriber.active ? 'Active' : 'Inactive'}
                      </span>
                      
                      <button
                        onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.active)}
                        className="text-gray-400 hover:text-primary-800"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => deleteSubscriber(subscriber.id)}
                        className="text-gray-400 hover:text-red-800"
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}