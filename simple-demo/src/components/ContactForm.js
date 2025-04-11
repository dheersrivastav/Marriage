import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaWhatsapp } from 'react-icons/fa';

function ContactForm() {
  // WhatsApp phone number configuration - can be easily updated
  const WHATSAPP_PHONE = "7318444187"; // Default WhatsApp number
  
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

  // Function to send message to WhatsApp
  const sendToWhatsApp = () => {
    try {
      // Format the message for WhatsApp
      const message = `*New Booking Inquiry from Website*%0A
*Name:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Phone:* ${formData.phone}%0A
*Event Type:* ${formData.eventType}%0A
*Message:* ${formData.message}%0A
`;
      
      // Open WhatsApp with the pre-filled message
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      return true;
    } catch (error) {
      console.error("Error sending to WhatsApp:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First attempt to send via WhatsApp
      const whatsappSuccess = sendToWhatsApp();
      
      // Simulating network delay for form processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (whatsappSuccess) {
        toast.success('Your message has been sent successfully! Check WhatsApp to complete the conversation.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.info('Form submitted! If WhatsApp didn\'t open automatically, please contact us directly.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        eventType: 'wedding'
      });
    } catch (error) {
      toast.error('Failed to send message. Please try contacting us directly.', {
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
          className="submit-btn whatsapp-btn"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : (
            <>
              <FaWhatsapp className="whatsapp-icon" /> 
              Send via WhatsApp
            </>
          )}
        </motion.button>
        
        <p className="contact-note">
          <small>
            Your message will be sent to our WhatsApp business number for faster response.
            We typically respond within 1-2 hours during business hours.
          </small>
        </p>
      </form>
    </motion.div>
  );
}

export default ContactForm;