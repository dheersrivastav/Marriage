import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')" }} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-blue/80 to-dark-blue/50" />
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 font-playfair leading-tight"
            variants={itemVariants}
          >
            Creating <span className="text-royal-gold">Magical</span> Moments for Your Special Events
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-white mb-10 max-w-2xl"
            variants={itemVariants}
          >
            Transform your celebrations with our stunning decoration services for weddings, birthdays, and all special occasions. We bring your vision to life with exquisite designs and meticulous attention to detail.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <Link 
              to="/contact" 
              className="btn-primary"
            >
              Book a Consultation
            </Link>
            <Link 
              to="/gallery" 
              className="px-6 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-dark-blue transition duration-300 ease-in-out"
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p className="text-sm mb-2">Scroll Down</p>
        <motion.div 
          className="w-1 h-10 bg-white/40 rounded-full overflow-hidden"
          initial={{ opacity: 1 }}
        >
          <motion.div 
            className="w-full bg-royal-gold"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ 
              repeat: Infinity,
              repeatType: "loop",
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;