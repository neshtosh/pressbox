import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const featuredPosts = [
    {
      id: 1,
      title: "The Evolution of Modern Football Strategy",
      excerpt: "How data analytics is revolutionizing play-calling and team formations in the NFL",
      image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Football",
      author: "Marcus Johnson",
      readTime: "8 min read",
      sport: "🏈"
    },
    {
      id: 2,
      title: "Rise of eSports: From Basement to Billions",
      excerpt: "The incredible journey of competitive gaming and its impact on traditional sports",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "eSports",
      author: "Sarah Chen",
      readTime: "12 min read",
      sport: "🎮"
    },
    {
      id: 3,
      title: "Basketball Analytics: Beyond the Box Score",
      excerpt: "Advanced metrics that are changing how we understand player performance",
      image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      category: "Basketball",
      author: "David Rodriguez",
      readTime: "6 min read",
      sport: "🏀"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

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
      className={`py-12 md:py-20 bg-gradient-to-b from-black to-gray-900 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-white mb-4 leading-tight">
            FEATURED <span className="text-cyan-400">STORIES</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto px-4">
            Dive deep into the latest insights, analysis, and breaking news from the world of sports
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl md:rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredPosts.map((post, index) => (
                <div key={post.id} className="w-full flex-shrink-0">
                  <Link to={`/blog/${post.category.toLowerCase()}`} className="block">
                    <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] group cursor-pointer">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                        <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                          <span className="text-xl md:text-2xl">{post.sport}</span>
                          <span className="px-2 md:px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs md:text-sm font-semibold border border-cyan-400/30">
                            {post.category}
                          </span>
                        </div>
                        
                        <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-orbitron font-bold text-white mb-3 md:mb-4 leading-tight">
                          {post.title}
                        </h3>
                        
                        <p className="text-gray-300 text-xs md:text-sm mb-4 md:mb-6 max-w-2xl line-clamp-2 md:line-clamp-none">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <User className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <Clock className="w-3 h-3 md:w-4 md:h-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400 hover:scale-105"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {featuredPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-cyan-400 scale-110' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;