import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from './components/Gallery';
import About from './components/About';
import ContactForm from './components/ContactForm';
import ThemeToggle from './components/ThemeToggle';
import VideoBackground from './components/VideoBackground';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  // Wedding video URL (you'll need to replace this with your actual video URL)
  const weddingVideoUrl = "https://assets.mixkit.co/videos/preview/mixkit-toast-being-raised-at-a-wedding-ceremony-40009-large.mp4";
  // Fallback image if video can't load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80";
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  useEffect(() => {
    // Show a welcome toast when the page first loads
    toast.success('Welcome to ShubhUtsav - Your Celebration Partner!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // Apply dark mode class to body when state changes
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* Theme Toggle Button */}
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        {/* Toast Container for Notifications */}
        <ToastContainer />
        
        {/* Navbar/Header */}
        <motion.header 
          className="header"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container header-content">
            <motion.div 
              className="logo"
              whileHover={{ scale: 1.05 }}
            >
              <h2>Shubh<span>Utsav</span></h2>
            </motion.div>
            <nav className="desktop-nav">
              <ul className="nav-links">
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/">Home</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/services">Services</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/gallery">Gallery</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/about">About</Link>
                </motion.li>
                <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/contact">Contact</Link>
                </motion.li>
              </ul>
            </nav>
          </div>
        </motion.header>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with Video Background */}
              <section id="home" className="hero">
                {/* Video Background Component */}
                <VideoBackground videoUrl={weddingVideoUrl} fallbackImageUrl={fallbackImageUrl} />
                
                <div className="container hero-content">
                  <motion.h1 
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="fade-in-up"
                  >
                    Create Memorable Celebrations with Elegance
                  </motion.h1>
                  <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="fade-in-up" 
                  >
                    From weddings to corporate events, we bring your vision to life with meticulous planning and exceptional execution.
                  </motion.p>
                  <motion.div
                    variants={staggerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={textVariants} className="fade-in-up">
                      <Link to="/services" className="btn">Our Services</Link>
                      <Link to="/contact" className="btn btn-outline">Contact Us</Link>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Services Section */}
              <section id="services" className="section">
                <div className="container">
                  <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Our Services
                  </motion.h2>
                  <motion.div 
                    className="services"
                    variants={staggerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <motion.div 
                      className="service-card"
                      variants={textVariants}
                    >
                      <div className="service-img">
                        <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Wedding" />
                      </div>
                      <div className="service-content">
                        <h3>Wedding Planning</h3>
                        <p>Comprehensive wedding planning services including haldi, mehndi, sangeet, and reception ceremonies.</p>
                        <Link to="/services/wedding" className="service-link">
                          Learn More 
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="service-card"
                      variants={textVariants}
                    >
                      <div className="service-img">
                        <img src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80" alt="Birthday Party" />
                      </div>
                      <div className="service-content">
                        <h3>Birthday Celebrations</h3>
                        <p>Creative birthday party planning for all ages with custom themes and entertainment options.</p>
                        <Link to="/services/birthday" className="service-link">
                          Learn More 
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="service-card"
                      variants={textVariants}
                    >
                      <div className="service-img">
                        <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Anniversary" />
                      </div>
                      <div className="service-content">
                        <h3>Anniversary Events</h3>
                        <p>Romantic anniversary celebration planning with personalized touches to commemorate your special day.</p>
                        <Link to="/services/anniversary" className="service-link">
                          Learn More 
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Testimonials Section */}
              <section id="testimonials" className="section testimonials">
                <div className="container">
                  <motion.h2 
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    What Our Clients Say
                  </motion.h2>
                  <motion.div 
                    className="testimonial-grid"
                    variants={staggerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    <motion.div 
                      className="testimonial-card"
                      variants={textVariants}
                      whileHover={{ y: -10 }}
                    >
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Client" />
                        </div>
                        <div className="client-details">
                          <h4>Priya Sharma</h4>
                          <p>Wedding Client</p>
                          <div className="stars">★★★★★</div>
                        </div>
                      </div>
                      <p className="testimonial-text">
                        "ShubhUtsav transformed our wedding into a magical experience. Their attention to detail and creative ideas made our day truly special. The mehndi and haldi ceremonies were beautifully arranged!"
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="testimonial-card"
                      variants={textVariants}
                      whileHover={{ y: -10 }}
                    >
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Client" />
                        </div>
                        <div className="client-details">
                          <h4>Rahul Patel</h4>
                          <p>Anniversary Event</p>
                          <div className="stars">★★★★★</div>
                        </div>
                      </div>
                      <p className="testimonial-text">
                        "We hired ShubhUtsav for our 25th anniversary celebration, and they exceeded our expectations. The venue decoration and catering arrangements were perfect. Highly recommended!"
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="testimonial-card"
                      variants={textVariants}
                      whileHover={{ y: -10 }}
                    >
                      <div className="client-info">
                        <div className="client-img">
                          <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Client" />
                        </div>
                        <div className="client-details">
                          <h4>Ananya Gupta</h4>
                          <p>Birthday Party</p>
                          <div className="stars">★★★★★</div>
                        </div>
                      </div>
                      <p className="testimonial-text">
                        "The team at ShubhUtsav organized a wonderful birthday party for my daughter. The themed decorations, activities, and catering were all fantastic. The kids had a blast!"
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </section>

              {/* Gallery Preview Section */}
              <Gallery />

              {/* CTA Section */}
              <section className="cta">
                <div className="container">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Ready to Plan Your Next Event?
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Let us help you create a memorable celebration that reflects your style and vision.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Link to="/contact" className="btn">Contact Us Today</Link>
                  </motion.div>
                </div>
              </section>
            </>
          } />
          
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={
            <section className="section">
              <div className="container">
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Contact Us
                </motion.h2>
                <motion.p
                  className="text-center mb-10 max-w-3xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.
                </motion.p>
                
                <div className="float">
                  <ContactForm />
                </div>
              </div>
            </section>
          } />
        </Routes>

        {/* Footer with Contact Form */}
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <div className="footer-logo">Shubh<span>Utsav</span></div>
                <p>Creating memorable celebrations with elegance and precision. Your vision, our expertise.</p>
              </div>
              
              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Services</h3>
                <ul className="footer-links">
                  <li><Link to="/services/wedding">Wedding Planning</Link></li>
                  <li><Link to="/services/birthday">Birthday Celebrations</Link></li>
                  <li><Link to="/services/anniversary">Anniversary Events</Link></li>
                  <li><Link to="/services/corporate">Corporate Functions</Link></li>
                  <li><Link to="/services/baby-shower">Baby Showers</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3>Contact Us</h3>
                <ul className="contact-info">
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 Event Street, Mumbai, India</span>
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <span>+91 9876543210</span>
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>info@shubhutsav.com</span>
                  </li>
                </ul>
              </div>
              
              {/* Contact Form in Footer */}
              <div className="footer-section">
                <ContactForm />
              </div>
            </div>
            
            <div className="copyright">
              &copy; 2025 ShubhUtsav. All Rights Reserved.
            </div>
          </div>
        </footer>

        {/* WhatsApp Button */}
        <motion.a 
          href="https://wa.me/919876543210" 
          className="whatsapp-btn" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <i className="fab fa-whatsapp"></i>
        </motion.a>
      </div>
    </Router>
  );
}

export default App;