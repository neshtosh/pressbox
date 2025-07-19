import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play } from 'lucide-react';
import signature from '../assets/signature.png';
import jersey from '../assets/jersey.png';
import boxingGloves from '../assets/boxing.png';
import football from '../assets/football.png';
import basketball from '../assets/basketball.png';
import soccer from '../assets/soccer.png';

const Hero: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentBallIndex, setCurrentBallIndex] = useState(0);

  const sportsVideos = [
    {
      url: "https://videos.pexels.com/video-files/7005865/7005865-uhd_2560_1440_24fps.mp4",
      sport: "Football",
      description: "NFL Action"
    },
    {
      url: "https://cdn.pixabay.com/video/2020/11/07/55814-504238784_large.mp4",
      sport: "Basketball",
      description: "NBA Highlights"
    },
    {
      url: "https://videos.pexels.com/video-files/7005865/7005865-uhd_2560_1440_24fps.mp4",
      sport: "Soccer",
      description: "Premier League"
    },
    {
      url: "https://videos.pexels.com/video-files/4761763/4761763-uhd_2732_1440_25fps.mp4",
      sport: "Baseball",
      description: "MLB "
    }
  ];

  const sportsBalls = [
    // Boxing Gloves PNG
    <img 
      key="boxing-gloves" 
      src={boxingGloves}
      alt="Boxing Gloves"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110 opacity-70"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(180deg)',
        animation: `rotateReveal 3s linear infinite`
      }}
    />,
    // Football PNG
    <img 
      key="football" 
      src={football}
      alt="Football"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110 opacity-70"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(180deg)',
        animation: `rotateReveal 3s linear infinite 0.5s`
      }}
    />,
    // Basketball PNG
    <img 
      key="basketball" 
      src={basketball}
      alt="Basketball"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110 opacity-70"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(180deg)',
        animation: `rotateReveal 3s linear infinite 1s`
      }}
    />,
    // Soccer Ball PNG
    <img 
      key="soccer" 
      src={soccer}
      alt="Soccer Ball"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110 opacity-70"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(3) hue-rotate(180deg)',
        animation: `rotateReveal 3s linear infinite 1.5s`
      }}
    />
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % sportsVideos.length);
    }, 6000); // Slower video rotation

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ballTimer = setInterval(() => {
      setCurrentBallIndex((prev) => (prev + 1) % sportsBalls.length);
    }, 3000); // Slower ball rotation

    return () => clearInterval(ballTimer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Carousel */}
      <div className="absolute inset-0 z-0">
        {sportsVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={video.url} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60"></div>
            
            {/* Sport Label */}
            <div className="absolute top-8 left-8 z-10">
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-600/30 rounded-lg px-4 py-2">
                <span className="text-gray-300 font-medium text-sm">{video.sport}</span>
                <p className="text-gray-400 text-xs opacity-80">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-0.5 h-32 bg-gradient-to-b from-gray-400/10 to-transparent"></div>
        <div className="absolute top-40 right-20 w-0.5 h-24 bg-gradient-to-b from-gray-400/5 to-transparent"></div>
        <div className="absolute bottom-40 left-1/4 w-0.5 h-16 bg-gradient-to-b from-gray-400/8 to-transparent"></div>
        
        {/* Subtle Dots */}
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-gray-400/20 rounded-full"></div>
        <div className="absolute top-48 right-1/4 w-0.5 h-0.5 bg-gray-400/30 rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-1 h-1 bg-gray-400/15 rounded-full"></div>
        <div className="absolute top-64 right-1/3 w-0.5 h-0.5 bg-gray-400/25 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Large Bold Title - Full width, larger size */}
        <div className="flex items-center justify-center h-48 md:h-56 pt-32 px-4">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-orbitron font-black text-white tracking-tight leading-none animate-fade-in flex items-center w-full justify-center">
            <span>PRESS</span>
            <span className="text-gray-600 font-black">B</span>
            <span className="text-gray-300 relative">
              <div className="transition-all duration-500 ease-in-out transform hover:scale-110">
                {sportsBalls[currentBallIndex]}
              </div>
            </span>
            <span className="text-gray-600 font-black">X</span>
          </h1>
        </div>

        {/* Bottom Content */}
        <div className="flex-1 flex items-end justify-center pb-32 px-8">
          <div className="max-w-4xl text-center">
            
            {/* Signature and Jersey with Overlap */}
            <div className="flex items-center justify-center mb-8 relative">
              <img 
                src={signature} 
                alt="Signature" 
                className="h-14 md:h-16 lg:h-18 opacity-80 relative z-10"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <img 
                src={jersey} 
                alt="Jersey" 
                className="h-16 md:h-18 lg:h-20 opacity-70 -ml-10 md:-ml-10 lg:-ml-14 relative z-5"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blogs">
                <button className="group relative px-6 py-3 bg-gray-800/60 text-white font-medium rounded-lg hover:bg-gray-700/60 transition-all duration-300 flex items-center space-x-2 overflow-hidden border border-gray-600/30 backdrop-blur-sm">
                  <div className="absolute inset-0 bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm md:text-base">Explore Blogs</span>
                </button>
              </Link>
              
              <button className="group relative px-6 py-3 border border-gray-600/50 text-gray-300 font-medium rounded-lg hover:bg-gray-800/40 hover:text-white transition-all duration-300 flex items-center space-x-2 overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gray-800/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Play className="w-4 h-4" />
                <span className="text-sm md:text-base">Watch Videos</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Navigation Dots */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {sportsVideos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'bg-gray-400 scale-125' 
                  : 'bg-gray-600/50 hover:bg-gray-500/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
        <div className="w-4 h-8 border border-gray-600/50 rounded-full flex justify-center">
          <div className="w-0.5 h-2 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;