import React from 'react';
import { FaShieldAlt, FaUsers, FaRocket } from 'react-icons/fa';
import Team from '../../assets/images/team.jpg'
const About: React.FC = () => {
  return (
    <section className="bg-white text-gray-800">
      <div className="bg-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Scholarvio</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Simplifying education management through secure, intuitive, and powerful software solutions.
        </p>
      </div>
      <div className="py-16 px-6 container mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src={Team}
            alt="Our Team"
            className="rounded-lg shadow-md w-full"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-primary mb-4">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            Scholarvio is built by a team of educators, designers, and developers dedicated to transforming how schools operate. 
            We understand the pain points of traditional school systems and aim to solve them with modern, intuitive tools.
          </p>
        </div>
      </div>
      <div className="bg-gray-50 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Why Choose Scholarvio?</h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            We provide the features that matter most to educators, administrators, and parents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <FaShieldAlt className="text-primary text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Secure & Reliable</h4>
            <p className="text-gray-600 text-sm">
              Enterprise-grade security, real-time backups, and role-based access ensure your data is always safe.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <FaUsers className="text-primary text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Community Focused</h4>
            <p className="text-gray-600 text-sm">
              Built with feedback from real schools and educators to ensure every feature meets a real-world need.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <FaRocket className="text-primary text-3xl mb-4" />
            <h4 className="text-xl font-semibold mb-2">Fast & User Friendly</h4>
            <p className="text-gray-600 text-sm">
              Simple interfaces, fast load times, and mobile compatibility for seamless management anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-primary text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to modernize your school?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Join hundreds of schools already using Scholarvio to streamline their daily operations and improve academic outcomes.
        </p>
        <button className="bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
          Explore Features
        </button>
      </div>
    </section>
  );
};

export default About;
