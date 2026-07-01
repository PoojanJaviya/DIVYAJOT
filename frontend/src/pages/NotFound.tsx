import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-18">
    <div className="text-center px-6">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="font-poppins font-extrabold text-6xl text-teal-500 mb-4">404</h1>
      <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-3">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <Link to="/" className="btn-primary">Go to Home</Link>
        <Link to="/contact" className="btn-secondary">Contact Us</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
