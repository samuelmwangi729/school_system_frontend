import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
            Login
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-600">
          <Link to="/reset" className="text-primary hover:underline">Forgot password?</Link>
        </div>

        <div className="text-sm text-center mt-2 text-gray-600">
          Don’t have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
