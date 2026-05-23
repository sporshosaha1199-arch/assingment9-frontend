import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <title>Page Not Found | DocAppoint</title>
      </Helmet>
      <div className="text-brand-500 font-extrabold text-9xl mb-4">404</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Oops! Page not found</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg shadow-sm transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
