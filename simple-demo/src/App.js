import React from 'react';

function App() {
  return (
    <div className="app">
      {/* Navbar/Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <h2>Shubh<span>Utsav</span></h2>
          </div>
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-content">
          <h1>Create Memorable Celebrations with Elegance</h1>
          <p>From weddings to corporate events, we bring your vision to life with meticulous planning and exceptional execution.</p>
          <div>
            <a href="#services" className="btn">Our Services</a>
            <a href="#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <div className="services">
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Wedding" />
              </div>
              <div className="service-content">
                <h3>Wedding Planning</h3>
                <p>Comprehensive wedding planning services including haldi, mehndi, sangeet, and reception ceremonies.</p>
                <a href="#" className="service-link">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80" alt="Birthday Party" />
              </div>
              <div className="service-content">
                <h3>Birthday Celebrations</h3>
                <p>Creative birthday party planning for all ages with custom themes and entertainment options.</p>
                <a href="#" className="service-link">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-img">
                <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80" alt="Anniversary" />
              </div>
              <div className="service-content">
                <h3>Anniversary Events</h3>
                <p>Romantic anniversary celebration planning with personalized touches to commemorate your special day.</p>
                <a href="#" className="service-link">
                  Learn More 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section testimonials">
        <div className="container">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
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
            </div>
            
            <div className="testimonial-card">
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
            </div>
            
            <div className="testimonial-card">
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Plan Your Next Event?</h2>
          <p>Let us help you create a memorable celebration that reflects your style and vision.</p>
          <a href="#contact" className="btn">Contact Us Today</a>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="#home">Home</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#gallery">Gallery</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#">Wedding Planning</a></li>
                <li><a href="#">Birthday Celebrations</a></li>
                <li><a href="#">Anniversary Events</a></li>
                <li><a href="#">Corporate Functions</a></li>
                <li><a href="#">Baby Showers</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact Us</h3>
              <ul className="contact-info">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  <span>123 Event Street, Mumbai, India</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                  <span>+91 9876543210</span>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
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

      {/* WhatsApp Button */}
      <a href="https://wa.me/919876543210" className="whatsapp-btn" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;