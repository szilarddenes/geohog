import SubscribeForm from '@/components/newsletter/SubscribeForm';

const CallToAction = () => {
  return (
    <div id="subscribe" className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Subscribe to our newsletter
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-500">
            Join over 2,000 geoscientists who receive our weekly digest of the latest research and industry developments.
            No spam, just high-quality content curated by experts.
          </p>
        </div>
        <div className="mt-8 w-full lg:mt-0 lg:ml-8 lg:w-1/2">
          <SubscribeForm />
          <p className="mt-3 text-sm text-gray-500">
            We'll never share your email with anyone else. You can unsubscribe at any time.
            See our <a href="/privacy" className="font-medium text-primary-800 underline">privacy policy</a> for more details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;