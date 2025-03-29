import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { subscribeToNewsletter } from '@/lib/firebase/newsletter';

const SubscribeForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await subscribeToNewsletter(data);
      setSubscriptionSuccess(true);
      reset();
    } catch (err) {
      setError('Failed to subscribe. Please try again later.');
      console.error('Subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (subscriptionSuccess) {
    return (
      <div className="bg-green-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Subscription successful!</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Thank you for subscribing. You'll start receiving our newsletter according to your preferences.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Subscription error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="input"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <button 
          type="button"
          className="text-sm text-primary-800 font-medium hover:text-primary-700"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide' : 'Show'} additional preferences (optional)
        </button>
      </div>

      {showDetails && (
        <div className="space-y-4">
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
              Specialization
            </label>
            <select
              id="specialization"
              className="input"
              {...register('specialization')}
            >
              <option value="">Select a specialization</option>
              <option value="petroleum_geology">Petroleum Geology</option>
              <option value="mining_geology">Mining Geology</option>
              <option value="hydrogeology">Hydrogeology</option>
              <option value="geophysics">Geophysics</option>
              <option value="environmental_geology">Environmental Geology</option>
              <option value="engineering_geology">Engineering Geology</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Professional Role
            </label>
            <select
              id="role"
              className="input"
              {...register('role')}
            >
              <option value="">Select a role</option>
              <option value="student">Student</option>
              <option value="researcher">Researcher</option>
              <option value="professor">Professor</option>
              <option value="industry_professional">Industry Professional</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
              Geographic Region
            </label>
            <select
              id="region"
              className="input"
              {...register('region')}
            >
              <option value="">Select a region</option>
              <option value="north_america">North America</option>
              <option value="south_america">South America</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="oceania">Oceania</option>
              <option value="middle_east">Middle East</option>
            </select>
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary py-3"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
};

export default SubscribeForm;