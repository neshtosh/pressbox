import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Clock, User, Share2, Bookmark, Heart, MessageCircle, Twitter, Facebook, Link2, ChevronUp, Search, X, ChevronDown } from 'lucide-react';

interface IndividualBlogPostProps {
  postId?: string;
}

const IndividualBlogPost: React.FC<IndividualBlogPostProps> = ({ postId }) => {
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
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Smith",
      comment: "This is a fantastic article! The insights about analytics in football are really eye-opening.",
      date: "December 15, 2024",
      replies: [
        {
          id: 11,
          name: "Sarah Chen",
          comment: "I completely agree! The data-driven approach is revolutionizing the game.",
          date: "December 15, 2024"
        }
      ]
    },
    {
      id: 2,
      name: "Mike Johnson",
      comment: "Great analysis of how AI is changing football strategy. Would love to see more articles like this.",
      date: "December 14, 2024",
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState({ name: '', comment: '' });

  // Individual blog post data
  const blogPost = {
    id: actualPostId,
    title: "The Evolution of Modern Football Strategy: How Data Analytics is Revolutionizing the Game",
    subtitle: "From traditional play-calling to AI-driven decisions, explore how technology is reshaping America's favorite sport",
    content: `
      <p class="mb-6 text-lg leading-relaxed">
        Modern NFL teams now employ entire departments dedicated to analytics, with data scientists working alongside coaches to decode the complexities of the game. The traditional approach of relying solely on gut instinct and basic statistics has given way to a sophisticated system that processes thousands of data points in real-time.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Rise of Analytics in Football</h2>
      <p class="mb-6 text-lg leading-relaxed">
        The integration of advanced analytics in football has transformed how teams approach every aspect of the game. From player recruitment to in-game decision making, data-driven insights are now at the forefront of strategic planning. Teams are investing millions in technology that can track player movements, analyze performance patterns, and predict outcomes with remarkable accuracy.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">AI-Powered Decision Making</h2>
      <p class="mb-6 text-lg leading-relaxed">
        Artificial intelligence has become a game-changer in football strategy. Machine learning algorithms can now process vast amounts of historical data to identify patterns that human analysts might miss. These AI systems can predict the success probability of different plays, suggest optimal player combinations, and even recommend when to go for it on fourth down.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Impact on Player Development</h2>
      <p class="mb-6 text-lg leading-relaxed">
        Analytics isn't just changing how games are played—it's revolutionizing how players are developed. Teams now use sophisticated tracking systems to monitor every aspect of a player's performance, from speed and acceleration to decision-making patterns. This data helps coaches create personalized training programs that target specific areas for improvement.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">The Future of Football Strategy</h2>
      <p class="mb-6 text-lg leading-relaxed">
        As technology continues to advance, we can expect even more sophisticated analytics tools to emerge. Virtual reality training, real-time biometric monitoring, and predictive modeling will become standard tools in every team's arsenal. The teams that can best leverage these technologies will have a significant competitive advantage.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Challenges and Controversies</h2>
      <p class="mb-6 text-lg leading-relaxed">
        Despite the benefits, the rise of analytics has also sparked debates about the role of human intuition in sports. Some argue that over-reliance on data can stifle creativity and spontaneity. Others worry about the privacy implications of extensive player monitoring. Finding the right balance between data-driven insights and human judgment remains a key challenge.
      </p>
      
      <h2 class="text-2xl font-bold text-white mb-4 mt-8">Conclusion</h2>
      <p class="mb-6 text-lg leading-relaxed">
        The evolution of football strategy through analytics represents a fundamental shift in how we understand and approach the game. While challenges remain, the potential for improved performance, player development, and strategic innovation is enormous. The future of football lies in the successful integration of human expertise with technological capabilities.
      </p>
    `,
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
  };

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Mock search results
    const mockResults = [
      {
        id: '1',
        title: "Quarterback Revolution: The Rise of Mobile QBs in the NFL",
        excerpt: "How dual-threat quarterbacks are changing the landscape of professional football...",
        author: { name: "Sarah Chen" },
        category: "Football",
        sport: "🏈",
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: '2',
        title: "The Three-Point Revolution: How Analytics Changed Basketball Forever",
        excerpt: "The NBA has undergone a fundamental transformation in how the game is played...",
        author: { name: "LeBron James" },
        category: "Basketball",
        sport: "🏀",
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ];

    const results = mockResults.filter(post => {
      const searchTerm = query.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchTerm);
      const authorMatch = post.author.name.toLowerCase().includes(searchTerm);
      const categoryMatch = post.category.toLowerCase().includes(searchTerm);
      
      return titleMatch || authorMatch || categoryMatch;
    });

    setSearchResults(results);
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
    const title = blogPost.title;
    
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

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.comment.trim()) {
      const comment = {
        id: Date.now(),
        name: newComment.name,
        comment: newComment.comment,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment({ name: '', comment: '' });
    }
  };

  const handleAddReply = (commentId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (replyText.name.trim() && replyText.comment.trim()) {
      const reply = {
        id: Date.now(),
        name: replyText.name,
        comment: replyText.comment,
        date: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setReplyText({ name: '', comment: '' });
      setReplyTo(null);
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
                    <div className="flex-1 min-w-0">
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
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">{blogPost.sport}</span>
              <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm border border-cyan-400/30">
                {blogPost.category}
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold text-white mb-4 leading-tight">
              {blogPost.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-6">
              {blogPost.subtitle}
            </p>

            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-black font-semibold text-lg">A</span>
              </div>
              <div>
                <p className="text-white font-semibold">Admin</p>
                <p className="text-gray-400 text-sm">{blogPost.publishDate} • {blogPost.readTime}</p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative mb-8">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          </div>

          {/* Article Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-300 leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </article>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 flex-wrap">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isLiked 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? likes + 1 : likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors duration-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>{blogPost.comments}</span>
                </button>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    isBookmarked 
                      ? 'bg-cyan-500 text-white' 
                      : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  <span>{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Share:</span>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="p-2 bg-gray-800 text-gray-400 hover:text-cyan-400 rounded-lg transition-colors duration-300"
                >
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8">
            <h3 className="text-white font-semibold mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-cyan-400/20 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <h3 className="text-2xl font-orbitron font-bold text-white mb-6">Comments ({comments.length})</h3>
            
            {/* Add Comment Form */}
            <div className="mb-8 p-4 md:p-6 bg-gray-900/50 border border-gray-800 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Add a Comment</h4>
              <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="comment" className="block text-gray-300 text-sm mb-2">Comment</label>
                  <textarea
                    id="comment"
                    value={newComment.comment}
                    onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Share your thoughts..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors duration-300"
                >
                  Post Comment
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6">
                  {/* Main Comment */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-sm">
                          {comment.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold truncate">{comment.name}</p>
                        <p className="text-gray-400 text-sm">{comment.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed break-words">{comment.comment}</p>
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyTo === comment.id && (
                    <div className="ml-4 md:ml-8 mb-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                      <h5 className="text-white font-semibold mb-3">Reply to {comment.name}</h5>
                      <form onSubmit={(e) => handleAddReply(comment.id, e)} className="space-y-3">
                        <div>
                          <label htmlFor={`reply-name-${comment.id}`} className="block text-gray-300 text-sm mb-1">Name</label>
                          <input
                            type="text"
                            id={`reply-name-${comment.id}`}
                            value={replyText.name}
                            onChange={(e) => setReplyText({ ...replyText, name: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor={`reply-comment-${comment.id}`} className="block text-gray-300 text-sm mb-1">Reply</label>
                          <textarea
                            id={`reply-comment-${comment.id}`}
                            value={replyText.comment}
                            onChange={(e) => setReplyText({ ...replyText, comment: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                            placeholder="Write your reply..."
                            required
                          />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-cyan-400 text-black font-semibold rounded hover:bg-cyan-300 transition-colors duration-300"
                          >
                            Post Reply
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setReplyTo(null);
                              setReplyText({ name: '', comment: '' });
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition-colors duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-4 md:ml-8 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-cyan-400/50 rounded-full flex items-center justify-center">
                              <span className="text-cyan-400 font-semibold text-xs">
                                {reply.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-white font-semibold text-sm truncate">{reply.name}</p>
                              <p className="text-gray-400 text-xs">{reply.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed break-words">{reply.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-cyan-400 text-black rounded-full shadow-lg hover:bg-cyan-300 transition-colors duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default IndividualBlogPost; 