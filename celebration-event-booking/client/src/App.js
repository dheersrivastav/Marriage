import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Wedding from './pages/Wedding';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wedding" element={<Wedding />} />
            <Route path="/contact" element={<Contact />} />
            {/* Additional routes will be added here */}
          </Routes>
        </main>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;