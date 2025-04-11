import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: "Priya Sharma",
    position: "Creative Director",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    bio: "With over 10 years of experience in event planning, Priya brings creativity and elegance to every celebration."
  },
  {
    id: 2,
    name: "Rahul Patel",
    position: "Lead Designer",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "Rahul's eye for detail and unique aesthetic sense helps create unforgettable event spaces."
  },
  {
    id: 3,
    name: "Ananya Gupta",
    position: "Client Relations",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Ananya ensures every client's vision is understood and executed with precision and care."
  },
  {
    id: 4,
    name: "Arjun Singh",
    position: "Operations Manager",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    bio: "Arjun's logistical expertise ensures every event runs smoothly from start to finish."
  }
];

function About() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <h2 className="section-title">About Us</h2>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg mb-6">
            Founded in 2015, ShubhUtsav has been transforming ordinary venues into extraordinary celebration spaces. Our passion for creating memorable moments drives us to deliver exceptional event experiences.
          </p>
          <p className="text-lg">
            We specialize in weddings, birthday parties, corporate events, and cultural ceremonies, bringing creativity, precision, and elegance to every occasion. Our dedicated team works closely with each client to ensure their vision comes to life.
          </p>
        </motion.div>
        
        <h3 className="text-2xl text-center font-semibold mb-10">Meet Our Team</h3>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              className="team-member"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="team-info">
                <h4 className="team-name">{member.name}</h4>
                <p className="team-position">{member.position}</p>
                <p className="team-bio">{member.bio}</p>
                <div className="social-links">
                  <motion.a 
                    href="#" 
                    className="social-link"
                    whileHover={{ scale: 1.2, backgroundColor: "#D4AF37", color: "white" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="social-link"
                    whileHover={{ scale: 1.2, backgroundColor: "#D4AF37", color: "white" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-instagram"></i>
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="social-link"
                    whileHover={{ scale: 1.2, backgroundColor: "#D4AF37", color: "white" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;