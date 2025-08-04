import React, { useState, useEffect } from 'react';
import { Trophy, Crown, Star, Users, Clock, Zap, Gift, Target, ArrowLeft, Siren as Fire, Medal, Coins, Camera, Share2 } from 'lucide-react';
import { EnhancedStyle } from './EnhancedStyleSelector';

interface ChallengeArenaProps {
  onBack: () => void;
  userArtwork?: string;
  userStyle?: EnhancedStyle;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  prize: string;
  participants: number;
  timeLeft: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  category: 'Style' | 'Theme' | 'Technical' | 'Community';
  gradient: string;
  icon: React.ReactNode;
  featured: boolean;
  requirements: string[];
  winnerExample?: string;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  artwork: string;
  style: string;
  votes: number;
  score: number;
  trend: 'up' | 'down' | 'stable';
}

export const ChallengeArena: React.FC<ChallengeArenaProps> = ({
  onBack,
  userArtwork,
  userStyle
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'leaderboard' | 'rewards'>('active');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [userRank, setUserRank] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);

  const challenges: Challenge[] = [
    {
      id: 'cyberpunk-fever',
      title: 'Cyberpunk Fever 2025 🔥',
      description: 'Create the most stunning cyberpunk transformation. Neon lights, digital aesthetics, and futuristic vibes required!',
      prize: '5 ETH + Exclusive NFT Collection',
      participants: 12547,
      timeLeft: '2 days 14 hours',
      difficulty: 'Legendary',
      category: 'Style',
      gradient: 'from-cyan-500 via-purple-600 to-pink-500',
      icon: <Zap className="w-6 h-6" />,
      featured: true,
      requirements: ['Use Cyberpunk style', 'Include neon elements', 'Futuristic theme'],
      winnerExample: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'monet-masters',
      title: 'Monet Masters Challenge',
      description: 'Channel your inner impressionist! Create breathtaking art in the style of Claude Monet.',
      prize: '2 ETH + Gallery Feature',
      participants: 8932,
      timeLeft: '5 days 8 hours',
      difficulty: 'Hard',
      category: 'Style',
      gradient: 'from-blue-400 via-purple-500 to-pink-400',
      icon: <Star className="w-6 h-6" />,
      featured: true,
      requirements: ['Monet impressionist style', 'Natural lighting', 'Artistic composition'],
      winnerExample: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'anime-revolution',
      title: 'Anime Revolution 2025',
      description: 'Transform reality into stunning anime art! Studio Ghibli vibes welcome.',
      prize: '3 ETH + Anime NFT Series',
      participants: 15420,
      timeLeft: '1 day 22 hours',
      difficulty: 'Medium',
      category: 'Style',
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      icon: <Fire className="w-6 h-6" />,
      featured: false,
      requirements: ['Anime/manga style', 'Vibrant colors', 'Character focus'],
      winnerExample: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'renaissance-revival',
      title: 'Renaissance Revival',
      description: 'Bring classical art into the modern age with AI-powered Renaissance transformations.',
      prize: '1.5 ETH + Museum Partnership',
      participants: 6789,
      timeLeft: '6 days 12 hours',
      difficulty: 'Hard',
      category: 'Technical',
      gradient: 'from-amber-600 via-red-700 to-purple-800',
      icon: <Crown className="w-6 h-6" />,
      featured: false,
      requirements: ['Renaissance style', 'Classical composition', 'Rich details'],
      winnerExample: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'future-fashion',
      title: 'Future Fashion Week',
      description: 'Design the fashion of tomorrow! AI outfit changes and futuristic clothing styles.',
      prize: '4 ETH + Fashion Brand Collab',
      participants: 9876,
      timeLeft: '3 days 5 hours',
      difficulty: 'Medium',
      category: 'Theme',
      gradient: 'from-green-400 via-blue-500 to-purple-600',
      icon: <Target className="w-6 h-6" />,
      featured: true,
      requirements: ['Futuristic clothing', 'AI outfit change', 'Fashion-forward'],
      winnerExample: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'CyberArtist_2025',
      artwork: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=200',
      style: 'Cyberpunk',
      votes: 15420,
      score: 98.7,
      trend: 'up'
    },
    {
      rank: 2,
      username: 'MonetMaster',
      artwork: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=200',
      style: 'Impressionist',
      votes: 14890,
      score: 97.2,
      trend: 'stable'
    },
    {
      rank: 3,
      username: 'AnimeQueen',
      artwork: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=200',
      style: 'Anime',
      votes: 13567,
      score: 95.8,
      trend: 'up'
    },
    {
      rank: 4,
      username: 'DigitalDreamer',
      artwork: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=200',
      style: 'Watercolor',
      votes: 12234,
      score: 94.1,
      trend: 'down'
    },
    {
      rank: 5,
      username: 'ArtRevolution',
      artwork: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=200',
      style: 'Pop Art',
      votes: 11789,
      score: 92.6,
      trend: 'up'
    }
  ];

  useEffect(() => {
    // Simulate user ranking
    setUserRank(Math.floor(Math.random() * 100) + 15);
    setUserScore(85.5 + Math.random() * 10);
  }, []);

  const joinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    // Simulate joining logic
    console.log('Joining challenge:', challenge.title);
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-orange-400 bg-orange-500/20';
      case 'Legendary': return 'text-red-400 bg-red-500/20';
    }
  };

  const getTrendIcon = (trend: LeaderboardEntry['trend']) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
    }
  };

  const renderActiveChallenges = () => (
    <div className="space-y-6">
      {/* Featured Challenges */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
          <Fire className="w-7 h-7 text-orange-400" />
          <span>Featured Challenges</span>
        </h3>
        
        <div className="grid gap-6">
          {challenges.filter(c => c.featured).map((challenge) => (
            <div
              key={challenge.id}
              className={`relative bg-gradient-to-r ${challenge.gradient} p-[2px] rounded-3xl hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="bg-black/80 backdrop-blur-sm rounded-3xl p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${challenge.gradient}`}>
                      {challenge.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{challenge.title}</h4>
                      <p className="text-white/70 text-lg">{challenge.description}</p>
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{challenge.prize}</div>
                    <div className="text-white/60 text-sm">Prize Pool</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <Users className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{challenge.participants.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">Participants</div>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <Clock className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{challenge.timeLeft}</div>
                    <div className="text-white/60 text-sm">Time Left</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {challenge.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => joinChallenge(challenge)}
                    className={`bg-gradient-to-r ${challenge.gradient} px-8 py-3 rounded-2xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg`}
                  >
                    Join Challenge 🚀
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Challenges */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">All Active Challenges</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.filter(c => !c.featured).map((challenge) => (
            <div
              key={challenge.id}
              className={`bg-gradient-to-r ${challenge.gradient} p-[1px] rounded-2xl hover:scale-105 transition-all duration-300`}
            >
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${challenge.gradient}`}>
                    {challenge.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2">{challenge.title}</h4>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{challenge.description}</p>
                
                <div className="space-y-3 mb-4 text-sm">
                  <div className="flex items-center justify-between text-white/60">
                    <span>Prize:</span>
                    <span className="text-yellow-400 font-medium">{challenge.prize}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/60">
                    <span>Participants:</span>
                    <span className="text-cyan-400">{challenge.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-white/60">
                    <span>Time Left:</span>
                    <span className="text-red-400">{challenge.timeLeft}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => joinChallenge(challenge)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-xl transition-colors"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">🏆 Global Leaderboard</h3>
        <p className="text-white/70 text-lg">Top artists competing for NFT rewards and eternal glory</p>
      </div>

      {/* User's Rank */}
      {userArtwork && (
        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-purple-400">#{userRank}</div>
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-purple-400/50">
              <img src={userArtwork} alt="Your artwork" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">Your Current Rank</h4>
              <p className="text-purple-400">Score: {userScore.toFixed(1)}% • Style: {userStyle?.name}</p>
              <p className="text-white/60 text-sm">Keep creating to climb higher! 🚀</p>
            </div>
            <div className="text-right">
              <div className="text-2xl">🔥</div>
              <div className="text-cyan-400 text-sm">Hot Streak!</div>
            </div>
          </div>
        </div>
      )}

      {/* Top Rankings */}
      <div className="space-y-4">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={`relative flex items-center space-x-6 p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
              entry.rank <= 3
                ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            {/* Rank */}
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                entry.rank === 1 ? 'text-yellow-400' :
                entry.rank === 2 ? 'text-gray-300' :
                entry.rank === 3 ? 'text-amber-600' :
                'text-white'
              }`}>
                #{entry.rank}
              </div>
              {entry.rank <= 3 && (
                <div className="text-2xl">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                </div>
              )}
            </div>

            {/* Artwork */}
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/20">
              <img src={entry.artwork} alt={`${entry.username}'s artwork`} className="w-full h-full object-cover" />
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-lg font-bold text-white">{entry.username}</h4>
                <span className="text-2xl">{getTrendIcon(entry.trend)}</span>
              </div>
              <p className="text-cyan-400 font-medium">{entry.style} Style</p>
              <div className="flex items-center space-x-4 text-sm text-white/60">
                <span>🗳️ {entry.votes.toLocaleString()} votes</span>
                <span>⭐ {entry.score}% score</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Star className="w-5 h-5 text-white" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Competition Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">47,523</div>
          <div className="text-white/60">Total Submissions</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <Coins className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">152 ETH</div>
          <div className="text-white/60">Total Prizes</div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">28.5K</div>
          <div className="text-white/60">Active Artists</div>
        </div>
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">🎁 Rewards & Achievements</h3>
        <p className="text-white/70 text-lg">Earn exclusive NFTs, ETH rewards, and unlock premium features</p>
      </div>

      {/* Achievement Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-gold-500/20 to-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Hall of Fame</h4>
          </div>
          <p className="text-white/70 mb-4">Win featured challenges to join the legendary artists hall of fame.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Current Members:</span>
              <span className="text-yellow-400">127 Artists</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Exclusive NFT:</span>
              <span className="text-yellow-400">Golden Crown</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
          <div className="flex items-center space-x-3 mb-4">
            <Medal className="w-8 h-8 text-purple-400" />
            <h4 className="text-xl font-bold text-white">Style Master</h4>
          </div>
          <p className="text-white/70 mb-4">Master different art styles to unlock exclusive filters and features.</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Styles Mastered:</span>
              <span className="text-purple-400">8/20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Next Reward:</span>
              <span className="text-purple-400">Premium Styles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Rewards */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <h4 className="text-xl font-bold text-white mb-4">🔥 Weekly Rewards</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { day: 'Mon', reward: '10 Coins', claimed: true },
            { day: 'Tue', reward: '15 Coins', claimed: true },
            { day: 'Wed', reward: 'Premium Style', claimed: false },
            { day: 'Thu', reward: '25 Coins', claimed: false },
          ].map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center border ${
                item.claimed 
                  ? 'bg-green-500/20 border-green-400/30' 
                  : 'bg-white/5 border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-lg font-bold text-white">{item.day}</div>
              <div className="text-sm text-white/70">{item.reward}</div>
              {item.claimed && <div className="text-green-400 text-xs mt-1">✓ Claimed</div>}
            </div>
          ))}
        </div>
      </div>

      {/* NFT Collection */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/30">
        <h4 className="text-xl font-bold text-white mb-4">🎨 Your NFT Collection</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: 'Cyber Crown', rarity: 'Legendary', image: '👑' },
            { name: 'Art Master', rarity: 'Epic', image: '🎨' },
            { name: 'Style Pioneer', rarity: 'Rare', image: '✨' },
            { name: 'Challenge Winner', rarity: 'Common', image: '🏆' },
            { name: 'Community Hero', rarity: 'Rare', image: '❤️' },
            { name: 'Coming Soon', rarity: 'Mystery', image: '❓' },
          ].map((nft, index) => (
            <div
              key={index}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center text-center p-3 ${
                nft.name === 'Coming Soon' 
                  ? 'bg-white/5 border border-dashed border-white/30' 
                  : 'bg-white/10 border border-white/20'
              }`}
            >
              <div className="text-3xl mb-2">{nft.image}</div>
              <div className="text-xs font-medium text-white">{nft.name}</div>
              <div className={`text-xs ${
                nft.rarity === 'Legendary' ? 'text-yellow-400' :
                nft.rarity === 'Epic' ? 'text-purple-400' :
                nft.rarity === 'Rare' ? 'text-blue-400' :
                'text-gray-400'
              }`}>
                {nft.rarity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Results</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Challenge Arena
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {[
              { key: 'active', label: 'Active Challenges', icon: <Fire className="w-5 h-5" /> },
              { key: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-5 h-5" /> },
              { key: 'rewards', label: 'Rewards', icon: <Gift className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all font-medium ${
                  activeTab === tab.key 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {activeTab === 'active' && renderActiveChallenges()}
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'rewards' && renderRewards()}
      </div>
    </div>
  );
};