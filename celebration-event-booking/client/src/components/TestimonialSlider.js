import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialSlider = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      stars: 5,
      text: "Absolutely stunning decoration for our wedding! The team went above and beyond to make our venue look magical. Every detail was perfect, from the mandap decoration to the reception hall setup. Highly recommend!"
    },
    {
      id: 2,
      name: "Rahul Patel",
      role: "Groom",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      stars: 5,
      text: "We hired Celebration Events for our wedding, including mehndi and sangeet decorations. They transformed our ordinary venue into something out of a fairy tale. The attention to detail was impressive!"
    },
    {
      id: 3,
      name: "Anita Desai",
      role: "Birthday Girl's Mother",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      stars: 5,
      text: "My daughter's 5th birthday party was a dream come true, thanks to Celebration Events. The princess-themed decorations were perfect, and all the children were amazed. Worth every penny!"
    },
    {
      id: 4,
      name: "Vikram Mehta",
      role: "Event Host",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
      stars: 4,
      text: "Their tent and stage setup for our corporate event was exceptional. Professional service from planning to execution. The only reason for 4 stars instead of 5 is a slight delay in setup, but everything else was flawless."
    }
  ];

  // Function to render stars
  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <FaStar key={i} className="text-royal-gold" />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our decoration services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-cream rounded-lg p-8 shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-6xl text-gray-200 opacity-50">
                <FaQuoteLeft />
              </div>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-playfair">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {renderStars(testimonial.stars)}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 relative z-10">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;