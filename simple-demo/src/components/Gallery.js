import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
    title: "Elegant Wedding Reception",
    caption: "Luxury wedding reception with exquisite floral arrangements"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1098&q=80",
    title: "Colorful Birthday Party",
    caption: "Vibrant birthday celebration with themed decorations"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    title: "Romantic Anniversary",
    caption: "Intimate anniversary setting with candles and roses"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b7ce1a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
    title: "Traditional Haldi Ceremony",
    caption: "Beautiful setup for a traditional Haldi celebration"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
    title: "Elegant Mehndi Night",
    caption: "Intricate mehndi decorations with vibrant colors"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1594078187505-73ad2d63cd81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    title: "Car Decoration",
    caption: "Luxury car decorated for wedding departure"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    title: "Festival Tent Setup",
    caption: "Large elegant tent setup for outdoor celebrations"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    title: "Wedding Table Setting",
    caption: "Elegant table arrangement with gold and white theme"
  }
];

function Gallery() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 }}
  };
  
  const handleItemClick = (title) => {
    toast.info(`Viewing ${title}`, {
      position: "bottom-right",
      autoClose: 2000
    });
  };

  return (
    <section id="gallery" className="gallery-container section">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Explore our portfolio of memorable events that we've had the privilege to organize and decorate.
        </p>
        
        <motion.div 
          className="gallery-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="gallery-item"
              variants={item}
              whileHover={{ y: -10 }}
              onClick={() => handleItemClick(item.title)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{item.title}</h3>
                <p className="gallery-caption">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Gallery;