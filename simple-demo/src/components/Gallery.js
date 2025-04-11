import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
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
  const scrollRef = useRef(null);
  const x = useMotionValue(0);
  const [loadedImages, setLoadedImages] = useState({});
  
  // Preload images
  useEffect(() => {
    galleryItems.forEach(item => {
      const img = new Image();
      img.src = item.image;
      img.onload = () => {
        setLoadedImages(prev => ({
          ...prev,
          [item.id]: true
        }));
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${item.image}`);
        toast.error(`Failed to load image: ${item.title}`, {
          position: "bottom-right",
          autoClose: 3000
        });
      };
    });
  }, []);
  
  // Drag container properties
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
  
  // Drag behavior
  const handleDragStart = () => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
    }
  };
  
  const handleDragEnd = () => {
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };
  
  // Image loading handler
  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({
      ...prev,
      [id]: true
    }));
  };
  
  const handleImageError = (id, title) => {
    console.error(`Failed to load image: ${title}`);
    toast.error(`Failed to load image: ${title}`, {
      position: "bottom-right",
      autoClose: 3000
    });
  };

  return (
    <section id="gallery" className="gallery-container section">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
          Explore our portfolio of memorable events that we've had the privilege to organize and decorate.
          <br /><span className="text-sm italic mt-2 block text-gray-500">← Drag to see more →</span>
        </p>
        
        <motion.div 
          ref={scrollRef}
          className="gallery-scroll"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.05}
          style={{ x }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {galleryItems.map((galleryItem) => (
            <motion.div 
              key={galleryItem.id} 
              className="gallery-item"
              variants={item}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => handleItemClick(galleryItem.title)}
            >
              {!loadedImages[galleryItem.id] && (
                <div className="gallery-image-placeholder">
                  <div className="loader"></div>
                </div>
              )}
              <img 
                src={galleryItem.image} 
                alt={galleryItem.title} 
                className={`gallery-image ${loadedImages[galleryItem.id] ? 'loaded' : 'loading'}`}
                onLoad={() => handleImageLoad(galleryItem.id)}
                onError={() => handleImageError(galleryItem.id, galleryItem.title)}
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{galleryItem.title}</h3>
                <p className="gallery-caption">{galleryItem.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Grid View (Alternative Layout) */}
        <h3 className="text-xl font-semibold mt-16 mb-6 text-center">Grid View</h3>
        <div className="gallery-grid">
          {galleryItems.slice(0, 4).map((galleryItem) => (
            <motion.div 
              key={`grid-${galleryItem.id}`} 
              className="gallery-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onClick={() => handleItemClick(galleryItem.title)}
            >
              {!loadedImages[galleryItem.id] && (
                <div className="gallery-image-placeholder">
                  <div className="loader"></div>
                </div>
              )}
              <img 
                src={galleryItem.image} 
                alt={galleryItem.title} 
                className={`gallery-image ${loadedImages[galleryItem.id] ? 'loaded' : 'loading'}`}
                onLoad={() => handleImageLoad(galleryItem.id)}
                onError={() => handleImageError(galleryItem.id, galleryItem.title)}
              />
              <div className="gallery-overlay">
                <h3 className="gallery-title">{galleryItem.title}</h3>
                <p className="gallery-caption">{galleryItem.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;