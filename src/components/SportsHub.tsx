import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SportsHub: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const sportsCategories = [
    {
      id: 1,
      name: "Football",
      icon: "🏈",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "NFL Draft Predictions: Who's Going #1?",
      articles: 24,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 2,
      name: "Basketball",
      icon: "🏀",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "March Madness: Bracket Busters",
      articles: 18,
      color: "from-orange-600 to-yellow-500"
    },
    {
      id: 3,
      name: "Soccer",
      icon: "⚽",
      image: "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "World Cup Qualifiers: Upsets & Surprises",
      articles: 31,
      color: "from-green-500 to-blue-500"
    },
    {
      id: 4,
      name: "eSports",
      icon: "🎮",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "Valorant Championship: New Dynasty",
      articles: 15,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 5,
      name: "Baseball",
      icon: "⚾",
      image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "Spring Training: Rookies to Watch",
      articles: 12,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 6,
      name: "Hockey",
      icon: "🏒",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      latestHeadline: "Stanley Cup Playoffs: Dark Horses",
      articles: 9,
      color: "from-cyan-500 to-blue-600"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gray-900 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
            SPORTS <span className="text-cyan-400">HUB</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore comprehensive coverage across all major sports with expert analysis and breaking news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sportsCategories.map((sport) => (
            <div
              key={sport.id}
              className="group relative overflow-hidden rounded-2xl bg-black border border-gray-800 hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={sport.image}
                  alt={sport.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className={`absolute inset-0 bg-gradient-to-r ${sport.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">{sport.icon}</span>
                  <span className="text-xs text-gray-400 bg-gray-800/80 px-2 py-1 rounded-full">
                    {sport.articles} articles
                  </span>
                </div>
                
                <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                  {sport.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {sport.latestHeadline}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 text-sm font-semibold">
                    Latest Updates
                  </span>
                  <Link to={`/blog/${sport.name.toLowerCase()}`} className="flex items-center space-x-1">
                    <ArrowRight className="w-5 h-5 text-cyan-400 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsHub;