import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ChevronUp } from 'lucide-react';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const sportsCategories = [
    { name: "Football", icon: "🏈" },
    { name: "Basketball", icon: "🏀" },
    { name: "Soccer", icon: "⚽" },
    { name: "Baseball", icon: "⚾" },
    { name: "Hockey", icon: "🏒" },
    { name: "eSports", icon: "🎮" }
  ];

  // Track scroll progress and mobile nav visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = 200; // Max scroll for full opacity
      const progress = Math.min(scrollTop / maxScroll, 1);
      setScrollProgress(progress);

      // Mobile navbar scroll behavior
      if (window.innerWidth < 1024) { // Only for mobile
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsMobileNavVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          setIsMobileNavVisible(true);
        }
        
        setLastScrollY(currentScrollY);
      } else {
        // Always show on desktop
        setIsMobileNavVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl' 
            : 'bg-transparent'
        } ${
          window.innerWidth < 1024 && !isMobileNavVisible ? '-translate-y-full' : ''
        }`}
        style={{
          background: isScrolled 
            ? `linear-gradient(to bottom, rgba(0,0,0,${0.8 + scrollProgress * 0.1}), rgba(0,0,0,${0.7 + scrollProgress * 0.2}))`
            : 'transparent'
        }}
      >
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-sm">PB</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-orbitron font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                PRESS<span className="text-cyan-400">BOX</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`transition-all duration-300 relative group ${
                location.pathname === '/' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
              }`}>
                <span className="relative z-10">Home</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
                <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
              
              <div className="relative dropdown-container">
                <button 
                  className="text-white hover:text-cyan-400 transition-all duration-300 flex items-center space-x-1 relative group"
                  onClick={() => setActiveDropdown(activeDropdown === 'blogs' ? null : 'blogs')}
                >
                  <span className="relative z-10">Blogs</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'blogs' ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
                
                {activeDropdown === 'blogs' && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-cyan-400/30 rounded-xl shadow-2xl z-50">
                    <div className="p-2">
                      {sportsCategories.map((sport, index) => (
                        <Link
                          key={sport.name}
                          to={`/blog/${sport.name.toLowerCase()}`}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-4 py-3 text-white hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 rounded-lg flex items-center space-x-3 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform duration-300">{sport.icon}</span>
                          <span className="font-medium">{sport.name}</span>
                          <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/analytics" className={`transition-all duration-300 relative group ${
                location.pathname === '/analytics' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
              }`}>
                <span className="relative z-10">Analytics</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                  location.pathname === '/analytics' ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
                <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </Link>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center group z-50"
            >
              {/* Animated Lines */}
              <div className="flex flex-col space-y-1.5">
                <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''
                }`}></div>
                <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''
                }`}></div>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-cyan-400/20 rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-gray-800/50 rounded-b-2xl shadow-2xl z-40">
              <nav className="py-6 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-4 text-white hover:text-cyan-400 transition-all duration-300 rounded-lg mx-4 ${
                    location.pathname === '/' ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="font-medium">Home</span>
                  </div>
                </Link>
                
                <div className="px-6 py-4">
                  <div className="text-white mb-4 font-semibold text-lg flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Blogs</span>
                  </div>
                  <div className="space-y-2 ml-4">
                    {sportsCategories.map((sport, index) => (
                      <Link
                        key={sport.name}
                        to={`/blog/${sport.name.toLowerCase()}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 px-4 text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center space-x-3 rounded-lg hover:bg-gray-800/50 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-xl group-hover:scale-110 transition-transform duration-300">{sport.icon}</span>
                        <span className="font-medium">{sport.name}</span>
                        <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link
                  to="/analytics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-6 py-4 text-white hover:text-cyan-400 transition-all duration-300 rounded-lg mx-4 ${
                    location.pathname === '/analytics' ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="font-medium">Analytics</span>
                  </div>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`lg:hidden fixed bottom-6 right-6 w-12 h-12 bg-cyan-400/90 hover:bg-cyan-400 text-black rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
          window.scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default Header;