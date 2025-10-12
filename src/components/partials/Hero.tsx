import React from 'react';
import HeroImg from '../../assets/images/Hero.jpg';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center md:gap-6 bg-white px-6 md:h-[75vh] py-10">
      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <div className="flex flex-col md:gap-2 gap-2 max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold lg:text-6xl text-[#8071F2] transition-all duration-300">
            Unlock School Management with Premium School ERP Software
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Streamline your school's operations with our all-in-one ERP solution. Designed for efficiency, clarity, and ease of use, our platform empowers educators and administrators to focus on what truly matters—student success.
          </p>
          <Link to="/about" aria-label="Learn more about our ERP software">
            <button className="bg-[#8071F2] text-white px-6 py-3 rounded-md hover:bg-[#6b5bd3] transition-all duration-300 font-medium">
              Start Exploring
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:block w-full md:w-1/2">
        <img
          src={HeroImg}
          alt="School ERP software interface on screen"
          className="w-full h-[70vh] object-cover "
        />
      </div>
    </section>
  );
};

export default Hero;