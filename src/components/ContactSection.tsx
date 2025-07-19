import React, { useState } from 'react';
import { Send, Mail, MessageCircle, Star } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sport: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const sports = [
    'Football', 'Basketball', 'Soccer', 'Baseball', 'Hockey', 'eSports', 'Tennis', 'Golf', 'Other'
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4">
              JOIN THE <span className="text-cyan-400">PRESSBOX</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get the pulse of every sport. Connect with fellow athletes and fans.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-cyan-400" />
                <span>Get In Touch</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    required
                  />
                </div>

                <div className="relative">
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    required
                  >
                    <option value="">Select Your Sport</option>
                    {sports.map((sport) => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-8">
              {/* Newsletter */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-orbitron font-bold text-white mb-4 flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <span>Newsletter</span>
                </h3>
                <p className="text-gray-400 mb-6">
                  Stay updated with the latest sports news, exclusive interviews, and breaking stories.
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                  Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Twitter', count: '150K', color: 'from-blue-400 to-cyan-500' },
                    { name: 'Instagram', count: '200K', color: 'from-pink-400 to-purple-500' },
                    { name: 'YouTube', count: '85K', color: 'from-red-400 to-orange-500' },
                    { name: 'TikTok', count: '300K', color: 'from-black to-pink-400' }
                  ].map((social) => (
                    <div
                      key={social.name}
                      className={`p-4 bg-gradient-to-r ${social.color} rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="text-white font-bold text-lg">{social.count}</div>
                      <div className="text-white/80 text-sm">{social.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic mb-4">
                  "PressBox gives me the insider perspective I can't get anywhere else. 
                  Real athletes telling real stories."
                </p>
                <div className="text-cyan-400 font-semibold">- Sarah M., College Basketball Player</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;