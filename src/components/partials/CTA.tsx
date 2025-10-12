import React from 'react';
import CTAImg from '../../assets/images/cta.png';
import CTAImg1 from '../../assets/images/cta1.png';

const CTA: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-6">
        {/* Image Section */}
        <div className="hidden  md:flex flex-col md:flex-row md:w-3/4 gap-4">
          <div className="md:w-2/3 w-full">
            <img
              src={CTAImg}
              alt="Illustration showcasing app features"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="md:w-1/3 w-full">
            <img
              src={CTAImg1}
              alt="Mobile app download graphic"
              className="w-full h-50 md:h-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Text & Button */}
        <div className="md:w-1/4 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-snug text-inknut">
            Download the app for limitless possibilities
          </h2>
          <button className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition duration-300">
            Download Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
