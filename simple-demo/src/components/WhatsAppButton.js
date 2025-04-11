import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

/**
 * WhatsAppButton Component
 * 
 * A floating WhatsApp button that can be placed on any page for quick communication.
 * 
 * @param {Object} props
 * @param {string} props.phoneNumber - The WhatsApp number without country code
 * @param {string} props.message - Optional pre-filled message for WhatsApp
 * @param {string} props.position - Position of the button (bottom-right, bottom-left, fixed)
 * @param {string} props.className - Optional additional classes
 */
const WhatsAppButton = ({ 
  phoneNumber = "7318444187", 
  message = "Hello! I'm interested in your services.", 
  position = "bottom-right",
  className = ""
}) => {
  
  // Format the WhatsApp URL with phone number and encoded message
  const openWhatsApp = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Determine position class
  let positionClass = "whatsapp-btn-fixed";
  if (position === "bottom-right") {
    positionClass = "whatsapp-btn-bottom-right";
  } else if (position === "bottom-left") {
    positionClass = "whatsapp-btn-bottom-left";
  }
  
  return (
    <motion.button
      className={`whatsapp-floating-btn ${positionClass} ${className}`}
      onClick={openWhatsApp}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <FaWhatsapp className="whatsapp-icon-large" />
      <span className="whatsapp-tooltip">Chat with us!</span>
    </motion.button>
  );
};

export default WhatsAppButton;