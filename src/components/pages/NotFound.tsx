import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../assets/images/not_found.png'
const NotFound: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center bg-white p-8 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-8">
        
        <div className="w-full md:w-1/2">
          <img
            src={NotFoundImg}
            alt="Page Not Found"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 text-gray-800 space-y-6">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! The page you are looking for doesn’t exist or has been moved.
            Let’s get you back on track.
          </p>

          <Link to="/">
            <button className="mt-4 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
