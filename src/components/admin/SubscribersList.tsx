import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter, doc, updateDoc, deleteDoc, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase/clientApp';

interface Subscriber {
  id: string;
  email: string;
  subscriptionDate: any;
  active: boolean;
  preferences: {
    specialization: string | null;
    role: string | null;
    region: string | null;
    html: boolean;
    frequency: string;
  };
}

const ITEMS_PER_PAGE = 10;

const SubscribersList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filterActive, setFilterActive] = useState<boolean | null>(null);
  const [searchEmail, setSearchEmail] = useState('');
  
  // Load initial data
  useEffect(() => {
    fetchSubscribers();
  }, [filterActive]);

  const fetchSubscribers = async (startAfterDoc = null) => {
    try {
      setLoading(true);
      setError(null);
      
      let subscribersQuery: any;
      const subscribersRef = collection(firestore, 'subscribers');
      
      // Apply filters if any
      if (filterActive !== null) {
        subscribersQuery = query(
          subscribersRef,
          where('active', '==', filterActive),
          orderBy('subscriptionDate', 'desc'),
          limit(ITEMS_PER_PAGE)
        );
      } else {
        subscribersQuery = query(
          subscribersRef,
          orderBy('subscriptionDate', 'desc'),
          limit(ITEMS_PER_PAGE)
        );
      }
      
      // Add startAfter if pagination
      if (startAfterDoc) {
        subscribersQuery = query(
          subscribersQuery,
          startAfter(startAfterDoc)
        );
      }
      
      const querySnapshot = await getDocs(subscribersQuery);
      
      // Update last visible for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);
      setHasMore(querySnapshot.docs.length === ITEMS_PER_PAGE);
      
      const fetchedSubscribers = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          subscriptionDate: data.subscriptionDate,
          active: data.active,
          preferences: data.preferences || {
            specialization: null,
            role: null,
            region: null,
            html: true,
            frequency: 'weekly'
          }
        };
      });
      
      if (startAfterDoc) {
        setSubscribers(prev => [...prev, ...fetchedSubscribers]);
      } else {
        setSubscribers(fetchedSubscribers);
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      setError('Failed to load subscribers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (lastVisible) {
      fetchSubscribers(lastVisible);
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      fetchSubscribers();
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const subscribersRef = collection(firestore, 'subscribers');
      const searchQuery = query(
        subscribersRef,
        where('email', '>=', searchEmail.toLowerCase()),
        where('email', '<=', searchEmail.toLowerCase() + '\uf8ff'),
        limit(ITEMS_PER_PAGE)
      );
      
      const querySnapshot = await getDocs(searchQuery);
      const searchResults = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          subscriptionDate: data.subscriptionDate,
          active: data.active,
          preferences: data.preferences || {
            specialization: null,
            role: null,
            region: null,
            html: true,
            frequency: 'weekly'
          }
        };
      });
      
      setSubscribers(searchResults);
      setHasMore(false);
    } catch (err) {
      console.error('Error searching subscribers:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscriberStatus = async (id: string, currentStatus: boolean) => {
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

  const deleteSubscriber = async (id: string) => {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Subscribers</h1>
          <p className="mt-1 text-sm text-gray-500">Manage newsletter subscribers</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterActive === null ? 'bg-primary-800 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => setFilterActive(null)}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterActive === true ? 'bg-primary-800 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => setFilterActive(true)}
          >
            Active
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${filterActive === false ? 'bg-primary-800 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
            onClick={() => setFilterActive(false)}
          >
            Inactive
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex">
          <input
            type="text"
            placeholder="Search by email"
            className="input rounded-r-none"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="bg-primary-800 text-white px-4 rounded-l-none rounded-r-md hover:bg-primary-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {loading && subscribers.length === 0 ? (
          <div className="p-6 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-800"></div>
          </div>
        ) : subscribers.length === 0 ? (
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
                      
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {subscriber.preferences.frequency} delivery
                      </p>
                      
                      {subscriber.preferences.region && (
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {subscriber.preferences.region.replace('_', ' ')}
                        </p>
                      )}
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
        
        {hasMore && !loading && (
          <div className="px-4 py-3 sm:px-6 flex justify-center">
            <button
              className="btn btn-secondary"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribersList;