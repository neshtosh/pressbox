import React, { useState, useEffect, useRef } from 'react';
import { Play, Filter, Clock, Eye, X } from 'lucide-react';

const VideoLibrary: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filters = ['All', 'Highlights', 'Interviews', 'Analysis', 'Live'];

  const videos = [
    {
      id: 1,
      title: "Game-Winning Touchdown: Chiefs vs Bills",
      thumbnail: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "3:45",
      views: "1.2M",
      category: "Highlights",
      sport: "Football"
    },
    {
      id: 2,
      title: "LeBron James: Career Retrospective",
      thumbnail: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "12:30",
      views: "850K",
      category: "Analysis",
      sport: "Basketball"
    },
    {
      id: 3,
      title: "Post-Game Interview: Messi on Victory",
      thumbnail: "https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "5:20",
      views: "650K",
      category: "Interviews",
      sport: "Soccer"
    },
    {
      id: 4,
      title: "Worlds 2024: Best Plays Montage",
      thumbnail: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "8:15",
      views: "2.1M",
      category: "Highlights",
      sport: "eSports"
    },
    {
      id: 5,
      title: "Breaking Down the Perfect Swing",
      thumbnail: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "6:45",
      views: "420K",
      category: "Analysis",
      sport: "Baseball"
    },
    {
      id: 6,
      title: "Stanley Cup Finals: Epic Saves",
      thumbnail: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1",
      duration: "4:30",
      views: "890K",
      category: "Highlights",
      sport: "Hockey"
    }
  ];

  const filteredVideos = activeFilter === 'All' 
    ? videos 
    : videos.filter(video => video.category === activeFilter);

  const handleFilterClick = (filter: string) => {
    if (filter === 'Live') {
      setShowComingSoon(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowComingSoon(false), 3000);
    } else {
      setActiveFilter(filter);
    }
  };

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
      className={`py-12 md:py-20 bg-black transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-white mb-4 leading-tight">
            VIDEO <span className="text-cyan-400">LIBRARY</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            Watch exclusive highlights, interviews, and in-depth analysis from the world of sports
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 px-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 ${
                activeFilter === filter
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="group relative overflow-hidden rounded-xl md:rounded-2xl bg-gray-900 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 group-hover:bg-cyan-400/30 transition-all duration-300 group-hover:scale-105">
                    <Play className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 ml-0.5 md:ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 bg-black/80 text-white px-2 py-1 rounded text-xs md:text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded text-xs md:text-sm border border-cyan-400/30">
                  {video.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <h3 className="text-sm md:text-base font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span className="font-semibold">{video.sport}</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{video.views}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 md:mt-12">
          <button className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 hover:scale-105 text-sm md:text-base">
            Load More Videos
          </button>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative bg-gray-900 border border-cyan-400/30 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md mx-4 transform animate-fade-in">
            {/* Close Button */}
            <button 
              onClick={() => setShowComingSoon(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center">
              {/* Animated Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-cyan-400/40 rounded-full animate-ping"></div>
                <div className="absolute inset-4 bg-cyan-400 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-black" />
                </div>
              </div>

              {/* Text */}
              <h3 className="text-xl md:text-2xl font-orbitron font-bold text-white mb-4">
                COMING <span className="text-cyan-400">SOON</span>
              </h3>
              
              <p className="text-gray-400 mb-6 text-sm md:text-base">
                Live streaming feature is under development. Get ready for real-time sports action!
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
                <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center space-x-2 text-cyan-400 text-xs md:text-sm">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="font-semibold">DEVELOPMENT IN PROGRESS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoLibrary;