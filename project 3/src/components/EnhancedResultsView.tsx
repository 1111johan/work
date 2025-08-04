import React, { useState, useEffect } from 'react';
import { Download, Share2, Heart, Eye, Star, Crown, Coins, ArrowLeft, Play, Sparkles, Trophy, Zap, Camera, Video, Wand2 } from 'lucide-react';
import { EnhancedStyle } from './EnhancedStyleSelector';

interface EnhancedResultsViewProps {
  originalImage: string;
  processedImage: string;
  style: EnhancedStyle;
  onShowSocial: () => void;
  onShowNFT: () => void;
  onBackToUpload: () => void;
  onGenerateVideo: () => void;
}

export const EnhancedResultsView: React.FC<EnhancedResultsViewProps> = ({
  originalImage,
  processedImage,
  style,
  onShowSocial,
  onShowNFT,
  onBackToUpload,
  onGenerateVideo
}) => {
  const [viewMode, setViewMode] = useState<'comparison' | 'result' | 'video'>('comparison');
  const [likes, setLikes] = useState(Math.floor(Math.random() * 5000) + 500);
  const [isLiked, setIsLiked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(true);
  const [qualityScore, setQualityScore] = useState(0);
  const [userRanking, setUserRanking] = useState(0);

  useEffect(() => {
    // Celebration animation
    setTimeout(() => setShowCelebration(false), 3000);
    
    // Simulate quality scoring
    const scoreInterval = setInterval(() => {
      setQualityScore(prev => {
        if (prev >= style.popularity) {
          clearInterval(scoreInterval);
          return style.popularity;
        }
        return prev + 1;
      });
    }, 30);

    // Generate user ranking
    setUserRanking(Math.floor(Math.random() * 20) + 75);

    return () => clearInterval(scoreInterval);
  }, [style.popularity]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `airtify-${style.name.toLowerCase().replace(' ', '-')}-8k-${Date.now()}.jpg`;
    link.click();
  };

  const generateVideoPreview = () => {
    return 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden">
      {/* Celebration Particles */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Achievement Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-400/30 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-bold">Your artwork defeated {userRanking}% of users!</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Masterpiece Complete! ✨
          </h1>
          <p className="text-white/70 text-xl">
            {style.name} • 8K Ultra HD • Generated in {style.processingTime}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
            {[
              { key: 'comparison', label: 'Before/After', icon: <Eye className="w-5 h-5" /> },
              { key: 'result', label: 'Final Result', icon: <Camera className="w-5 h-5" /> },
              { key: 'video', label: '3D Preview', icon: <Video className="w-5 h-5" /> }
            ].map((mode) => (
              <button
                key={mode.key}
                onClick={() => setViewMode(mode.key as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all font-medium ${
                  viewMode === mode.key 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Image Display */}
        <div className="mb-8">
          {viewMode === 'comparison' && (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
                  <span>Original</span>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm">720p</div>
                </h3>
                <div className="relative group">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full rounded-3xl shadow-2xl border-2 border-white/20"
                  />
                  <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium">
                        Before
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center space-x-2">
                  <span>AI Enhanced</span>
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 px-3 py-1 rounded-full text-sm font-bold">8K HD</div>
                </h3>
                <div className="relative group">
                  <img 
                    src={processedImage} 
                    alt="AI Enhanced" 
                    className="w-full rounded-3xl shadow-2xl border-2 border-cyan-400/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute top-6 left-6">
                      <span className={`bg-gradient-to-r ${style.gradient} px-4 py-2 rounded-full text-white font-bold shadow-lg`}>
                        {style.name}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-white font-medium mb-2">{style.description}</p>
                        <div className="flex items-center justify-between text-sm text-white/80">
                          <span>Quality Score: {qualityScore}%</span>
                          <span>Processing: {style.processingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'result' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <img 
                  src={processedImage} 
                  alt="Final Result" 
                  className="w-full rounded-3xl shadow-2xl border-2 border-cyan-400/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-3">
                      <span className={`bg-gradient-to-r ${style.gradient} px-4 py-2 rounded-full text-white font-bold`}>
                        {style.name}
                      </span>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-400/30">
                        8K Ultra HD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'video' && (
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-black rounded-3xl overflow-hidden border-2 border-purple-400/50">
                <img 
                  src={generateVideoPreview()} 
                  alt="3D Video Preview" 
                  className="w-full opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button
                    onClick={onGenerateVideo}
                    className="group flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-full text-white font-bold text-xl hover:scale-110 transition-all duration-300 shadow-2xl"
                  >
                    <Play className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span>Generate 3D Video</span>
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </button>
                </div>
                <div className="absolute top-6 left-6">
                  <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full font-medium border border-purple-400/30">
                    🎬 Coming Soon: 3D Photo Revival
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats & Engagement */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center hover:scale-105 transition-all duration-300">
            <button onClick={handleLike} className="w-full">
              <Heart className={`w-8 h-8 mx-auto mb-2 transition-all ${isLiked ? 'text-red-400 fill-current scale-110' : 'text-white/60 hover:text-red-400'}`} />
              <div className="text-2xl font-bold text-white">{likes.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Likes</div>
            </button>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <Eye className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
            <div className="text-2xl font-bold text-white">{(Math.floor(Math.random() * 50000) + 10000).toLocaleString()}</div>
            <div className="text-white/60 text-sm">Views</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400 fill-current" />
            <div className="text-2xl font-bold text-white">{(4.8 + Math.random() * 0.2).toFixed(1)}</div>
            <div className="text-white/60 text-sm">Rating</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-orange-400" />
            <div className="text-2xl font-bold text-white">#{Math.floor(Math.random() * 100) + 1}</div>
            <div className="text-white/60 text-sm">Ranking</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 rounded-2xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            <Download className="w-5 h-5" />
            <span>Download 8K</span>
          </button>
          
          <button
            onClick={onShowSocial}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-2xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            <Share2 className="w-5 h-5" />
            <span>Share & Earn</span>
          </button>
          
          <button
            onClick={onShowNFT}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 rounded-2xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <Coins className="w-5 h-5" />
            <span>Mint NFT</span>
          </button>
          
          <button
            onClick={onGenerateVideo}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 rounded-2xl text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
          >
            <Video className="w-5 h-5" />
            <span>3D Video</span>
          </button>
          
          <button
            onClick={onBackToUpload}
            className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-2xl text-white font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>New Photo</span>
          </button>
        </div>

        {/* Achievement & Challenge */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="w-8 h-8 text-yellow-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">Legendary Achievement!</h3>
                <p className="text-yellow-400">Your art quality: {qualityScore}%</p>
              </div>
            </div>
            <p className="text-white/80 mb-4">
              🏆 You've defeated {userRanking}% of users in the {style.name} category! 
              Your masterpiece shows exceptional artistic understanding.
            </p>
            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-xl text-white font-bold hover:scale-105 transition-all duration-300">
              Claim Rewards 🎁
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-cyan-400" />
              <div>
                <h3 className="text-2xl font-bold text-white">Weekly Challenge</h3>
                <p className="text-cyan-400">Cyberpunk Contest</p>
              </div>
            </div>
            <p className="text-white/80 mb-4">
              💎 Join 12.5K artists competing for 5 ETH prize! 
              Your current ranking: Top 15%
            </p>
            <button className="bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl text-white font-bold hover:scale-105 transition-all duration-300">
              Join Challenge 🚀
            </button>
          </div>
        </div>

        {/* Technical Excellence */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h4 className="text-xl font-bold text-white mb-4 text-center">🔬 Technical Excellence Report</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Wand2 className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{style.processingTime}</div>
              <div className="text-white/60 text-sm">Generation Time</div>
            </div>
            
            <div>
              <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">Stable Diffusion 3</div>
              <div className="text-white/60 text-sm">AI Model</div>
            </div>
            
            <div>
              <Sparkles className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">8K Ultra HD</div>
              <div className="text-white/60 text-sm">Resolution</div>
            </div>
            
            <div>
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{style.popularity}%</div>
              <div className="text-white/60 text-sm">Style Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};