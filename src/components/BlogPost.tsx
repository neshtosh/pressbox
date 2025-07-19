import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Share2, Bookmark, Heart, MessageCircle, Twitter, Facebook, Link2, ChevronUp, Search, Filter, X, ChevronDown } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';

interface BlogPostProps {
  postId?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ postId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const actualPostId = postId || id || '1';
  
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(247);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock blog posts data for different sports
  const blogPosts = {
    football: [
      {
        id: '1',
        title: "The Evolution of Modern Football Strategy: How Data Analytics is Revolutionizing the Game",
        subtitle: "From traditional play-calling to AI-driven decisions, explore how technology is reshaping America's favorite sport",
        excerpt: "Modern NFL teams now employ entire departments dedicated to analytics, with data scientists working alongside coaches to decode the complexities of the game...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 127, followers: "45.2K" }
        },
        publishDate: "December 15, 2024 at 2:30 PM",
        readTime: "8 min read",
        category: "Football",
        sport: "🏈",
        tags: ["Analytics", "Strategy", "NFL", "Technology"],
        image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 34,
        shares: 156,
        likes: 247
      },
      {
        id: '2',
        title: "Quarterback Revolution: The Rise of Mobile QBs in the NFL",
        subtitle: "How dual-threat quarterbacks are changing the landscape of professional football",
        excerpt: "The traditional pocket passer is becoming a relic of the past as mobile quarterbacks dominate the league...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 89, followers: "32.1K" }
        },
        publishDate: "December 12, 2024 at 1:45 PM",
        readTime: "6 min read",
        category: "Football",
        sport: "🏈",
        tags: ["Quarterbacks", "NFL", "Strategy", "Evolution"],
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 28,
        shares: 134,
        likes: 189
      },
      {
        id: '3',
        title: "Defensive Mastery: The Art of Modern NFL Defense",
        subtitle: "Exploring the sophisticated defensive schemes that are dominating today's game",
        excerpt: "Modern NFL defenses are more complex and sophisticated than ever before, requiring players to be versatile and intelligent...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 156, followers: "67.8K" }
        },
        publishDate: "December 10, 2024 at 10:15 AM",
        readTime: "10 min read",
        category: "Football",
        sport: "🏈",
        tags: ["Defense", "NFL", "Strategy", "Analysis"],
        image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 42,
        shares: 178,
        likes: 312
      }
    ],
    basketball: [
      {
        id: '4',
        title: "The Three-Point Revolution: How Analytics Changed Basketball Forever",
        subtitle: "The dramatic shift from mid-range jumpers to three-point dominance",
        excerpt: "The NBA has undergone a fundamental transformation in how the game is played, with analytics driving every decision...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 203, followers: "89.4K" }
        },
        publishDate: "December 14, 2024 at 3:20 PM",
        readTime: "7 min read",
        category: "Basketball",
        sport: "🏀",
        tags: ["Analytics", "Three-Point", "NBA", "Strategy"],
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 56,
        shares: 234,
        likes: 445
      },
      {
        id: '5',
        title: "Positionless Basketball: The Future of the NBA",
        subtitle: "How modern players are breaking traditional position boundaries",
        excerpt: "The concept of traditional positions is becoming obsolete as players develop more versatile skill sets...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 167, followers: "112.3K" }
        },
        publishDate: "December 11, 2024 at 11:00 AM",
        readTime: "9 min read",
        category: "Basketball",
        sport: "🏀",
        tags: ["Positionless", "NBA", "Evolution", "Strategy"],
        image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 38,
        shares: 167,
        likes: 298
      }
    ],
    soccer: [
      {
        id: '6',
        title: "Tiki-Taka to Gegenpressing: The Evolution of Soccer Tactics",
        subtitle: "How pressing has become the dominant tactical approach in modern football",
        excerpt: "The beautiful game has evolved dramatically, with pressing becoming the cornerstone of successful teams...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 145, followers: "78.9K" }
        },
        publishDate: "December 13, 2024 at 2:10 PM",
        readTime: "11 min read",
        category: "Soccer",
        sport: "⚽",
        tags: ["Tactics", "Pressing", "Premier League", "Strategy"],
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 67,
        shares: 289,
        likes: 523
      }
    ],
    baseball: [
      {
        id: '7',
        title: "The Analytics Revolution in Baseball: Moneyball's Legacy",
        subtitle: "How sabermetrics continues to shape the modern game",
        excerpt: "Baseball's embrace of analytics has fundamentally changed how teams evaluate players and make strategic decisions...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 98, followers: "56.7K" }
        },
        publishDate: "December 9, 2024 at 4:15 PM",
        readTime: "8 min read",
        category: "Baseball",
        sport: "⚾",
        tags: ["Analytics", "Sabermetrics", "MLB", "Strategy"],
        image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 45,
        shares: 198,
        likes: 334
      }
    ],
    hockey: [
      {
        id: '8',
        title: "The Speed Revolution: How Modern Hockey is Faster Than Ever",
        subtitle: "Exploring the evolution of hockey's pace and skill requirements",
        excerpt: "Today's NHL is faster, more skilled, and more demanding than ever before, requiring players to adapt to new standards...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 134, followers: "43.2K" }
        },
        publishDate: "December 8, 2024 at 1:30 PM",
        readTime: "6 min read",
        category: "Hockey",
        sport: "🏒",
        tags: ["Speed", "NHL", "Evolution", "Skills"],
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 32,
        shares: 145,
        likes: 267
      }
    ],
    esports: [
      {
        id: '9',
        title: "The Rise of Esports: From Niche to Mainstream",
        subtitle: "How competitive gaming has become a global phenomenon",
        excerpt: "Esports has evolved from basement tournaments to stadium-filling events with millions of viewers worldwide...",
        author: {
          name: "Admin",
          avatar: "",
          stats: { articles: 178, followers: "92.1K" }
        },
        publishDate: "December 7, 2024 at 3:45 PM",
        readTime: "9 min read",
        category: "eSports",
        sport: "🎮",
        tags: ["eSports", "Gaming", "Competition", "Technology"],
        image: "https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        comments: 78,
        shares: 312,
        likes: 589
      }
    ]
  };

  // Get the sport category from the URL
  const sportCategory = id?.toLowerCase() || 'football';
  const posts = blogPosts[sportCategory as keyof typeof blogPosts] || blogPosts.football;

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const allPosts = Object.values(blogPosts).flat();
    const results = allPosts.filter(post => {
      const searchTerm = query.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      const authorMatch = post.author.name.toLowerCase().includes(searchTerm);
      const categoryMatch = post.category.toLowerCase().includes(searchTerm);
      
      return titleMatch || tagMatch || authorMatch || categoryMatch;
    });

    setSearchResults(results);
  };

  const handleSearchClick = () => {
    console.log('Search button clicked, current state:', showSearch);
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);
      setShowScrollTop(scrolled > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "PRESSBOX Blog";
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-black/95 backdrop-blur-md border-b border-cyan-400/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  console.log('Search button clicked!');
                  setShowSearch(!showSearch);
                  if (!showSearch) {
                    setSearchQuery('');
                    setSearchResults([]);
                  }
                }}
                className={`p-3 rounded-full border-2 cursor-pointer transition-all duration-300 relative z-[70] ${
                  showSearch 
                    ? 'bg-cyan-400 text-black border-cyan-400' 
                    : 'bg-gray-800 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/50 border-gray-700 hover:bg-gray-700'
                }`}
                style={{ minWidth: '50px', minHeight: '50px' }}
              >
                <Search className="w-6 h-6" />
              </button>
              
              <div className="relative group">
                <button className="p-2 bg-gray-800 rounded-full text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
                
                <div className="absolute left-0 top-full mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Share on Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Share on Facebook</span>
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg items-center justify-center">
                <span className="text-black font-orbitron font-bold text-sm">PB</span>
              </div>
              <span className="hidden md:block text-xl font-orbitron font-bold text-white">
                PRESS<span className="text-cyan-400">BOX</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-cyan-400 transition-colors">
                Home
              </Link>
              
              <div className="relative group">
                <button className="text-white hover:text-cyan-400 transition-colors flex items-center space-x-1">
                  <span>Blogs</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                <div className="absolute left-0 top-full mt-2 w-48 bg-black/95 backdrop-blur-md border border-cyan-400/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link
                    to="/blog/football"
                    className="block px-4 py-3 text-white hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                  >
                    <span>🏈</span>
                    <span>Football</span>
                  </Link>
                  <Link
                    to="/blog/basketball"
                    className="block px-4 py-3 text-white hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                  >
                    <span>🏀</span>
                    <span>Basketball</span>
                  </Link>
                  <Link
                    to="/blog/soccer"
                    className="block px-4 py-3 text-white hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                  >
                    <span>⚽</span>
                    <span>Soccer</span>
                  </Link>
                </div>
              </div>

              <Link to="/analytics" className="text-white hover:text-cyan-400 transition-colors">
                Analytics
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
            >
              {/* Animated Dots */}
              <div className="flex flex-col space-y-1">
                <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''
                }`}></div>
                <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></div>
                <div className={`w-1.5 h-1.5 bg-cyan-400 transition-all duration-300 ${
                  isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''
                }`}></div>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-cyan-400/20 rounded-full transition-all duration-300 ${
                isMobileMenuOpen ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
              }`}></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800 mt-4">
              <nav className="py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:text-cyan-400 transition-colors"
                >
                  Home
                </Link>
                
                <div className="px-4 py-3">
                  <div className="text-white mb-2">Blogs</div>
                  <div className="space-y-2 ml-4">
                    <Link
                      to="/blog/football"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    >
                      <span>🏈</span>
                      <span>Football</span>
                    </Link>
                    <Link
                      to="/blog/basketball"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    >
                      <span>🏀</span>
                      <span>Basketball</span>
                    </Link>
                    <Link
                      to="/blog/soccer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors flex items-center space-x-2"
                    >
                      <span>⚽</span>
                      <span>Soccer</span>
                    </Link>
                  </div>
                </div>
                
                <Link
                  to="/analytics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-white hover:text-cyan-400 transition-colors"
                >
                  Analytics
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            {/* Search Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-orbitron font-bold text-white">Search Articles</h2>
              <button 
                onClick={() => setShowSearch(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, tags, author, or category..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                autoFocus
              />
            </div>

            {/* Search Results */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No articles found for "{searchQuery}"</p>
                </div>
              )}

              {searchResults.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                  onClick={() => {
                    setShowSearch(false);
                    navigate(`/blog/${post.category.toLowerCase()}`);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{post.sport}</span>
                        <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs border border-cyan-400/30">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-1 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>{post.author.name}</span>
                        <span>{post.readTime}</span>
                        <span>{post.publishDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-4xl">{posts[0]?.sport}</span>
              <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">
                {sportCategory.charAt(0).toUpperCase() + sportCategory.slice(1)} Blogs
              </h1>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the latest insights, analysis, and stories from the world of {sportCategory}
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm border border-cyan-400/30">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                      <span className="text-black font-semibold text-sm">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-semibold">{post.author.name}</p>
                      <p className="text-gray-400 text-xs">{post.publishDate}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.likes}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 hover:scale-105">
              Load More Articles
            </button>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-cyan-400 text-black rounded-full flex items-center justify-center hover:bg-cyan-300 transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default BlogPost;