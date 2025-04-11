import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Weddings', path: '/wedding' },
    { name: 'Birthdays', path: '/birthday' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="z-20">
            <h1 className={`text-2xl font-bold font-playfair ${scrolled ? 'text-dark-blue' : 'text-white'}`}>
              <span className="text-royal-gold">Celebration</span> Events
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className={`relative font-medium ${
                      scrolled ? 'text-gray-800' : 'text-white'
                    } hover:text-royal-gold transition-colors duration-300`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span 
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-gold"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button 
            className="block md:hidden z-20"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? (
              <FaTimes className={`text-2xl ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <FaBars className={`text-2xl ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>

          {/* Mobile Navigation Menu */}
          <motion.div 
            className={`fixed top-0 right-0 h-screen bg-dark-blue w-full z-10 flex flex-col justify-center items-center md:hidden ${
              isOpen ? 'block' : 'hidden'
            }`}
            initial={{ x: '100%' }}
            animate={{ x: isOpen ? 0 : '100%' }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col space-y-6 items-center">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link 
                    to={link.path} 
                    className="text-white text-2xl font-medium hover:text-royal-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link 
                  to="/contact" 
                  className="mt-6 px-6 py-3 bg-royal-gold text-white rounded-md hover:bg-opacity-90 transition duration-300 ease-in-out font-medium"
                >
                  Book Now
                </Link>
              </motion.li>
            </ul>
          </motion.div>

          {/* Call to Action Button */}
          <Link 
            to="/contact" 
            className="hidden md:block px-6 py-2 bg-royal-gold text-white rounded-md hover:bg-opacity-90 transition duration-300 ease-in-out font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;