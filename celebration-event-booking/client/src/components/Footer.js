import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/">
              <h2 className="text-3xl font-bold font-playfair">
                <span className="text-royal-gold">Celebration</span> Events
              </h2>
            </Link>
            <p className="text-gray-300">
              We create beautiful decorations for weddings, birthdays, and special events. Our mission is to make your celebrations unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-royal-gold transition-colors duration-300">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-royal-gold transition-colors duration-300">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-royal-gold transition-colors duration-300">
                <FaTwitter />
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-royal-gold transition-colors duration-300">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 font-playfair">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Wedding Decorations
                </Link>
              </li>
              <li>
                <Link to="/birthday" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Birthday Events
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 font-playfair">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Haldi Ceremony Decorations
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Mehndi Night Setup
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Sangeet Party Arrangements
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Wedding Reception Decor
                </Link>
              </li>
              <li>
                <Link to="/birthday" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  Birthday Party Decorations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 font-playfair">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaPhone className="text-royal-gold mt-1 mr-3" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="text-royal-gold mt-1 mr-3" />
                <a href="mailto:info@celebrationevents.com" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  info@celebrationevents.com
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-royal-gold mt-1 mr-3" />
                <span className="text-gray-300">
                  123 Celebration Street,<br />
                  Mumbai, India 400001
                </span>
              </li>
              <li className="flex items-start">
                <FaWhatsapp className="text-royal-gold mt-1 mr-3" />
                <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-royal-gold transition-colors duration-300">
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black/30 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {currentYear} Celebration Events. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-royal-gold transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-royal-gold transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;