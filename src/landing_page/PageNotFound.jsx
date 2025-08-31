import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">Oops! Page not found.</p>
      <p className="text-md text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition"
      >
        Go back home
      </Link>
    </section>
  );
}

export default PageNotFound;
