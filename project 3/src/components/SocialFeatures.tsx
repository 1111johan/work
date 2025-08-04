import React, { useState } from 'react';
import { Share2, Twitter, Instagram, Video, Copy, Check, Trophy, Users, ArrowLeft } from 'lucide-react';
import { Style } from './StyleSelector';

interface SocialFeaturesProps {
  processedImage: string;
  style: Style;
  onBack: () => void;
}

export const SocialFeatures: React.FC<SocialFeaturesProps> = ({
  processedImage,
  style,
  onBack
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const shareUrl = "https://airtify.app/shared/masterpiece-123";
  const shareText = `🎨 Just created this incredible ${style.name} masterpiece with AIrtify! Transform your photos into stunning AI art in seconds. #AIArt #DigitalArt #AIrtify`;

  const socialPlatforms = [
    {
      name: 'TikTok',
      icon: <Video className="w-6 h-6" />,
      color: 'from-pink-500 to-red-500',
      action: () => setSelectedPlatform('tiktok'),
      engagement: '2.3M views avg'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      action: () => setSelectedPlatform('instagram'),
      engagement: '850K likes avg'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-6 h-6" />,
      color: 'from-blue-400 to-blue-600',
      action: () => setSelectedPlatform('twitter'),
      engagement: '420K retweets avg'
    }
  ];

  const challenges = [
    {
      title: "Cyberpunk Challenge",
      prize: "5 ETH + Exclusive NFT",
      participants: "12.5K",
      endsIn: "3 days",
      gradient: "from-cyan-500 to-purple-600"
    },
    {
      title: "Anime Art Contest",
      prize: "Premium Subscription",
      participants: "8.2K",
      endsIn: "1 week",
      gradient: "from-pink-500 to-blue-500"
    },
    {
      title: "Renaissance Revival",
      prize: "Art Gallery Feature",
      participants: "5.7K",
      endsIn: "5 days",
      gradient: "from-amber-500 to-red-600"
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePlatformShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing URLs
      tiktok: `https://www.tiktok.com/` // TikTok doesn't support direct sharing URLs
    };
    
    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Results</span>
          </button>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Share Your Masterpiece 🚀
          </h1>
          <p className="text-white/70 text-lg">
            Join millions creating viral AI art content
          </p>
        </div>

        {/* Preview Card */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-48 h-48 rounded-xl overflow-hidden border-2 border-cyan-400/30">
              <img 
                src={processedImage} 
                alt="Shared artwork" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                {style.name} Masterpiece
              </h3>
              <p className="text-white/60 mb-4">
                {shareText}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                  #AIArt
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                  #{style.name}
                </span>
                <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm">
                  #DigitalArt
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Choose Your Platform</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handlePlatformShare(platform.name.toLowerCase())}
                className={`group relative bg-gradient-to-r ${platform.color} p-[2px] rounded-2xl hover:scale-105 transition-all duration-300`}
              >
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <div className="flex items-center space-x-3 mb-3">
                    {platform.icon}
                    <h4 className="text-lg font-bold text-white">{platform.name}</h4>
                  </div>
                  <p className="text-white/60 text-sm mb-4">{platform.engagement}</p>
                  <div className="flex items-center justify-between">
                    <Share2 className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    <span className="text-xs text-white/40 group-hover:text-white transition-colors">
                      Share Now
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Copy Link */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
          <h4 className="text-lg font-semibold text-white mb-4">Share Link</h4>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white text-sm"
            />
            <button
              onClick={handleCopyLink}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 inline mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 inline mr-2" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Active Challenges */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">Active Challenges</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${challenge.gradient} p-[2px] rounded-2xl`}
              >
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <h4 className="text-lg font-bold text-white mb-2">{challenge.title}</h4>
                  <p className="text-yellow-400 font-semibold mb-3">🏆 {challenge.prize}</p>
                  
                  <div className="space-y-2 mb-4 text-sm text-white/60">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div>Ends in {challenge.endsIn}</div>
                  </div>
                  
                  <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg transition-colors">
                    Join Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Viral Stats */}
        <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-2">🔥 Viral Impact</h4>
            <p className="text-white/60 mb-4">
              AIrtify users generated <span className="text-green-400 font-bold">2.3B views</span> this month
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-cyan-400">847K</p>
                <p className="text-white/60 text-sm">Shares Today</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">1.2M</p>
                <p className="text-white/60 text-sm">Active Creators</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-400">95%</p>
                <p className="text-white/60 text-sm">Go Viral</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};