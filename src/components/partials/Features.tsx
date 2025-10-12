import React from 'react';
import featureImg from '../../assets/images/features.png';

const Features: React.FC = () => {
  return (
    <section className="w-full py-12 bg-primary">
      <h2 className="text-center text-white text-4xl font-extrabold mb-10 capitalize tracking-tight">
        Application Features
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6 md:px-0">
        
        {/* Image side */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src={featureImg}
            alt="Application Features Illustration"
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Text side */}
        <div className="md:w-1/2 text-white">
          <p className="font-semibold text-lg mb-6">
            Discover powerful features designed to streamline school management,
            empower educators, and enhance the student experience.
          </p>

          <ol className="list-decimal list-inside space-y-3 font-semibold text-lg">
            {[
              'Student Information Management',
              'Attendance Tracking',
              'Class Scheduling',
              'Teacher Dashboard',
              'Parent Communication',
              'Fee Management',
              'Grade Reports',
              'User Role Control',
              'Event & Notice Board',
              'Simple User Interface',
            ].map((feature, idx) => (
              <li
                key={idx}
                className="hover:underline transition duration-300 cursor-pointer"
                tabIndex={0} // makes it keyboard accessible
              >
                {feature}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Features;
