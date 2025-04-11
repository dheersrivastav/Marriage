import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventType: 'wedding'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating API request
    try {
      // In a real application, this would be an actual API call
      // await axios.post('/api/contact', formData);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your message has been sent successfully!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        eventType: 'wedding'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="contact-form-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="form-title">Send Us a Message</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            type="text"
            name="name"
            id="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            type="email"
            name="email"
            id="email"
            placeholder="Your Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            type="tel"
            name="phone"
            id="phone"
            placeholder="Your Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <motion.select
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            name="eventType"
            id="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="form-control"
          >
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday</option>
            <option value="anniversary">Anniversary</option>
            <option value="corporate">Corporate Event</option>
            <option value="other">Other</option>
          </motion.select>
        </div>
        
        <div className="form-group">
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            name="message"
            id="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            required
            className="form-control"
            rows="4"
          />
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="submit-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default ContactForm;