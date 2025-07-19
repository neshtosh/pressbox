import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, TrendingUp, BarChart3, PieChart as PieChartIcon, Table, Zap } from 'lucide-react';

interface LiveScoresProps {
  isScrolled?: boolean;
}

const LiveScores: React.FC<LiveScoresProps> = ({ isScrolled }) => {
  const [selectedSport, setSelectedSport] = useState('soccer');
  const [selectedLeague, setSelectedLeague] = useState('la-liga');
  const [selectedChartType, setSelectedChartType] = useState('table');
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { id: 1, user: 'SportsFan23', message: 'What a game! Real Madrid is on fire tonight! 🔥', time: '2 min ago' },
    { id: 2, user: 'BarcaLover', message: 'Barcelona needs to step up their defense', time: '1 min ago' },
    { id: 3, user: 'AnalyticsGuru', message: 'The possession stats are incredible - 65% to 35%', time: '30 sec ago' },
    { id: 4, user: 'LiveCommentator', message: 'GOAL! What a strike from Bellingham! ⚽', time: 'Just now' },
    { id: 5, user: 'StatsMaster', message: 'That\'s his 18th goal of the season!', time: 'Just now' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data for different sports and leagues (same as analytics)
  const mockData = {
    soccer: {
      'la-liga': {
        table: [
          { position: 1, team: 'Real Madrid', points: 78, played: 28, won: 24, drawn: 2, lost: 2, goalsFor: 65, goalsAgainst: 18, status: 'Live' },
          { position: 2, team: 'Barcelona', points: 76, played: 28, won: 23, drawn: 3, lost: 2, goalsFor: 58, goalsAgainst: 22, status: 'Live' },
          { position: 3, team: 'Girona', points: 71, played: 28, won: 22, drawn: 2, lost: 4, goalsFor: 55, goalsAgainst: 25, status: 'Live' },
          { position: 4, team: 'Atletico Madrid', points: 67, played: 28, won: 20, drawn: 3, lost: 5, goalsFor: 52, goalsAgainst: 28, status: 'Live' },
          { position: 5, team: 'Athletic Bilbao', points: 62, played: 28, won: 18, drawn: 4, lost: 6, goalsFor: 48, goalsAgainst: 30, status: 'Live' }
        ],
        topScorers: [
          { name: 'Jude Bellingham', team: 'Real Madrid', goals: 18 },
          { name: 'Artem Dovbyk', team: 'Girona', goals: 16 },
          { name: 'Robert Lewandowski', team: 'Barcelona', goals: 15 },
          { name: 'Antoine Griezmann', team: 'Atletico Madrid', goals: 14 },
          { name: 'Vinícius Jr.', team: 'Real Madrid', goals: 13 }
        ]
      },
      'premier-league': {
        table: [
          { position: 1, team: 'Arsenal', points: 71, played: 31, won: 22, drawn: 5, lost: 4, goalsFor: 75, goalsAgainst: 24, status: 'Live' },
          { position: 2, team: 'Liverpool', points: 70, played: 31, won: 21, drawn: 7, lost: 3, goalsFor: 72, goalsAgainst: 29, status: 'Live' },
          { position: 3, team: 'Manchester City', points: 67, played: 31, won: 20, drawn: 7, lost: 4, goalsFor: 63, goalsAgainst: 28, status: 'Live' },
          { position: 4, team: 'Aston Villa', points: 66, played: 31, won: 20, drawn: 6, lost: 5, goalsFor: 65, goalsAgainst: 37, status: 'Live' },
          { position: 5, team: 'Tottenham', points: 60, played: 31, won: 18, drawn: 6, lost: 7, goalsFor: 65, goalsAgainst: 45, status: 'Live' }
        ],
        topScorers: [
          { name: 'Erling Haaland', team: 'Manchester City', goals: 18 },
          { name: 'Ollie Watkins', team: 'Aston Villa', goals: 16 },
          { name: 'Mohamed Salah', team: 'Liverpool', goals: 15 },
          { name: 'Bukayo Saka', team: 'Arsenal', goals: 14 },
          { name: 'Son Heung-min', team: 'Tottenham', goals: 14 }
        ]
      }
    },
    basketball: {
      'nba': {
        table: [
          { position: 1, team: 'Boston Celtics', wins: 62, losses: 18, winPercentage: 0.775, pointsFor: 120.8, pointsAgainst: 109.8, status: 'Live' },
          { position: 2, team: 'Milwaukee Bucks', wins: 58, losses: 22, winPercentage: 0.725, pointsFor: 119.0, pointsAgainst: 113.2, status: 'Live' },
          { position: 3, team: 'Cleveland Cavaliers', wins: 56, losses: 24, winPercentage: 0.700, pointsFor: 112.3, pointsAgainst: 110.1, status: 'Live' },
          { position: 4, team: 'Orlando Magic', wins: 54, losses: 26, winPercentage: 0.675, pointsFor: 110.8, pointsAgainst: 108.9, status: 'Live' },
          { position: 5, team: 'New York Knicks', wins: 52, losses: 28, winPercentage: 0.650, pointsFor: 112.7, pointsAgainst: 108.4, status: 'Live' }
        ],
        topScorers: [
          { name: 'Luka Dončić', team: 'Dallas Mavericks', points: 33.9 },
          { name: 'Shai Gilgeous-Alexander', team: 'Oklahoma City Thunder', points: 30.1 },
          { name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks', points: 30.4 },
          { name: 'Joel Embiid', team: 'Philadelphia 76ers', points: 34.7 },
          { name: 'Kevin Durant', team: 'Phoenix Suns', points: 27.1 }
        ]
      }
    },
    football: {
      'nfl': {
        table: [
          { position: 1, team: 'Baltimore Ravens', wins: 13, losses: 4, winPercentage: 0.765, pointsFor: 483, pointsAgainst: 280, status: 'Live' },
          { position: 2, team: 'San Francisco 49ers', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 491, pointsAgainst: 298, status: 'Live' },
          { position: 3, team: 'Dallas Cowboys', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 425, pointsAgainst: 250, status: 'Live' },
          { position: 4, team: 'Detroit Lions', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 461, pointsAgainst: 395, status: 'Live' },
          { position: 5, team: 'Buffalo Bills', wins: 11, losses: 6, winPercentage: 0.647, pointsFor: 451, pointsAgainst: 311, status: 'Live' }
        ],
        topScorers: [
          { name: 'Christian McCaffrey', team: 'San Francisco 49ers', touchdowns: 21 },
          { name: 'Tyreek Hill', team: 'Miami Dolphins', touchdowns: 13 },
          { name: 'CeeDee Lamb', team: 'Dallas Cowboys', touchdowns: 12 },
          { name: 'Amon-Ra St. Brown', team: 'Detroit Lions', touchdowns: 11 },
          { name: 'Davante Adams', team: 'Las Vegas Raiders', touchdowns: 10 }
        ]
      }
    }
  };

  const sports = {
    soccer: {
      name: 'Soccer',
      icon: '⚽',
      leagues: {
        'la-liga': 'La Liga',
        'premier-league': 'Premier League'
      }
    },
    basketball: {
      name: 'Basketball',
      icon: '🏀',
      leagues: {
        'nba': 'NBA'
      }
    },
    football: {
      name: 'Football',
      icon: '🏈',
      leagues: {
        'nfl': 'NFL'
      }
    }
  };

  const chartTypes = [
    { value: 'table', label: 'Table', icon: Table },
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'line', label: 'Line Chart', icon: TrendingUp },
    { value: 'pie', label: 'Pie Chart', icon: PieChartIcon }
  ];

  const currentData = mockData[selectedSport]?.[selectedLeague];

  const getChartData = () => {
    if (!currentData) return [];
    
    return currentData.topScorers.map(scorer => ({
      name: scorer.name,
      team: scorer.team,
      goals: scorer.goals || scorer.points || scorer.touchdowns
    }));
  };

  const COLORS = ['#00C4CC', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const CustomDropdown = ({ 
    label, 
    value, 
    onChange, 
    options, 
    isOpen, 
    setIsOpen, 
    type = 'default' 
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: any[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    type?: 'default' | 'sport' | 'chart';
  }) => (
    <div className="relative">
      <label className="block text-gray-300 text-xs md:text-sm mb-2 md:mb-3 font-medium tracking-wide">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(isOpen ? null : label)}
        className={`w-full px-3 md:px-4 py-3 md:py-4 bg-gray-900/50 border border-gray-700 rounded-lg md:rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 flex items-center justify-between group hover:border-cyan-400/50 text-sm md:text-base ${
          isOpen ? 'border-cyan-400' : ''
        }`}
      >
        <div className="flex items-center space-x-2 md:space-x-3">
          {type === 'sport' && (
            <span className="text-lg md:text-2xl">{sports[value as keyof typeof sports].icon}</span>
          )}
          {type === 'chart' && (
            <span className="text-cyan-400">
              {chartTypes.find(ct => ct.value === value)?.icon && 
                React.createElement(chartTypes.find(ct => ct.value === value)!.icon, { size: 16 })
              }
            </span>
          )}
          <span className="font-medium truncate">
            {type === 'sport' 
              ? sports[value as keyof typeof sports].name
              : type === 'chart'
              ? chartTypes.find(ct => ct.value === value)?.label
              : options.find(opt => opt.value === value)?.label || value
            }
          </span>
        </div>
        <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg md:rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.value || option}
                onClick={() => {
                  onChange(option.value || option);
                  setIsOpen(false);
                }}
                className={`w-full px-3 md:px-4 py-2 md:py-3 text-left rounded-lg transition-all duration-300 flex items-center space-x-2 md:space-x-3 text-sm md:text-base ${
                  value === (option.value || option)
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {type === 'sport' && (
                  <span className="text-lg md:text-xl">{sports[option.value as keyof typeof sports].icon}</span>
                )}
                {type === 'chart' && (
                  <span className="text-cyan-400">
                    {React.createElement(option.icon, { size: 16 })}
                  </span>
                )}
                <span className="truncate">{option.label || option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        message: newMessage,
        time: 'Just now'
      };
      setMessages([message, ...messages]);
      setNewMessage('');
    }
  };

  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-1 h-32 bg-gradient-to-b from-cyan-400/20 to-transparent"></div>
        <div className="absolute top-40 right-20 w-1 h-24 bg-gradient-to-b from-cyan-400/10 to-transparent"></div>
        <div className="absolute bottom-40 left-1/4 w-1 h-16 bg-gradient-to-b from-cyan-400/15 to-transparent"></div>
        
        {/* Dots */}
        <div className="absolute top-32 left-1/3 w-2 h-2 bg-cyan-400/30 rounded-full"></div>
        <div className="absolute top-48 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full"></div>
        <div className="absolute bottom-32 left-1/2 w-1.5 h-1.5 bg-cyan-400/25 rounded-full"></div>
        <div className="absolute top-64 right-1/3 w-1 h-1 bg-cyan-400/35 rounded-full"></div>
        
        {/* Grid Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #00C4CC 1px, transparent 1px),
              linear-gradient(to bottom, #00C4CC 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="w-1 h-1 bg-cyan-400/60 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">
            LIVE SCORES
          </h2>
          <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Real-time statistics and live commentary for all major sports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Live Scores Table */}
          <div className="space-y-4 md:space-y-6">
            {/* Filters */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Sport Selection */}
                <CustomDropdown
                  label="SPORT"
                  value={selectedSport}
                  onChange={(value) => {
                    setSelectedSport(value);
                    setSelectedLeague(Object.keys(sports[value as keyof typeof sports].leagues)[0]);
                  }}
                  options={Object.entries(sports).map(([key, sport]) => ({ value: key, label: sport.name }))}
                  isOpen={isDropdownOpen === 'SPORT'}
                  setIsOpen={setIsDropdownOpen}
                  type="sport"
                />

                {/* League Selection */}
                <CustomDropdown
                  label="LEAGUE"
                  value={selectedLeague}
                  onChange={setSelectedLeague}
                  options={Object.entries(sports[selectedSport as keyof typeof sports].leagues).map(([key, name]) => ({ value: key, label: name }))}
                  isOpen={isDropdownOpen === 'LEAGUE'}
                  setIsOpen={setIsDropdownOpen}
                />

                {/* Chart Type Selection */}
                <CustomDropdown
                  label="VIEW"
                  value={selectedChartType}
                  onChange={setSelectedChartType}
                  options={chartTypes}
                  isOpen={isDropdownOpen === 'VIEW'}
                  setIsOpen={setIsDropdownOpen}
                  type="chart"
                />
              </div>
            </div>

            {/* Live Table */}
            {currentData && (
              <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
                  <div className="w-1 h-6 md:h-8 bg-cyan-400 rounded-full"></div>
                  <h3 className="text-base md:text-xl font-orbitron font-bold text-white leading-tight">
                    {sports[selectedSport as keyof typeof sports].leagues[selectedLeague as keyof typeof sports[typeof selectedSport]['leagues']]} LIVE STANDINGS
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left py-3 md:py-4 px-3 md:px-6 text-cyan-400 font-semibold tracking-wide">POS</th>
                        <th className="text-left py-3 md:py-4 px-3 md:px-6 text-cyan-400 font-semibold tracking-wide">TEAM</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">P</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">W</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">D</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">L</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">GF</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">GA</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">PTS</th>
                        <th className="text-center py-3 md:py-4 px-2 md:px-6 text-cyan-400 font-semibold tracking-wide">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.table.map((row, index) => (
                        <tr key={index} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-300">
                          <td className="py-3 md:py-4 px-3 md:px-6 font-bold text-cyan-400">{row.position}</td>
                          <td className="py-3 md:py-4 px-3 md:px-6 font-semibold truncate max-w-20 md:max-w-none">{row.team}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.played || row.wins}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.won || row.wins}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.drawn || 0}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.lost || row.losses}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.goalsFor || row.pointsFor}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">{row.goalsAgainst || row.pointsAgainst}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center font-bold text-cyan-400">{row.points || row.winPercentage}</td>
                          <td className="py-3 md:py-4 px-2 md:px-6 text-center">
                            <span className="px-1 md:px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs border border-red-400/30 animate-pulse">
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Live Chat */}
          <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl md:rounded-2xl p-4 md:p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6">
              <div className="w-1 h-6 md:h-8 bg-cyan-400 rounded-full"></div>
              <h3 className="text-lg md:text-2xl font-orbitron font-bold text-white">LIVE CHAT</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs md:text-sm font-medium">LIVE</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 md:h-96 overflow-y-auto mb-4 space-y-3 md:space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-3 md:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-400 font-semibold text-xs md:text-sm">{message.user}</span>
                    <span className="text-gray-400 text-xs">{message.time}</span>
                  </div>
                  <p className="text-gray-300 text-xs md:text-sm break-words">{message.message}</p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2 md:space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 text-sm md:text-base"
              />
              <button
                type="submit"
                className="px-4 md:px-6 py-2 md:py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base"
              >
                <Send className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveScores;