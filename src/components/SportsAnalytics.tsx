import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChevronDown, TrendingUp, BarChart3, PieChart as PieChartIcon, Table, Zap } from 'lucide-react';

interface SportsAnalyticsProps {
  isScrolled?: boolean;
}

const SportsAnalytics: React.FC<SportsAnalyticsProps> = ({ isScrolled }) => {
  const [selectedSport, setSelectedSport] = useState('soccer');
  const [selectedLeague, setSelectedLeague] = useState('la-liga');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedChartType, setSelectedChartType] = useState('table');
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  // Mock data for different sports and leagues
  const mockData = {
    soccer: {
      'la-liga': {
        '2024': {
          table: [
            { position: 1, team: 'Real Madrid', points: 78, played: 28, won: 24, drawn: 2, lost: 2, goalsFor: 65, goalsAgainst: 18 },
            { position: 2, team: 'Barcelona', points: 76, played: 28, won: 23, drawn: 3, lost: 2, goalsFor: 58, goalsAgainst: 22 },
            { position: 3, team: 'Girona', points: 71, played: 28, won: 22, drawn: 2, lost: 4, goalsFor: 55, goalsAgainst: 25 },
            { position: 4, team: 'Atletico Madrid', points: 67, played: 28, won: 20, drawn: 3, lost: 5, goalsFor: 52, goalsAgainst: 28 },
            { position: 5, team: 'Athletic Bilbao', points: 62, played: 28, won: 18, drawn: 4, lost: 6, goalsFor: 48, goalsAgainst: 30 }
          ],
          topScorers: [
            { name: 'Jude Bellingham', team: 'Real Madrid', goals: 18 },
            { name: 'Artem Dovbyk', team: 'Girona', goals: 16 },
            { name: 'Robert Lewandowski', team: 'Barcelona', goals: 15 },
            { name: 'Antoine Griezmann', team: 'Atletico Madrid', goals: 14 },
            { name: 'Vinícius Jr.', team: 'Real Madrid', goals: 13 }
          ]
        },
        '2023': {
          table: [
            { position: 1, team: 'Barcelona', points: 88, played: 38, won: 28, drawn: 4, lost: 6, goalsFor: 70, goalsAgainst: 20 },
            { position: 2, team: 'Real Madrid', points: 78, played: 38, won: 24, drawn: 6, lost: 8, goalsFor: 75, goalsAgainst: 36 },
            { position: 3, team: 'Atletico Madrid', points: 77, played: 38, won: 23, drawn: 8, lost: 7, goalsFor: 70, goalsAgainst: 33 },
            { position: 4, team: 'Real Sociedad', points: 71, played: 38, won: 21, drawn: 8, lost: 9, goalsFor: 51, goalsAgainst: 35 },
            { position: 5, team: 'Villarreal', points: 64, played: 38, won: 19, drawn: 7, lost: 12, goalsFor: 59, goalsAgainst: 40 }
          ],
          topScorers: [
            { name: 'Robert Lewandowski', team: 'Barcelona', goals: 23 },
            { name: 'Karim Benzema', team: 'Real Madrid', goals: 19 },
            { name: 'Joselu', team: 'Espanyol', goals: 16 },
            { name: 'Antoine Griezmann', team: 'Atletico Madrid', goals: 15 },
            { name: 'Vedat Muriqi', team: 'Mallorca', goals: 15 }
          ]
        }
      },
      'premier-league': {
        '2024': {
          table: [
            { position: 1, team: 'Arsenal', points: 71, played: 31, won: 22, drawn: 5, lost: 4, goalsFor: 75, goalsAgainst: 24 },
            { position: 2, team: 'Liverpool', points: 70, played: 31, won: 21, drawn: 7, lost: 3, goalsFor: 72, goalsAgainst: 29 },
            { position: 3, team: 'Manchester City', points: 67, played: 31, won: 20, drawn: 7, lost: 4, goalsFor: 63, goalsAgainst: 28 },
            { position: 4, team: 'Aston Villa', points: 66, played: 31, won: 20, drawn: 6, lost: 5, goalsFor: 65, goalsAgainst: 37 },
            { position: 5, team: 'Tottenham', points: 60, played: 31, won: 18, drawn: 6, lost: 7, goalsFor: 65, goalsAgainst: 45 }
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
      'bundesliga': {
        '2024': {
          table: [
            { position: 1, team: 'Bayer Leverkusen', points: 79, played: 28, won: 25, drawn: 4, lost: 0, goalsFor: 74, goalsAgainst: 19 },
            { position: 2, team: 'Bayern Munich', points: 66, played: 28, won: 21, drawn: 3, lost: 4, goalsFor: 78, goalsAgainst: 32 },
            { position: 3, team: 'Stuttgart', points: 63, played: 28, won: 20, drawn: 3, lost: 5, goalsFor: 63, goalsAgainst: 31 },
            { position: 4, team: 'RB Leipzig', points: 56, played: 28, won: 17, drawn: 5, lost: 6, goalsFor: 60, goalsAgainst: 32 },
            { position: 5, team: 'Borussia Dortmund', points: 56, played: 28, won: 17, drawn: 5, lost: 6, goalsFor: 55, goalsAgainst: 35 }
          ],
          topScorers: [
            { name: 'Harry Kane', team: 'Bayern Munich', goals: 27 },
            { name: 'Serhou Guirassy', team: 'Stuttgart', goals: 24 },
            { name: 'Victor Boniface', team: 'Bayer Leverkusen', goals: 18 },
            { name: 'Lois Openda', team: 'RB Leipzig', goals: 17 },
            { name: 'Deniz Undav', team: 'Stuttgart', goals: 16 }
          ]
        }
      }
    },
    basketball: {
      'nba': {
        '2024': {
          table: [
            { position: 1, team: 'Boston Celtics', wins: 62, losses: 18, winPercentage: 0.775, pointsFor: 120.8, pointsAgainst: 109.8 },
            { position: 2, team: 'Milwaukee Bucks', wins: 58, losses: 22, winPercentage: 0.725, pointsFor: 119.0, pointsAgainst: 113.2 },
            { position: 3, team: 'Cleveland Cavaliers', wins: 56, losses: 24, winPercentage: 0.700, pointsFor: 112.3, pointsAgainst: 110.1 },
            { position: 4, team: 'Orlando Magic', wins: 54, losses: 26, winPercentage: 0.675, pointsFor: 110.8, pointsAgainst: 108.9 },
            { position: 5, team: 'New York Knicks', wins: 52, losses: 28, winPercentage: 0.650, pointsFor: 112.7, pointsAgainst: 108.4 }
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
      'euroleague': {
        '2024': {
          table: [
            { position: 1, team: 'Real Madrid', wins: 18, losses: 2, winPercentage: 0.900, pointsFor: 89.2, pointsAgainst: 78.1 },
            { position: 2, team: 'Barcelona', wins: 16, losses: 4, winPercentage: 0.800, pointsFor: 85.6, pointsAgainst: 79.3 },
            { position: 3, team: 'Olympiacos', wins: 15, losses: 5, winPercentage: 0.750, pointsFor: 82.1, pointsAgainst: 77.8 },
            { position: 4, team: 'Fenerbahçe', wins: 14, losses: 6, winPercentage: 0.700, pointsFor: 84.3, pointsAgainst: 80.2 },
            { position: 5, team: 'Monaco', wins: 13, losses: 7, winPercentage: 0.650, pointsFor: 83.7, pointsAgainst: 81.5 }
          ],
          topScorers: [
            { name: 'Shane Larkin', team: 'Efes', points: 19.2 },
            { name: 'Mike James', team: 'Monaco', points: 18.8 },
            { name: 'Will Clyburn', team: 'Fenerbahçe', points: 17.5 },
            { name: 'Kostas Sloukas', team: 'Olympiacos', points: 16.9 },
            { name: 'Nicolas Laprovittola', team: 'Barcelona', points: 16.2 }
          ]
        }
      }
    },
    football: {
      'nfl': {
        '2024': {
          table: [
            { position: 1, team: 'Baltimore Ravens', wins: 13, losses: 4, winPercentage: 0.765, pointsFor: 483, pointsAgainst: 280 },
            { position: 2, team: 'San Francisco 49ers', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 491, pointsAgainst: 298 },
            { position: 3, team: 'Dallas Cowboys', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 425, pointsAgainst: 250 },
            { position: 4, team: 'Detroit Lions', wins: 12, losses: 5, winPercentage: 0.706, pointsFor: 461, pointsAgainst: 395 },
            { position: 5, team: 'Buffalo Bills', wins: 11, losses: 6, winPercentage: 0.647, pointsFor: 451, pointsAgainst: 311 }
          ],
          topScorers: [
            { name: 'Christian McCaffrey', team: 'San Francisco 49ers', touchdowns: 21 },
            { name: 'Tyreek Hill', team: 'Miami Dolphins', touchdowns: 13 },
            { name: 'CeeDee Lamb', team: 'Dallas Cowboys', touchdowns: 12 },
            { name: 'Amon-Ra St. Brown', team: 'Detroit Lions', touchdowns: 11 },
            { name: 'Davante Adams', team: 'Las Vegas Raiders', touchdowns: 10 }
          ]
        }
      },
      'ncaa': {
        '2024': {
          table: [
            { position: 1, team: 'Michigan Wolverines', wins: 15, losses: 0, winPercentage: 1.000, pointsFor: 477, pointsAgainst: 243 },
            { position: 2, team: 'Washington Huskies', wins: 14, losses: 1, winPercentage: 0.933, pointsFor: 452, pointsAgainst: 289 },
            { position: 3, team: 'Texas Longhorns', wins: 12, losses: 2, winPercentage: 0.857, pointsFor: 431, pointsAgainst: 298 },
            { position: 4, team: 'Alabama Crimson Tide', wins: 12, losses: 2, winPercentage: 0.857, pointsFor: 423, pointsAgainst: 301 },
            { position: 5, team: 'Florida State Seminoles', wins: 13, losses: 1, winPercentage: 0.929, pointsFor: 415, pointsAgainst: 275 }
          ],
          topScorers: [
            { name: 'Blake Corum', team: 'Michigan', touchdowns: 27 },
            { name: 'Ollie Gordon II', team: 'Oklahoma State', touchdowns: 21 },
            { name: 'Audric Estime', team: 'Notre Dame', touchdowns: 18 },
            { name: 'Cody Schrader', team: 'Missouri', touchdowns: 17 },
            { name: 'Bucky Irving', team: 'Oregon', touchdowns: 16 }
          ]
        }
      }
    },
    boxing: {
      'heavyweight': {
        '2024': {
          table: [
            { position: 1, name: 'Tyson Fury', record: '34-0-1', wins: 34, losses: 0, draws: 1, knockouts: 24 },
            { position: 2, name: 'Oleksandr Usyk', record: '21-0-0', wins: 21, losses: 0, draws: 0, knockouts: 14 },
            { position: 3, name: 'Anthony Joshua', record: '27-3-0', wins: 27, losses: 3, draws: 0, knockouts: 24 },
            { position: 4, name: 'Deontay Wilder', record: '43-3-1', wins: 43, losses: 3, draws: 1, knockouts: 42 },
            { position: 5, name: 'Daniel Dubois', record: '19-2-0', wins: 19, losses: 2, draws: 0, knockouts: 18 }
          ],
          topFighters: [
            { name: 'Tyson Fury', wins: 34, knockouts: 24, winPercentage: 97.1 },
            { name: 'Oleksandr Usyk', wins: 21, knockouts: 14, winPercentage: 100.0 },
            { name: 'Anthony Joshua', wins: 27, knockouts: 24, winPercentage: 90.0 },
            { name: 'Deontay Wilder', wins: 43, knockouts: 42, winPercentage: 91.5 },
            { name: 'Daniel Dubois', wins: 19, knockouts: 18, winPercentage: 90.5 }
          ]
        }
      },
      'middleweight': {
        '2024': {
          table: [
            { position: 1, name: 'Canelo Alvarez', record: '60-2-2', wins: 60, losses: 2, draws: 2, knockouts: 39 },
            { position: 2, name: 'Jermall Charlo', record: '32-0-0', wins: 32, losses: 0, draws: 0, knockouts: 22 },
            { position: 3, name: 'David Benavidez', record: '28-0-0', wins: 28, losses: 0, draws: 0, knockouts: 24 },
            { position: 4, name: 'Carlos Adames', record: '24-1-0', wins: 24, losses: 1, draws: 0, knockouts: 18 },
            { position: 5, name: 'Sergiy Derevyanchenko', record: '14-3-0', wins: 14, losses: 3, draws: 0, knockouts: 10 }
          ],
          topFighters: [
            { name: 'Canelo Alvarez', wins: 60, knockouts: 39, winPercentage: 93.8 },
            { name: 'Jermall Charlo', wins: 32, knockouts: 22, winPercentage: 100.0 },
            { name: 'David Benavidez', wins: 28, knockouts: 24, winPercentage: 100.0 },
            { name: 'Carlos Adames', wins: 24, knockouts: 18, winPercentage: 96.0 },
            { name: 'Sergiy Derevyanchenko', wins: 14, knockouts: 10, winPercentage: 82.4 }
          ]
        }
      },
      'lightweight': {
        '2024': {
          table: [
            { position: 1, name: 'Devin Haney', record: '31-0-0', wins: 31, losses: 0, draws: 0, knockouts: 15 },
            { position: 2, name: 'Gervonta Davis', record: '29-0-0', wins: 29, losses: 0, draws: 0, knockouts: 27 },
            { position: 3, name: 'Ryan Garcia', record: '24-1-0', wins: 24, losses: 1, draws: 0, knockouts: 20 },
            { position: 4, name: 'Isaac Cruz', record: '25-2-1', wins: 25, losses: 2, draws: 1, knockouts: 17 },
            { position: 5, name: 'William Zepeda', record: '29-0-0', wins: 29, losses: 0, draws: 0, knockouts: 25 }
          ],
          topFighters: [
            { name: 'Devin Haney', wins: 31, knockouts: 15, winPercentage: 100.0 },
            { name: 'Gervonta Davis', wins: 29, knockouts: 27, winPercentage: 100.0 },
            { name: 'Ryan Garcia', wins: 24, knockouts: 20, winPercentage: 96.0 },
            { name: 'Isaac Cruz', wins: 25, knockouts: 17, winPercentage: 89.3 },
            { name: 'William Zepeda', wins: 29, knockouts: 25, winPercentage: 100.0 }
          ]
        }
      }
    }
  };

  const sports = {
    soccer: {
      name: 'Soccer',
      icon: '⚽',
      leagues: {
        'la-liga': 'La Liga',
        'premier-league': 'Premier League',
        'bundesliga': 'Bundesliga'
      }
    },
    basketball: {
      name: 'Basketball',
      icon: '🏀',
      leagues: {
        'nba': 'NBA',
        'euroleague': 'EuroLeague'
      }
    },
    football: {
      name: 'Football',
      icon: '🏈',
      leagues: {
        'nfl': 'NFL',
        'ncaa': 'NCAA'
      }
    },
    boxing: {
      name: 'Boxing',
      icon: '🥊',
      leagues: {
        'heavyweight': 'Heavyweight',
        'middleweight': 'Middleweight',
        'lightweight': 'Lightweight'
      }
    }
  };

  const years = ['2024', '2023', '2022', '2021', '2020'];
  const chartTypes = [
    { value: 'table', label: 'Table', icon: Table },
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'line', label: 'Line Chart', icon: TrendingUp },
    { value: 'pie', label: 'Pie Chart', icon: PieChartIcon }
  ];

  const currentData = mockData[selectedSport]?.[selectedLeague]?.[selectedYear];

  const getChartData = () => {
    if (!currentData) return [];
    
    if (selectedSport === 'boxing') {
      return currentData.topFighters.map(fighter => ({
        name: fighter.name,
        wins: fighter.wins,
        knockouts: fighter.knockouts,
        winPercentage: fighter.winPercentage
      }));
    } else {
      return currentData.topScorers.map(scorer => ({
        name: scorer.name,
        team: scorer.team,
        goals: scorer.goals || scorer.points || scorer.touchdowns
      }));
    }
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
      <label className="block text-gray-300 text-sm mb-3 font-medium tracking-wide">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(isOpen ? null : label)}
        className={`w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-all duration-300 flex items-center justify-between group hover:border-cyan-400/50 ${
          isOpen ? 'border-cyan-400' : ''
        }`}
      >
        <div className="flex items-center space-x-3">
          {type === 'sport' && (
            <span className="text-2xl">{sports[value as keyof typeof sports].icon}</span>
          )}
          {type === 'chart' && (
            <span className="text-cyan-400">
              {chartTypes.find(ct => ct.value === value)?.icon && 
                React.createElement(chartTypes.find(ct => ct.value === value)!.icon, { size: 20 })
              }
            </span>
          )}
          <span className="font-medium">
            {type === 'sport' 
              ? sports[value as keyof typeof sports].name
              : type === 'chart'
              ? chartTypes.find(ct => ct.value === value)?.label
              : options.find(opt => opt.value === value)?.label || value
            }
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          <div className="p-2">
            {options.map((option) => (
              <button
                key={option.value || option}
                onClick={() => {
                  onChange(option.value || option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                  value === (option.value || option)
                    ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {type === 'sport' && (
                  <span className="text-xl">{sports[option.value as keyof typeof sports].icon}</span>
                )}
                {type === 'chart' && (
                  <span className="text-cyan-400">
                    {React.createElement(option.icon, { size: 18 })}
                  </span>
                )}
                <span>{option.label || option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Futuristic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="w-1 h-1 bg-cyan-400/60 rounded-full"></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-white mb-6 tracking-tight">
            ANALYTICS
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Comprehensive statistics and charts for all major sports leagues
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 mb-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Year Selection */}
            <CustomDropdown
              label="YEAR"
              value={selectedYear}
              onChange={setSelectedYear}
              options={years}
              isOpen={isDropdownOpen === 'YEAR'}
              setIsOpen={setIsDropdownOpen}
            />

            {/* Chart Type Selection */}
            <CustomDropdown
              label="CHART TYPE"
              value={selectedChartType}
              onChange={setSelectedChartType}
              options={chartTypes}
              isOpen={isDropdownOpen === 'CHART TYPE'}
              setIsOpen={setIsDropdownOpen}
              type="chart"
            />
          </div>

          {/* Current Selection Display */}
          <div className="mt-8 p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{sports[selectedSport as keyof typeof sports].icon}</span>
                <div>
                  <p className="text-cyan-400 font-semibold text-lg">
                    {sports[selectedSport as keyof typeof sports].name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {sports[selectedSport as keyof typeof sports].leagues[selectedLeague as keyof typeof sports[typeof selectedSport]['leagues']]} • {selectedYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-cyan-400">
                  {chartTypes.find(ct => ct.value === selectedChartType)?.icon && 
                    React.createElement(chartTypes.find(ct => ct.value === selectedChartType)!.icon, { size: 24 })
                  }
                </span>
                <span className="text-gray-400 text-sm font-medium">
                  {chartTypes.find(ct => ct.value === selectedChartType)?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Display */}
        {currentData ? (
          <div className="space-y-12">
            {/* League Table */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-1 h-8 bg-cyan-400 rounded-full"></div>
                <h2 className="text-3xl font-orbitron font-bold text-white">
                  {sports[selectedSport as keyof typeof sports].leagues[selectedLeague as keyof typeof sports[typeof selectedSport]['leagues']]} {selectedYear} STANDINGS
                </h2>
              </div>
              
              {selectedChartType === 'table' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700/50">
                        <th className="text-left py-4 px-6 text-cyan-400 font-semibold tracking-wide">POS</th>
                        <th className="text-left py-4 px-6 text-cyan-400 font-semibold tracking-wide">TEAM</th>
                        {selectedSport !== 'boxing' ? (
                          <>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">P</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">W</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">D</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">L</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">GF</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">GA</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">PTS</th>
                          </>
                        ) : (
                          <>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">RECORD</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">W</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">L</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">D</th>
                            <th className="text-center py-4 px-6 text-cyan-400 font-semibold tracking-wide">KO</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.table.map((row, index) => (
                        <tr key={index} className="border-b border-gray-800/30 hover:bg-gray-800/20 transition-all duration-300">
                          <td className="py-4 px-6 font-bold text-cyan-400">{row.position}</td>
                          <td className="py-4 px-6 font-semibold">{row.team || row.name}</td>
                          {selectedSport !== 'boxing' ? (
                            <>
                              <td className="py-4 px-6 text-center">{row.played || row.wins}</td>
                              <td className="py-4 px-6 text-center">{row.won || row.wins}</td>
                              <td className="py-4 px-6 text-center">{row.drawn || row.draws || 0}</td>
                              <td className="py-4 px-6 text-center">{row.lost || row.losses}</td>
                              <td className="py-4 px-6 text-center">{row.goalsFor || row.pointsFor}</td>
                              <td className="py-4 px-6 text-center">{row.goalsAgainst || row.pointsAgainst}</td>
                              <td className="py-4 px-6 text-center font-bold text-cyan-400">{row.points || row.winPercentage}</td>
                            </>
                          ) : (
                            <>
                              <td className="py-4 px-6 text-center">{row.record}</td>
                              <td className="py-4 px-6 text-center">{row.wins}</td>
                              <td className="py-4 px-6 text-center">{row.losses}</td>
                              <td className="py-4 px-6 text-center">{row.draws}</td>
                              <td className="py-4 px-6 text-center">{row.knockouts}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    {selectedChartType === 'bar' ? (
                      <BarChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '12px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Legend />
                        <Bar dataKey={selectedSport === 'boxing' ? 'wins' : 'goals'} fill="#00C4CC" />
                      </BarChart>
                    ) : selectedChartType === 'line' ? (
                      <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '12px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey={selectedSport === 'boxing' ? 'wins' : 'goals'} stroke="#00C4CC" strokeWidth={3} />
                      </LineChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey={selectedSport === 'boxing' ? 'wins' : 'goals'}
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '12px',
                            color: '#F9FAFB'
                          }}
                        />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Top Performers */}
            <div className="bg-gray-900/30 border border-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-1 h-8 bg-cyan-400 rounded-full"></div>
                <h2 className="text-3xl font-orbitron font-bold text-white">
                  TOP {selectedSport === 'boxing' ? 'FIGHTERS' : selectedSport === 'basketball' ? 'SCORERS' : selectedSport === 'football' ? 'TOUCHDOWN LEADERS' : 'SCORERS'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentData.topScorers?.slice(0, 6).map((performer, index) => (
                  <div key={index} className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-cyan-400/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
                          <span className="text-cyan-400 font-bold text-sm">#{index + 1}</span>
                        </div>
                        <span className="text-2xl">{selectedSport === 'boxing' ? '🥊' : selectedSport === 'basketball' ? '🏀' : selectedSport === 'football' ? '🏈' : '⚽'}</span>
                      </div>
                      <div className="w-2 h-2 bg-cyan-400/40 rounded-full group-hover:bg-cyan-400 transition-colors duration-300"></div>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{performer.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{performer.team}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-cyan-400 font-bold text-2xl">
                          {performer.goals || performer.points || performer.touchdowns || performer.knockouts}
                        </span>
                        <span className="text-gray-400 text-sm font-medium">
                          {selectedSport === 'boxing' ? 'Wins' : selectedSport === 'basketball' ? 'PPG' : selectedSport === 'football' ? 'TDs' : 'Goals'}
                        </span>
                      </div>
                      <div className="w-1 h-8 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-2 border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 text-lg">No data available for the selected combination.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsAnalytics; 