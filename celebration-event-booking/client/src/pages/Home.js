import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPhoneAlt, FaMapMarkerAlt, FaImages } from 'react-icons/fa';

// Components
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialSlider from '../components/TestimonialSlider';

const Home = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="section-title">Making Your Special Moments Unforgettable</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Celebration Events, we believe every special occasion deserves extraordinary decorations. With over 10 years of experience, we've been transforming venues into magical spaces for weddings, birthdays, and all kinds of celebrations.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team of creative designers works closely with you to understand your vision and bring it to life with attention to every detail, ensuring your event is exactly as you dreamed it would be.
              </p>
              <div className="mt-8">
                <Link 
                  to="/contact" 
                  className="btn-primary"
                >
                  Book a Consultation
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="rounded-lg overflow-hidden h-64 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                  alt="Wedding Decoration" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="rounded-lg overflow-hidden h-64 transform hover:scale-105 transition-transform duration-300 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                  alt="Birthday Decoration" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="rounded-lg overflow-hidden h-64 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1522673607200-164d1b7ce1a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                  alt="Car Decoration" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div variants={fadeInUp} className="rounded-lg overflow-hidden h-64 transform hover:scale-105 transition-transform duration-300 mt-8">
                <img 
                  src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                  alt="Tent Decoration" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-dark-blue">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">Why Choose Us</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We're committed to creating extraordinary events that exceed your expectations.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-lg p-8 text-center shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center text-white text-3xl">
                  <FaCalendarAlt />
                </div>
              </div>
              <h3 className="text-xl font-semibold font-playfair mb-3">Custom Designs</h3>
              <p className="text-gray-600">
                We create personalized designs tailored to your vision, theme, and preferences.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-lg p-8 text-center shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center text-white text-3xl">
                  <FaPhoneAlt />
                </div>
              </div>
              <h3 className="text-xl font-semibold font-playfair mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated team is always available to address any concerns and provide assistance.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-lg p-8 text-center shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center text-white text-3xl">
                  <FaMapMarkerAlt />
                </div>
              </div>
              <h3 className="text-xl font-semibold font-playfair mb-3">Any Location</h3>
              <p className="text-gray-600">
                We provide our services across the city, transforming any venue into a celebration space.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div 
              className="bg-white rounded-lg p-8 text-center shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-royal-gold rounded-full flex items-center justify-center text-white text-3xl">
                  <FaImages />
                </div>
              </div>
              <h3 className="text-xl font-semibold font-playfair mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the finest materials and décor elements to ensure exceptional quality.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Call to Action Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-dark-blue to-maroon rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
                  Ready to Create Your Dream Celebration?
                </h2>
                <p className="text-lg text-gray-200 mb-8">
                  Contact us today to discuss your event requirements and get a free consultation. Let's make your celebration truly magical!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/contact" 
                    className="btn-primary bg-royal-gold"
                  >
                    Book Now
                  </Link>
                  <Link 
                    to="/gallery" 
                    className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-md hover:bg-white hover:text-dark-blue transition duration-300 ease-in-out"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                  alt="Celebration Event" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark-blue opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;