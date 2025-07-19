import React from 'react';
import { Quote, Users, Target, Zap } from 'lucide-react';

const ManifestoSection: React.FC = () => {
  const principles = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "By Athletes, For Athletes",
      description: "Every story is told by someone who's lived it, breathed it, and competed at the highest level."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Authentic Storytelling",
      description: "We don't just report scores—we capture the human drama, the strategy, and the passion behind every game."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Innovation in Sports Media",
      description: "Cutting-edge technology meets timeless storytelling to create the future of sports journalism."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Manifesto Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">
                OUR <span className="text-cyan-400">MANIFESTO</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mb-6"></div>
            </div>

            <div className="relative">
              <Quote className="w-12 h-12 text-cyan-400/30 absolute -top-4 -left-4" />
              <p className="text-xl text-gray-300 leading-relaxed pl-8 italic">
                "Sports aren't just games—they're the purest expression of human potential, 
                determination, and the relentless pursuit of excellence."
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                At PressBox, we believe that every athlete has a story worth telling. We're not just 
                observers on the sidelines—we're participants in the greatest arena of human achievement.
              </p>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                From the underground eSports tournaments to the bright lights of the Super Bowl, 
                we capture the moments that define champions and the stories that inspire generations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <div key={index} className="group">
                  <div className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                    {principle.icon}
                  </div>
                  <h3 className="text-white font-orbitron font-bold text-lg mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Visual Elements */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                alt="Athlete in action"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-cyan-400">500+</div>
                <div className="text-xs text-gray-300">Athletes</div>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-2xl backdrop-blur-sm border border-orange-400/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-orbitron font-bold text-orange-400">10M+</div>
                <div className="text-xs text-gray-300">Readers</div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-cyan-500/20 rounded-full backdrop-blur-sm border border-green-400/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-orbitron font-bold text-green-400">24/7</div>
                <div className="text-xs text-gray-300">Live</div>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 rounded-2xl transform rotate-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;