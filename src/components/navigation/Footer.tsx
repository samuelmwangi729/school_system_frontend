import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png'
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-700 text-white py-10">
      <div className="w-[80%] m-auto mt-5 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <NavLink
            to="/"
            className=""
          >
            <img src={Logo} alt="Scholarvio Logo" className='h-20 w-30'  />
          </NavLink>
          <p className="mt-2 text-md text-gray-400">
            Empowering schools with smart, secure, and simple management tools.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="portfolio" className="hover:text-white transition">Portfolio</a></li>
            <li><a href="demo" className="hover:text-white transition">Demo</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-primary transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-primary transition"><FaTwitter /></a>
            <a href="#" className="hover:text-primary transition"><FaLinkedinIn /></a>
            <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
          </div>
          <div className='mt-5'>
            <form action="" className='flex flex-col gap-2 md:w-full sm:w-3/4'>
              <span>
                Subscribe to  our newsletter
              </span>
              <input type="text" placeholder='enter your email here' className='border bg-white text-black placeholder:text-black px-2' />
              <button className='bg-primary'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white pt-6 text-center text-sm text-gray-500">
        <div>
          © {new Date().getFullYear()} Scholarvio. All rights reserved. made with love by Mwangi S.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
