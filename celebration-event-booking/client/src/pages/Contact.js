import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    venue: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your inquiry! We will contact you shortly to discuss your event needs.',
    });
    
    // Reset form after submission (in real app, this would happen after successful API call)
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        venue: '',
        message: '',
      });
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          message: '',
        });
      }, 5000);
    }, 500);
  };

  // Animation variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    out: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    in: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    out: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Event types
  const eventTypes = [
    { value: '', label: 'Select Event Type' },
    { value: 'wedding-haldi', label: 'Wedding - Haldi Ceremony' },
    { value: 'wedding-mehndi', label: 'Wedding - Mehndi Night' },
    { value: 'wedding-sangeet', label: 'Wedding - Sangeet Party' },
    { value: 'wedding-reception', label: 'Wedding - Reception' },
    { value: 'birthday-kids', label: 'Birthday - Kids' },
    { value: 'birthday-adults', label: 'Birthday - Adults' },
    { value: 'car-decoration', label: 'Car Decoration' },
    { value: 'tent-setup', label: 'Tent & Stage Setup' },
    { value: 'anniversary', label: 'Anniversary Celebration' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'other', label: 'Other Event' },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546552768-9e3a5e56a8e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')" }}></div>
        <div className="absolute inset-0 bg-dark-blue opacity-70"></div>
        <div className="relative container-custom">
          <motion.div className="max-w-2xl" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair">Contact Us</h1>
            <p className="text-xl text-white mb-8">
              Ready to discuss your event decoration needs? Get in touch with us to book a consultation or request a quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h2 className="text-2xl font-semibold font-playfair mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or ready to book your event? Contact us through any of the following methods, and our team will be happy to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-dark-blue rounded-full flex items-center justify-center text-white text-xl mr-4">
                    <FaPhone />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-playfair">Phone</h3>
                    <a href="tel:+911234567890" className="text-gray-600 hover:text-royal-gold transition-colors duration-300">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-dark-blue rounded-full flex items-center justify-center text-white text-xl mr-4">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-playfair">Email</h3>
                    <a href="mailto:info@celebrationevents.com" className="text-gray-600 hover:text-royal-gold transition-colors duration-300">
                      info@celebrationevents.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-dark-blue rounded-full flex items-center justify-center text-white text-xl mr-4">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-playfair">Address</h3>
                    <p className="text-gray-600">
                      123 Celebration Street,<br />
                      Mumbai, India 400001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold font-playfair">WhatsApp</h3>
                    <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-royal-gold transition-colors duration-300">
                      +91 123 456 7890
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Business Hours */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold font-playfair mb-4">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">10:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">By Appointment Only</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <h2 className="text-2xl font-semibold font-playfair mb-6">Book an Event</h2>
              
              {formStatus.submitted && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-md mb-6 ${formStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                >
                  {formStatus.message}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  
                  {/* Event Type */}
                  <div>
                    <label htmlFor="eventType" className="block text-gray-700 font-medium mb-2">Event Type *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold appearance-none"
                      >
                        {eventTypes.map((type, index) => (
                          <option key={index} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Event Date */}
                  <div>
                    <label htmlFor="eventDate" className="block text-gray-700 font-medium mb-2">Event Date *</label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                    />
                  </div>
                  
                  {/* Venue */}
                  <div>
                    <label htmlFor="venue" className="block text-gray-700 font-medium mb-2">Venue Location</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="venue"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                        placeholder="Event Venue"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Additional Details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-royal-gold focus:border-royal-gold"
                    placeholder="Tell us more about your event requirements..."
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    className="w-full py-3 px-6 bg-royal-gold text-white rounded-md hover:bg-opacity-90 transition duration-300 ease-in-out font-medium"
                  >
                    Submit Booking Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Google Maps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            variants={itemVariants}
          >
            <h2 className="section-title">Find Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visit our office to discuss your event details in person. We're conveniently located in the heart of the city.
            </p>
          </motion.div>
          
          <motion.div 
            className="h-96 rounded-lg overflow-hidden shadow-lg"
            variants={itemVariants}
          >
            {/* Google Maps embed would go here - this is a placeholder */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-600">Google Map will be embedded here</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;