import React, { useState } from 'react';
import { Download, Share2, Heart, Eye, Star, Crown, Coins, ArrowLeft } from 'lucide-react';
import { Style } from './StyleSelector';

interface ResultsViewProps {
  originalImage: string;
  processedImage: string;
  style: Style;
  onShowSocial: () => void;
  onShowNFT: () => void;
  onBackToUpload: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  originalImage,
  processedImage,
  style,
  onShowSocial,
  onShowNFT,
  onBackToUpload
}) => {
  const [showComparison, setShowComparison] = useState(true);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 500) + 50);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `airtify-${style.name.toLowerCase()}-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Your Masterpiece is Ready! ✨
          </h1>
          <p className="text-white/70 text-lg">
            Transformed with {style.name} • Generated in 2.3 seconds
          </p>
        </div>

        {/* Image Comparison */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-1">
              <button
                onClick={() => setShowComparison(true)}
                className={`px-4 py-2 rounded-full transition-all ${
                  showComparison 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Compare
              </button>
              <button
                onClick={() => setShowComparison(false)}
                className={`px-4 py-2 rounded-full transition-all ${
                  !showComparison 
                    ? 'bg-white text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Result Only
              </button>
            </div>
          </div>

          {showComparison ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white text-center">Original</h3>
                <div className="relative group">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                        Before
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white text-center">AI Enhanced</h3>
                <div className="relative group">
                  <img 
                    src={processedImage} 
                    alt="Processed" 
                    className="w-full rounded-2xl shadow-2xl border-2 border-cyan-400/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-4 left-4">
                      <span className={`bg-gradient-to-r ${style.gradient} px-3 py-1 rounded-full text-white text-sm font-medium`}>
                        {style.name}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <p className="text-white text-sm">{style.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <img 
                  src={processedImage} 
                  alt="Final Result" 
                  className="w-full rounded-2xl shadow-2xl border-2 border-cyan-400/30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-4 left-4">
                    <span className={`bg-gradient-to-r ${style.gradient} px-3 py-1 rounded-full text-white text-sm font-medium`}>
                      8K Quality • {style.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats & Interaction */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-8">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all ${
                  isLiked ? 'text-red-400 scale-110' : 'text-white/60 hover:text-red-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{likes}</span>
              </button>
              
              <div className="flex items-center space-x-2 text-white/60">
                <Eye className="w-6 h-6" />
                <span className="font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-white/60">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="font-medium">4.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            <Download className="w-5 h-5" />
            <span>Download 8K</span>
          </button>
          
          <button
            onClick={onShowSocial}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
            <span>Share & Earn</span>
          </button>
          
          <button
            onClick={onShowNFT}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-all duration-300"
          >
            <Coins className="w-5 h-5" />
            <span>Mint NFT</span>
          </button>
          
          <button
            onClick={onBackToUpload}
            className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>New Photo</span>
          </button>
        </div>

        {/* Challenge Invitation */}
        <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-400" />
            <h3 className="text-xl font-bold text-white">Your artwork defeated 73% of users!</h3>
          </div>
          <p className="text-white/70 mb-4">
            Join the weekly AI Art Challenge and compete for exclusive NFT rewards
          </p>
          <button className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300">
            Join Challenge 🏆
          </button>
        </div>

        {/* Technical Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white/60 mb-1">Generation Time</h4>
            <p className="text-lg font-bold text-cyan-400">2.31s</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white/60 mb-1">AI Model</h4>
            <p className="text-lg font-bold text-purple-400">Stable Diffusion 3</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white/60 mb-1">Resolution</h4>
            <p className="text-lg font-bold text-green-400">8K Ultra HD</p>
          </div>
        </div>
      </div>
    </div>
  );
};