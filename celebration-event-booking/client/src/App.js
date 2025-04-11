import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Wedding from './pages/Wedding';
import Birthday from './pages/Birthday';
import CarDecoration from './pages/CarDecoration';
import TentSetup from './pages/TentSetup';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wedding" element={<Wedding />} />
            <Route path="/birthday" element={<Birthday />} />
            <Route path="/car-decoration" element={<CarDecoration />} />
            <Route path="/tent-setup" element={<TentSetup />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}

export default App;