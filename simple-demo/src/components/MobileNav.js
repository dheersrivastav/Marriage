import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      x: 20
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="mobile-nav-container">
      <button 
        className="mobile-nav-toggle" 
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          >
            <motion.div 
              className="mobile-nav-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div className="mobile-nav-header">
                <h2 className="mobile-nav-logo">Shubh<span>Utsav</span></h2>
                <button 
                  className="mobile-nav-close" 
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </motion.div>

              <motion.nav className="mobile-nav-links">
                <ul>
                  <motion.li variants={linkVariants}>
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/services" onClick={toggleMenu}>Services</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/gallery" onClick={toggleMenu}>Gallery</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/about" onClick={toggleMenu}>About</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                  </motion.li>
                </ul>
              </motion.nav>

              <motion.div className="mobile-nav-services" variants={linkVariants}>
                <h3 className="animated-heading">Popular Services</h3>
                <ul>
                  <motion.li variants={linkVariants}>
                    <Link to="/services/wedding" onClick={toggleMenu}>Wedding Planning</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/services/birthday" onClick={toggleMenu}>Birthday Celebrations</Link>
                  </motion.li>
                  <motion.li variants={linkVariants}>
                    <Link to="/services/anniversary" onClick={toggleMenu}>Anniversary Events</Link>
                  </motion.li>
                </ul>
              </motion.div>

              <motion.div className="mobile-nav-contact" variants={linkVariants}>
                <Link to="/contact" className="btn" onClick={toggleMenu}>
                  Book Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;