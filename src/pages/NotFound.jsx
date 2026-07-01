import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <AnimatedSection className="text-center">
        <h1 className="text-9xl font-black text-bat-navy/10 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-bat-navy hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full transition-colors">
          Return Home
        </Link>
      </AnimatedSection>
    </div>
  );
};

export default NotFound;
