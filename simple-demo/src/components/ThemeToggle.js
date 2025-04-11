import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function ThemeToggle({ isDarkMode, toggleTheme }) {
  const handleToggle = () => {
    toggleTheme();
    
    toast.info(`Theme switched to ${isDarkMode ? 'Light' : 'Dark'} Mode`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <motion.div
      className="theme-toggle"
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </motion.div>
  );
}

export default ThemeToggle;