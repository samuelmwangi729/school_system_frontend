import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="container mx-auto max-w-6xl bg-white rounded-lg shadow-xl p-10 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight text-primary">
            Get in Touch
          </h2>
          <p className="text-gray-700 max-w-md leading-relaxed">
            Whether you have questions about our features, pricing, or want to schedule a demo, our dedicated team is here to assist you.
          </p>

          <div className="space-y-6 text-gray-800">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-primary text-white rounded-full shadow-lg">
                <FaEnvelope className="text-2xl" />
              </div>
              <div>
                <p className="text-lg font-semibold">Email</p>
                <a href="mailto:contact@scholarvio.com" className="text-primary hover:underline">
                  contact@scholarvio.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="p-3 bg-primary text-white rounded-full shadow-lg">
                <FaPhoneAlt className="text-2xl" />
              </div>
              <div>
                <p className="text-lg font-semibold">Phone</p>
                <a href="tel:+15551234567" className="text-primary hover:underline">
                  +1 (555) 123-4567
                </a>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <div className="p-3 bg-primary text-white rounded-full shadow-lg">
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <div>
                <p className="text-lg font-semibold">Address</p>
                <address className="not-italic text-gray-700">
                  1234 Edu Lane, Smart City, World 56789
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-primary">Send Us a Message</h3>
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full border border-gray-300 rounded-md px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full border border-gray-300 rounded-md px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition resize-none"
                placeholder="Your message..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary text-white font-semibold w-full py-3 rounded-md shadow-md hover:bg-primary-dark transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
