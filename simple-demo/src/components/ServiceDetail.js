import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaRegClock, FaTag, FaUsers, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

// Service details component with scrollable gallery
const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  
  // Toggle favorite status
  const toggleFavorite = (serviceTitle) => {
    setIsFavorite(!isFavorite);
    toast.success(
      !isFavorite 
        ? `Added ${serviceTitle} to favorites!` 
        : `Removed ${serviceTitle} from favorites!`, 
      {
        position: "bottom-right",
        autoClose: 2000
      }
    );
  };
  
  // Service data - in a real app this would come from an API/database
  // Using useMemo to prevent the object from being recreated on each render
  const serviceData = useMemo(() => ({
    wedding: {
      title: "Wedding Planning Services",
      description: "Our comprehensive wedding planning services are designed to make your special day unforgettable. From traditional ceremonies like haldi and mehndi to modern receptions, we handle every detail with care and precision.",
      longDescription: [
        "At ShubhUtsav, we understand that your wedding day is one of the most important events in your life. That's why our dedicated team works tirelessly to ensure every detail is perfect.",
        "Our wedding planning services include venue selection, décor design, catering arrangements, photographer and videographer booking, wedding invitation design, entertainment coordination, and much more.",
        "We specialize in traditional Indian ceremonies including Haldi, Mehndi, Sangeet, and Reception, ensuring all cultural nuances are honored while incorporating your personal style."
      ],
      features: [
        "Complete wedding event planning",
        "Haldi and Mehndi ceremony coordination",
        "Venue decoration with themed designs",
        "Customized catering packages",
        "Entertainment and music arrangements",
        "Photography and videography services",
        "Guest management solutions"
      ],
      timeline: "3-6 months planning period recommended",
      price: "Starting from ₹75,000",
      capacity: "10 to 500+ guests",
      images: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1519741347686-c1e331ec5a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
      ]
    },
    birthday: {
      title: "Birthday Celebration Services",
      description: "Make your birthday celebrations magical with our customized planning services. From themed decorations to entertainment, we take care of everything to create a memorable experience.",
      longDescription: [
        "Whether it's a milestone birthday or an annual celebration, our birthday planning services are tailored to match your vision and exceed your expectations.",
        "We offer customized themes, decorations, catering, entertainment, and photography services for birthdays of all ages. From children's parties with cartoon characters to sophisticated adult celebrations, we have the expertise to create the perfect experience.",
        "Our team handles all aspects of planning, allowing you to focus on enjoying the celebration with your loved ones."
      ],
      features: [
        "Customized theme implementation",
        "Venue selection and decoration",
        "Cake and catering arrangements",
        "Entertainment and activities planning",
        "Photography and videography",
        "Return gift coordination",
        "On-day event management"
      ],
      timeline: "1-2 months planning period recommended",
      price: "Starting from ₹25,000",
      capacity: "10 to 200 guests",
      images: [
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1533294455009-a77b7557d979?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
      ]
    },
    anniversary: {
      title: "Anniversary Celebration Services",
      description: "Celebrate your years of togetherness with our specially curated anniversary packages. We create romantic and memorable experiences to honor your special milestone.",
      longDescription: [
        "Anniversaries are a celebration of love and commitment. At ShubhUtsav, we help you commemorate this special occasion with elegant and memorable celebrations.",
        "Our anniversary planning services include intimate dinners, surprise parties, vow renewal ceremonies, destination celebrations, and memorable experiences tailored to your relationship.",
        "We pay close attention to your story as a couple, incorporating personal touches that make the celebration uniquely yours."
      ],
      features: [
        "Romantic venue selection and setup",
        "Customized anniversary themes",
        "Special dinner arrangements",
        "Surprise planning and coordination",
        "Photography and videography",
        "Live music and entertainment",
        "Personalized decorations and gifts"
      ],
      timeline: "1-3 months planning period recommended",
      price: "Starting from ₹35,000",
      capacity: "2 to 100 guests",
      images: [
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1472653431158-6364773b2fda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
      ]
    }
  }), []);
  
  // Effect for loading service data
  useEffect(() => {
    // Check if service exists
    if (serviceData[serviceId]) {
      setCurrentService(serviceData[serviceId]);
    } else {
      // Redirect if service doesn't exist
      setTimeout(() => navigate('/'), 0);
    }
  }, [serviceId, navigate, serviceData]);

  // Preload service images
  useEffect(() => {
    if (currentService && currentService.images) {
      currentService.images.forEach((imageUrl, index) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setLoadedImages(prev => ({
            ...prev,
            [index]: true
          }));
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${imageUrl}`);
          toast.error(`Failed to load one of the service images`, {
            position: "bottom-right",
            autoClose: 3000
          });
        };
      });
    }
  }, [currentService]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Display loading state if service data is not ready
  if (!currentService) {
    return (
      <section className="service-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="loader"></div>
            <p>Loading service details...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="service-detail-page">
      <div className="container">
        <motion.button
          className="back-button"
          onClick={() => navigate(-1)}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft /> Back
        </motion.button>

        <motion.div
          className="service-detail-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Image Gallery */}
          <motion.div className="service-gallery" variants={itemVariants}>
            <div className="main-image-container">
              {!loadedImages[activeImage] && (
                <div className="image-loader-container">
                  <div className="loader"></div>
                </div>
              )}
              <motion.img
                src={currentService.images[activeImage]}
                alt={currentService.title}
                className={`main-image ${loadedImages[activeImage] ? 'loaded' : 'loading'}`}
                onLoad={() => setLoadedImages(prev => ({ ...prev, [activeImage]: true }))}
                initial={{ opacity: 0 }}
                animate={{ opacity: loadedImages[activeImage] ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.button
                className="favorite-button"
                onClick={() => toggleFavorite(currentService.title)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart className={isFavorite ? 'favorite' : ''} />
              </motion.button>
            </div>
            <div className="thumbnail-container">
              {currentService.images.map((img, index) => (
                <div
                  key={index}
                  className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Service Information */}
          <motion.div className="service-info" variants={itemVariants}>
            <motion.h1 className="animated-heading">{currentService.title}</motion.h1>
            <motion.p className="service-description">{currentService.description}</motion.p>

            {/* Details Grid */}
            <motion.div className="service-details-grid">
              <div className="detail-item">
                <FaRegClock />
                <div>
                  <h4>Timeline</h4>
                  <p>{currentService.timeline}</p>
                </div>
              </div>

              <div className="detail-item">
                <FaTag />
                <div>
                  <h4>Pricing</h4>
                  <p>{currentService.price}</p>
                </div>
              </div>

              <div className="detail-item">
                <FaUsers />
                <div>
                  <h4>Capacity</h4>
                  <p>{currentService.capacity}</p>
                </div>
              </div>

              <div className="detail-item">
                <FaCalendarAlt />
                <div>
                  <h4>Availability</h4>
                  <p>Check with our team</p>
                </div>
              </div>
            </motion.div>

            {/* Long Description */}
            <motion.div className="service-long-description">
              {currentService.longDescription.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Features */}
            <motion.div className="service-features">
              <h3 className="animated-heading">What's Included</h3>
              <ul>
                {currentService.features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="service-cta"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="btn" onClick={() => navigate('/contact')}>
                Book This Service
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceDetail;