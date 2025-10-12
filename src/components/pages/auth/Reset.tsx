import React from 'react';

const ResetPassword: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
