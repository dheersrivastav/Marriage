import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const ServicesSection = () => {
  // Services data
  const services = [
    {
      title: "Wedding Decorations",
      description: "Transform your wedding venue into a breathtaking space with our elegant decorations for ceremonies, receptions, and all pre-wedding events.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      link: "/wedding"
    },
    {
      title: "Birthday Celebrations",
      description: "Create magical birthday parties with our vibrant and creative themes, perfect for both children and adults.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      link: "/birthday"
    },
    {
      title: "Car Decorations",
      description: "Make your special journey memorable with our elegant car decorations for weddings and other significant occasions.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b7ce1a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      link: "/car-decoration"
    },
    {
      title: "Tent & Stage Setup",
      description: "Create the perfect ambiance with our custom tent decorations and stage setups for outdoor and indoor events.",
      image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
      link: "/tent-setup"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            Our Celebration Services
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We offer a wide range of decoration services to make your special occasions truly memorable. From weddings to birthdays, we've got you covered.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold font-playfair mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-royal-gold hover:text-dark-blue transition-colors duration-300"
                >
                  Learn More <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/services" 
            className="btn-primary"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;