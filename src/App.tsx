import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCarousel from './components/FeaturedCarousel';
import SportsHub from './components/SportsHub';
import VideoLibrary from './components/VideoLibrary';
import LiveScores from './components/LiveScores';
import ManifestoSection from './components/ManifestoSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BlogPost from './components/BlogPost';
import IndividualBlogPost from './components/IndividualBlogPost';
import SportsAnalytics from './components/SportsAnalytics';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HomePage = () => (
    <>
      <Hero />
      <FeaturedCarousel />
      <VideoLibrary />
      <LiveScores />
      <ManifestoSection />
      <ContactSection />
    </>
  );

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-exo">
        <Header isScrolled={isScrolled} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/post/:id" element={<IndividualBlogPost />} />
          <Route path="/analytics" element={<SportsAnalytics />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;