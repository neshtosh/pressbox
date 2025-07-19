import React, { useState, useEffect } from 'react';
import { Play, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import boxingGloves from '../assets/boxing.png';
import basketball from '../assets/basketball.png';
import football from '../assets/football.png';
import soccer from '../assets/soccer.png';
import signature from '../assets/signature.png';
import jersey from '../assets/jersey.png';

const Hero: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentBallIndex, setCurrentBallIndex] = useState(0);

  const sportsVideos = [
    {
      url: "https://cdn.pixabay.com/video/2020/10/12/52177-467701518_large.mp4",
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
      description: "MLB Action"
    }
  ];

  const sportsBalls = [
    // Boxing Gloves PNG
    <img 
      key="boxing-gloves" 
      src={boxingGloves}
      alt="Boxing Gloves"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
        animation: `rotateReveal 2s linear infinite`
      }}
    />,
    // Football PNG
    <img 
      key="football" 
      src={football}
      alt="Football"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
        animation: `rotateReveal 2s linear infinite 0.5s`
      }}
    />,
    // Basketball PNG
    <img 
      key="basketball" 
      src={basketball}
      alt="Basketball"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
        animation: `rotateReveal 2s linear infinite 1s`
      }}
    />,
    // Soccer Ball PNG
    <img 
      key="soccer" 
      src={soccer}
      alt="Soccer Ball"
      className="w-16 h-16 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 transition-all duration-500 ease-in-out transform hover:scale-110"
      style={{ 
        filter: 'brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)',
        animation: `rotateReveal 2s linear infinite 1.5s`
      }}
    />
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % sportsVideos.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ballTimer = setInterval(() => {
      setCurrentBallIndex((prev) => (prev + 1) % sportsBalls.length);
    }, 2000); // Change ball every 2 seconds

    return () => clearInterval(ballTimer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Carousel */}
      <div className="absolute inset-0 z-0">
        {sportsVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
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
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"></div>
            
            {/* Sport Label */}
            <div className="absolute top-8 left-8 z-10">
              <div className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-2">
                <span className="text-cyan-400 font-bold text-lg">{video.sport}</span>
                <p className="text-white text-sm opacity-80">{video.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Futuristic Background Elements */}
      

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Large Bold Title - Full width, larger size */}
        <div className="flex items-center justify-center h-48 md:h-56 pt-32 px-4">
          <h1 className="text-6xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-orbitron font-black text-white tracking-tight leading-none animate-fade-in flex items-center w-full justify-center">
            <span>PRESS</span>
            <span className="text-cyan-400">B</span>
            <span className="text-cyan-400 relative">
              <div className="transition-all duration-500 ease-in-out transform hover:scale-110">
                {sportsBalls[currentBallIndex]}
              </div>
            </span>
            <span className="text-cyan-400">X</span>
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
                className="h-16 md:h-20 lg:h-24 opacity-90 relative z-10"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <img 
                src={jersey} 
                alt="Jersey" 
                className="h-20 md:h-24 lg:h-28 opacity-80 -ml-12 md:-ml-12 lg:-ml-16 relative z-5"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/blogs">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 flex items-center space-x-2 overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <BookOpen className="w-5 h-5" />
                  <span>EXPLORE BLOGS</span>
                </button>
              </Link>
              
              <button className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center space-x-2 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Play className="w-5 h-5" />
                <span>WATCH VIDEOS</span>
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'bg-cyan-400 scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;