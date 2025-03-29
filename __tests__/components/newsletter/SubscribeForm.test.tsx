import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubscribeForm from '@/components/newsletter/SubscribeForm';
import { subscribeToNewsletter } from '@/lib/firebase/newsletter';

// Mock the newsletter module
jest.mock('@/lib/firebase/newsletter');

describe('SubscribeForm', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });
  
  it('renders the subscribe form with required fields', () => {
    render(<SubscribeForm />);
    
    // Check that the email field is rendered
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    
    // Check that the submit button is rendered
    expect(screen.getByRole('button', { name: /Subscribe/i })).toBeInTheDocument();
    
    // Check that the additional preferences toggle is rendered
    expect(screen.getByText(/Show additional preferences/i)).toBeInTheDocument();
  });
  
  it('shows additional fields when toggle is clicked', () => {
    render(<SubscribeForm />);
    
    // Click the toggle to show additional fields
    fireEvent.click(screen.getByText(/Show additional preferences/i));
    
    // Check that additional fields are rendered
    expect(screen.getByLabelText(/Specialization/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Professional Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Geographic Region/i)).toBeInTheDocument();
    
    // Click the toggle again to hide additional fields
    fireEvent.click(screen.getByText(/Hide additional preferences/i));
    
    // Check that additional fields are no longer rendered
    expect(screen.queryByLabelText(/Specialization/i)).not.toBeInTheDocument();
  });
  
  it('submits the form with email only', async () => {
    // Mock the subscribe function to resolve successfully
    (subscribeToNewsletter as jest.Mock).mockResolvedValue({});
    
    render(<SubscribeForm />);
    
    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
    // Check that the subscribe function was called with the correct data
    await waitFor(() => {
      expect(subscribeToNewsletter).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });
    
    // Check that success message is shown
    await waitFor(() => {
      expect(screen.getByText(/Subscription successful/i)).toBeInTheDocument();
    });
  });
  
  it('shows error message when subscription fails', async () => {
    // Mock the subscribe function to reject with an error
    (subscribeToNewsletter as jest.Mock).mockRejectedValue(new Error('Subscription failed'));
    
    render(<SubscribeForm />);
    
    // Fill in the email field
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'test@example.com' },
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Subscribe/i }));
    
    // Check that error message is shown
    await waitFor(() => {
      expect(screen.getByText(/Failed to subscribe/i)).toBeInTheDocument();
    });
  });
});