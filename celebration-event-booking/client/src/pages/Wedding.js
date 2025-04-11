import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';

const Wedding = () => {
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

  // Wedding packages
  const weddingPackages = [
    {
      title: "Haldi Ceremony",
      price: "₹25,000",
      description: "Vibrant yellow-themed decorations perfect for the traditional Haldi ceremony.",
      features: [
        "Yellow marigold flower decorations",
        "Traditional seating arrangement for family",
        "Floral backdrop for photographs",
        "Yellow drapes and fabric decorations",
        "Coordinated props for ceremony"
      ],
      image: "https://images.unsplash.com/photo-1600496761449-2fd00f258f1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Mehndi Night",
      price: "₹35,000",
      description: "Colorful and vibrant decorations to set the perfect mood for the Mehndi night.",
      features: [
        "Colorful drapes and fairy lights",
        "Seating arrangement for guests and mehendi artists",
        "Decorated mehndi plates and accessories",
        "Rajasthani umbrella decorations",
        "Photo booth with props"
      ],
      image: "https://images.unsplash.com/photo-1611516491426-03025e6043c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Sangeet Party",
      price: "₹50,000",
      description: "Elegant and glamorous setup for the music and dance-filled Sangeet night.",
      features: [
        "Stage setup with lighting",
        "Dance floor arrangement",
        "Elegant seating for guests",
        "Themed backdrop for performances",
        "Complete sound system setup"
      ],
      image: "https://images.unsplash.com/photo-1608508644127-ba99d7732fee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    },
    {
      title: "Wedding Reception",
      price: "₹75,000",
      description: "Luxurious and sophisticated decorations for your wedding reception.",
      features: [
        "Grand entrance decoration",
        "Elegantly decorated stage for couple",
        "Premium flower arrangements",
        "Sophisticated table settings",
        "Customized couple name display"
      ],
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
    }
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')" }}></div>
        <div className="absolute inset-0 bg-dark-blue opacity-70"></div>
        <div className="relative container-custom">
          <motion.div className="max-w-2xl" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair">Wedding Decorations</h1>
            <p className="text-xl text-white mb-8">
              Create the wedding of your dreams with our luxurious and elegant decoration services. We handle everything from intimate ceremonies to grand receptions.
            </p>
            <Link to="/contact" className="btn-primary">
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="section-title">Your Dream Wedding Awaits</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Celebration Events, we understand that your wedding day is one of the most important days of your life. Our dedicated team works tirelessly to transform your vision into reality, creating breathtaking decorations that reflect your style and personality.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                From traditional ceremonies to modern celebrations, we offer comprehensive decoration services for all wedding events including Haldi, Mehndi, Sangeet, and Reception.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 font-playfair">Why Choose Our Wedding Services:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheck className="text-royal-gold mt-1 mr-3" />
                    <span>Personalized designs tailored to your preferences</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-royal-gold mt-1 mr-3" />
                    <span>Premium quality flowers and decorative elements</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-royal-gold mt-1 mr-3" />
                    <span>Experienced team dedicated to your event</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheck className="text-royal-gold mt-1 mr-3" />
                    <span>On-time setup and professional coordination</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80" 
                alt="Wedding Decoration" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="section-title">Our Wedding Packages</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of carefully crafted packages to make every stage of your wedding celebrations beautiful and memorable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {weddingPackages.map((pkg, index) => (
              <motion.div 
                key={index}
                className="bg-cream rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold font-playfair">{pkg.title}</h3>
                    <span className="text-xl font-bold text-royal-gold">{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <FaCheck className="text-royal-gold mt-1 mr-3" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to="/contact" 
                    className="flex items-center justify-center w-full py-3 bg-dark-blue text-white rounded-md hover:bg-royal-gold transition-colors duration-300"
                  >
                    Book This Package <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            variants={itemVariants}
          >
            <p className="text-lg mb-8">
              Can't find what you're looking for? We also offer custom wedding decoration packages tailored to your specific requirements.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary"
            >
              Request Custom Package
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-dark-blue">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="section-title text-white">Wedding Gallery</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Take a look at some of our stunning wedding decorations from past events.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            variants={itemVariants}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div 
                key={item} 
                className="aspect-square overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={`https://source.unsplash.com/random/300x300/?wedding,decoration,${item}`}
                  alt={`Wedding Decoration ${item}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-white hover:text-royal-gold transition-colors duration-300"
            >
              View Full Gallery <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <motion.div 
            className="bg-gradient-to-r from-dark-blue to-maroon rounded-xl shadow-xl overflow-hidden"
            variants={itemVariants}
          >
            <div className="p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair">
                Ready to Create Your Dream Wedding?
              </h2>
              <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
                Contact us today to discuss your wedding decoration requirements and get a customized quote. Our wedding specialists are ready to bring your vision to life!
              </p>
              <Link 
                to="/contact" 
                className="btn-primary bg-royal-gold"
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Wedding;