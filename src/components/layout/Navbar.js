import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation Links */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="Home" className="flex items-center">
                <span className="sr-only">GeoHog</span>
                <div className="h-8 w-8 relative mr-2">
                  <Image 
                    src="/logo.svg" 
                    alt="GeoHog Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-primary-900">GeoHog</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-6 sm:items-center">
              <Link href="/newsletter" className="text-gray-700 hover:text-primary-800 font-medium">
                Newsletter
              </Link>
              <Link href="/research" className="text-gray-700 hover:text-primary-800 font-medium">
                Research Assistant
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-800 font-medium">
                About
              </Link>
            </div>
          </div>

          {/* Right Side Links and Buttons */}
          <div className="hidden sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/admin" className="text-gray-700 hover:text-primary-800 font-medium">
                  Admin
                </Link>
                <button
                  onClick={() => logout()}
                  className="btn btn-secondary"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/#subscribe" className="btn btn-primary">
                  Subscribe
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              href="/newsletter"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Newsletter
            </Link>
            <Link 
              href="/research"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Research Assistant
            </Link>
            <Link 
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link 
                  href="/admin"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-800 hover:bg-gray-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link 
                href="/#subscribe"
                className="block px-3 py-2 text-base font-medium text-primary-800 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Subscribe
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;