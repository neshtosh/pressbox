import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const sportsCategories = [
    { name: "Football", icon: "🏈" },
    { name: "Basketball", icon: "🏀" },
    { name: "Soccer", icon: "⚽" },
    { name: "Baseball", icon: "⚾" },
    { name: "Hockey", icon: "🏒" },
    { name: "eSports", icon: "🎮" }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-orbitron font-bold text-white">
            
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={`transition-colors relative group ${
              location.pathname === '/' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
            }`}>
              Home
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('blogs')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-white hover:text-cyan-400 transition-colors flex items-center space-x-1 relative group">
                <span>Blogs</span>
                <ChevronDown className="w-4 h-4" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {activeDropdown === 'blogs' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-cyan-400/30 rounded-lg shadow-xl">
                  {sportsCategories.map((sport) => (
                    <Link
                      key={sport.name}
                      to={`/blog/${sport.name.toLowerCase()}`}
                      className="block px-4 py-3 text-white hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    >
                      <span>{sport.icon}</span>
                      <span>{sport.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/analytics" className={`transition-colors relative group ${
              location.pathname === '/analytics' ? 'text-cyan-400' : 'text-white hover:text-cyan-400'
            }`}>
              Analytics
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                location.pathname === '/analytics' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          </nav>

          {/* Custom Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            {/* Animated Dots */}
            <div className="flex flex-col space-y-1">
              <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
              }`}></div>
              <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}></div>
              <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
              }`}></div>
            </div>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-cyan-400/20 rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
            }`}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <nav className="py-4 space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-white hover:text-cyan-400 transition-colors ${
                  location.pathname === '/' ? 'text-cyan-400' : ''
                }`}
              >
                Home
              </Link>
              
              <div className="px-4 py-3">
                <div className="text-white mb-2">Blogs</div>
                <div className="space-y-2 ml-4">
                  {sportsCategories.map((sport) => (
                    <Link
                      key={sport.name}
                      to={`/blog/${sport.name.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    >
                      <span>{sport.icon}</span>
                      <span>{sport.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to="/analytics"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 text-white hover:text-cyan-400 transition-colors ${
                  location.pathname === '/analytics' ? 'text-cyan-400' : ''
                }`}
              >
                Analytics
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;