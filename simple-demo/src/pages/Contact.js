import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebookF, 
  FaInstagram,
  FaPinterestP,
  FaYoutube
} from 'react-icons/fa';

function Contact() {
  return (
    <section id="contact-page" className="contact-page-section">
      <div className="container">
        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact-header">
            <motion.h1 
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-center mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We'd love to hear from you! Feel free to reach out with any questions about our services or to book a consultation for your upcoming event.
            </motion.p>
          </div>
          
          <div className="contact-content">
            <motion.div 
              className="contact-info-container"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="contact-info-card">
                <h3>Contact Information</h3>
                <p>We'll turn your celebration vision into reality. Reach out to us through any of the following:</p>
                
                <ul className="contact-info-list">
                  <motion.li 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="contact-text">
                      <h4>Address</h4>
                      <p>123 Event Street, Mumbai, Maharashtra, India</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">
                      <FaPhone />
                    </div>
                    <div className="contact-text">
                      <h4>Phone</h4>
                      <p>+91 9876543210</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">
                      <FaEnvelope />
                    </div>
                    <div className="contact-text">
                      <h4>Email</h4>
                      <p>info@shubhutsav.com</p>
                    </div>
                  </motion.li>
                  
                  <motion.li 
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="contact-icon">
                      <FaClock />
                    </div>
                    <div className="contact-text">
                      <h4>Office Hours</h4>
                      <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                      <p>Sunday: By Appointment Only</p>
                    </div>
                  </motion.li>
                </ul>
                
                <div className="contact-social">
                  <h4>Follow Us</h4>
                  <div className="social-media-footer">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaInstagram />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaPinterestP />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                      <FaYoutube />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="contact-form-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </div>
          
          <motion.div 
            className="contact-map-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-center my-10">Our Location</h3>
            <div className="map-container">
              <div className="map-placeholder">
                <p>Map location will be displayed here.</p>
                <small>For implementation, integrate Google Maps API or embed an iframe map.</small>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;