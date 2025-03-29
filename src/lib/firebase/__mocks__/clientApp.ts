// Mock Firebase for testing
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
};

const mockFirestore = {
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  startAfter: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  serverTimestamp: jest.fn(),
};

const mockFunctions = {
  httpsCallable: jest.fn(),
};

const mockStorage = {
  ref: jest.fn(),
  uploadBytes: jest.fn(),
  getDownloadURL: jest.fn(),
};

export const auth = mockAuth;
export const firestore = mockFirestore;
export const functions = mockFunctions;
export const storage = mockStorage;
export const app = {};