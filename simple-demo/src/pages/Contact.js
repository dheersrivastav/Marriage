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
                      <p>Paramatpur Kalikuti Mahiyar Devi Road, Jaunpur</p>
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
                      <h4>New Basanti Flower Decoration</h4>
                      <p>Sandeep Mali</p>
                      <p>+91 7081599511</p>
                      <p>+91 7007765881</p>
                      <p>sm4419218@gmail.com</p>
                      <p>Address: Paramatpur Kalikuti Mahiyar Devi Road, Jaunpur</p>
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
              <iframe
                title="ShubhUtsav Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28881.771306372687!2d82.67083177431646!3d25.775534999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991fc74a59d8def%3A0x7c6e3a5c8d5d1f41!2sOlanganj%2C%20Jaunpur%2C%20Uttar%20Pradesh%20222002!5e0!3m2!1sen!2sin!4v1644361823387!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0, borderRadius: '10px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-overlay">
                <div className="particles-overlay"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;