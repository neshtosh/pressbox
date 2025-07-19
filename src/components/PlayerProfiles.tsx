import React from "react";

const PlayerProfiles: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
            PLAYER <span className="text-cyan-400">PROFILES</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Individual player statistics and performance analysis
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfiles;
