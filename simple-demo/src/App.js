import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaPinterestP, 
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';
import Gallery from './components/Gallery';
import About from './components/About';
import ThemeToggle from './components/ThemeToggle';
import VideoBackground from './components/VideoBackground';
import ServiceDetail from './components/ServiceDetail';
import MobileNav from './components/MobileNav';
import WhatsAppButton from './components/WhatsAppButton';
import Contact from './pages/Contact';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Wedding video URLs
  const heroVideoUrl = "https://cdn.coverr.co/videos/coverr-an-indian-wedding-ceremony-2683/1080p.mp4";
  const middleVideoUrl = "https://cdn.coverr.co/videos/coverr-traditional-indian-wedding-4386/1080p.mp4";
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
        
        {/* WhatsApp Floating Button for quick contact */}
        <WhatsAppButton 
          phoneNumber="7318444187"
          message="Hello! I'm interested in discussing my event planning needs. Please contact me."
          position="bottom-right"
        />
        
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
            
            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </motion.header>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with Video Background */}
              <section id="home" className="hero">
                {/* Video Background Component */}
                <VideoBackground videoUrl={heroVideoUrl} fallbackImageUrl={fallbackImageUrl} />
                
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
                    className="section-title animated-heading"
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
                    className="section-title animated-heading"
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

              {/* Video Showcase Section */}
              <section className="py-20 bg-gradient-to-r from-dark-blue/10 to-royal-gold/10">
                <div className="container">
                  <motion.h2 
                    className="section-title mb-12 animated-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Our Magical Moments
                  </motion.h2>
                  <motion.div 
                    className="video-showcase relative rounded-xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <VideoBackground 
                      videoUrl={middleVideoUrl}
                      fallbackImageUrl="https://images.unsplash.com/photo-1519225421980-715cb0215aed"
                    />
                  </motion.div>
                </div>
              </section>

              {/* Gallery Preview Section */}
              <Gallery />

              {/* CTA Section */}
              <section className="cta">
                <div className="container">
                  <motion.h2
                    className="animated-heading"
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={
            <section className="services-page">
              <div className="container py-20">
                <h1 className="section-title mb-10">Our Services</h1>
                <p className="text-center mb-16 max-w-3xl mx-auto">
                  We offer a wide range of celebration services tailored to meet your specific needs.
                  Explore our popular services below or contact us for custom requirements.
                </p>
                <div className="services">
                  <div className="service-card">
                    <div className="service-img">
                      <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Wedding" />
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
                  </div>
                  
                  <div className="service-card">
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
                  </div>
                  
                  <div className="service-card">
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
                  </div>

                  <div className="service-card">
                    <div className="service-img">
                      <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1089" alt="Corporate Events" />
                    </div>
                    <div className="service-content">
                      <h3>Corporate Events</h3>
                      <p>Professional corporate event planning including conferences, seminars, and team building activities.</p>
                      <Link to="/services/corporate" className="service-link">
                        Learn More 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  <div className="service-card">
                    <div className="service-img">
                      <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1050" alt="Destination Events" />
                    </div>
                    <div className="service-content">
                      <h3>Destination Events</h3>
                      <p>Create unforgettable memories with our destination event planning services at exotic locations.</p>
                      <Link to="/services/destination" className="service-link">
                        Learn More 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          } />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/services/corporate" element={<ServiceDetail />} />
          <Route path="/services/destination" element={<ServiceDetail />} />
        </Routes>

        {/* Footer with Gradient Background */}
        <footer id="contact" className="footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-section">
                <div className="footer-logo">Shubh<span>Utsav</span></div>
                <p>Creating memorable celebrations with elegance and precision. Your vision, our expertise.</p>
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
              
              <div className="footer-section">
                <h3 className="animated-heading">Quick Links</h3>
                <ul className="footer-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/gallery">Gallery</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="animated-heading">Services</h3>
                <ul className="footer-links">
                  <li><Link to="/services/wedding">Wedding Planning</Link></li>
                  <li><Link to="/services/birthday">Birthday Celebrations</Link></li>
                  <li><Link to="/services/anniversary">Anniversary Events</Link></li>
                  <li><Link to="/services/corporate">Corporate Functions</Link></li>
                  <li><Link to="/services/baby-shower">Baby Showers</Link></li>
                </ul>
              </div>
              
              <div className="footer-section">
                <h3 className="animated-heading">Contact Us</h3>
                <ul className="contact-info">
                  <li>
                    <FaMapMarkerAlt />
                    <span>123 Event Street, Mumbai, India</span>
                  </li>
                  <li>
                    <FaPhoneAlt />
                    <span>+91 9876543210</span>
                  </li>
                  <li>
                    <FaEnvelope />
                    <span>info@shubhutsav.com</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="copyright">
              &copy; 2025 ShubhUtsav. All Rights Reserved.
            </div>
          </div>
        </footer>

        
      </div>
    </Router>
  );
}

export default App;