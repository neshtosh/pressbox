import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp } from 'lucide-react';

const TeamStats: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('Football');

  const nflData = [
    { team: 'Ravens', wins: 13, losses: 4, pointsFor: 483, pointsAgainst: 280 },
    { team: '49ers', wins: 12, losses: 5, pointsFor: 491, pointsAgainst: 298 },
    { team: 'Cowboys', wins: 12, losses: 5, pointsFor: 425, pointsAgainst: 315 },
    { team: 'Chiefs', wins: 12, losses: 5, pointsFor: 371, pointsAgainst: 294 },
    { team: 'Bills', wins: 11, losses: 6, pointsFor: 451, pointsAgainst: 311 }
  ];

  const nbaData = [
    { team: 'Celtics', wins: 37, losses: 11, pointsFor: 120.8, pointsAgainst: 110.6 },
    { team: 'Bucks', wins: 30, losses: 13, pointsFor: 124.6, pointsAgainst: 119.8 },
    { team: '76ers', wins: 26, losses: 13, pointsFor: 119.8, pointsAgainst: 111.2 },
    { team: 'Nuggets', wins: 31, losses: 14, pointsFor: 115.2, pointsAgainst: 111.4 },
    { team: 'Thunder', wins: 31, losses: 13, pointsFor: 121.8, pointsAgainst: 112.4 }
  ];

  const currentData = selectedSport === 'Football' ? nflData : nbaData;

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6">
            TEAM <span className="text-cyan-400">STATS</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Comprehensive team statistics and performance metrics
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Football', 'Basketball'].map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${
                selectedSport === sport
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl font-orbitron font-bold text-white mb-6 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-cyan-400" />
            <span>Team Performance</span>
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="team" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="wins" fill="#00D9FF" name="Wins" />
              <Bar dataKey="losses" fill="#FF6B35" name="Losses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeamStats; 