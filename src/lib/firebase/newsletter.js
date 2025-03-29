import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './clientApp';

export const subscribeToNewsletter = async (data) => {
  const { email, specialization, role, region } = data;
  
  // Check if email already exists
  const subscribersRef = collection(firestore, 'subscribers');
  const q = query(subscribersRef, where('email', '==', email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    throw new Error('Email already subscribed.');
  }
  
  // Add new subscriber
  return addDoc(subscribersRef, {
    email: email.toLowerCase(),
    preferences: {
      specialization: specialization || null,
      role: role || null,
      region: region || null,
      html: true, // Default to HTML format
      frequency: 'weekly', // Default to weekly delivery
    },
    subscriptionDate: serverTimestamp(),
    active: true
  });
};

export const unsubscribeFromNewsletter = async (unsubscribeToken) => {
  // In a real implementation, you would look up the token and set the subscriber to inactive
  // This is a simplified version for demonstration purposes
  console.log(`Unsubscribing token: ${unsubscribeToken}`);
  
  // Mock implementation
  // In production, you would look up the token and set the user to inactive
  return Promise.resolve({ success: true });
};