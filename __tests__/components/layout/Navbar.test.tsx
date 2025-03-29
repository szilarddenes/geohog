import { render, screen } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';

// Mock the next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

// Mock the next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

// Mock the AuthContext
jest.mock('@/context/AuthContext');

describe('Navbar', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });
  
  it('renders the navbar with logo and navigation links', () => {
    // Mock the useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn(),
    });
    
    render(<Navbar />);
    
    // Check that the logo is rendered
    expect(screen.getByText('GeoHog')).toBeInTheDocument();
    
    // Check navigation links
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Research Assistant')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    
    // Check Subscribe button for non-logged in users
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });
  
  it('renders admin link and logout button when user is logged in', () => {
    // Mock the useAuth hook with logged in user
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: '123', email: 'test@example.com' },
      logout: jest.fn(),
    });
    
    render(<Navbar />);
    
    // Check admin link when logged in
    expect(screen.getByText('Admin')).toBeInTheDocument();
    
    // Check logout button when logged in
    expect(screen.getByText('Log Out')).toBeInTheDocument();
    
    // Subscribe button should not be present
    expect(screen.queryByText('Subscribe')).not.toBeInTheDocument();
  });
});