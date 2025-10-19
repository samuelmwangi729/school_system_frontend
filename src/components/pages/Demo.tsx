import React from 'react';
import DemoImg from '../../assets/images/demo.png'
const Demo: React.FC = () => {
  return (
    <section className="min-h-screen bg-white py-16 px-6">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left: Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-primary mb-4">Request a Free Demo</h2>
          <p className="text-gray-600 mb-6">
            See how scholarvio can help streamline your school’s operations. Fill in the form and our team will get in touch to schedule a personalized demo.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <input
                type="text"
                placeholder="Springfield High School"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                rows={4}
                placeholder="Let us know what you're looking for..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition duration-300"
            >
              Request Demo
            </button>
          </form>
        </div>

        <div className="hidden md:block">
          <img
            src={DemoImg}
            alt="demo requesting image "
            className=" w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Demo;
