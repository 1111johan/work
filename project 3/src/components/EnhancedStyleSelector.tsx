import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mic, Sparkles, Palette, Globe, Cpu, Camera, Brush, Zap, Crown, Star } from 'lucide-react';

export interface EnhancedStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  preview: string;
  category: 'classic' | 'modern' | 'fantasy' | 'premium';
  popularity: number;
  processingTime: string;
  featured?: boolean;
}

const enhancedStyles: EnhancedStyle[] = [
  {
    id: 'monet-impressionist',
    name: 'Monet Dreams',
    description: 'Impressionist brushstrokes with ethereal lighting',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-blue-400 via-purple-500 to-pink-400',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 98,
    processingTime: '1.8s',
    featured: true
  },
  {
    id: 'cyberpunk-neon',
    name: 'Neon Genesis',
    description: 'Cyberpunk aesthetics with electric neon vibes',
    icon: <Cpu className="w-6 h-6" />,
    gradient: 'from-cyan-400 via-purple-600 to-pink-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 95,
    processingTime: '2.1s',
    featured: true
  },
  {
    id: 'ukiyo-e',
    name: 'Ukiyo-e Master',
    description: 'Traditional Japanese woodblock art style',
    icon: <Globe className="w-6 h-6" />,
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 89,
    processingTime: '2.3s'
  },
  {
    id: 'ink-wash',
    name: 'Zen Ink Wash',
    description: 'Chinese shuǐmòhuà with fluid brushwork',
    icon: <Brush className="w-6 h-6" />,
    gradient: 'from-gray-600 via-gray-800 to-black',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 76,
    processingTime: '1.9s'
  },
  {
    id: 'anime-studio',
    name: 'Studio Ghibli',
    description: 'Magical anime aesthetic with soft colors',
    icon: <Sparkles className="w-6 h-6" />,
    gradient: 'from-green-400 via-blue-500 to-purple-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'fantasy',
    popularity: 94,
    processingTime: '2.0s'
  },
  {
    id: 'van-gogh',
    name: 'Starry Nights',
    description: 'Van Gogh\'s swirling brushstroke technique',
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-yellow-400 via-blue-600 to-purple-700',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 92,
    processingTime: '2.2s',
    featured: true
  },
  {
    id: 'digital-glitch',
    name: 'Glitch Art',
    description: 'Digital corruption with RGB split effects',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-red-500 via-green-500 to-blue-500',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 87,
    processingTime: '1.7s'
  },
  {
    id: 'renaissance',
    name: 'Renaissance',
    description: 'Classical Renaissance painting technique',
    icon: <Crown className="w-6 h-6" />,
    gradient: 'from-amber-600 via-red-700 to-purple-800',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'premium',
    popularity: 83,
    processingTime: '2.5s'
  },
  {
    id: 'watercolor-dream',
    name: 'Watercolor Dreams',
    description: 'Flowing watercolor with soft gradients',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-teal-300 via-blue-400 to-purple-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'classic',
    popularity: 88,
    processingTime: '1.9s'
  },
  {
    id: 'pop-art-warhol',
    name: 'Pop Art Vibes',
    description: 'Andy Warhol inspired bold colors',
    icon: <Camera className="w-6 h-6" />,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'modern',
    popularity: 90,
    processingTime: '1.6s'
  }
];

interface EnhancedStyleSelectorProps {
  selectedStyle: EnhancedStyle | null;
  onStyleSelect: (style: EnhancedStyle) => void;
  originalImage?: string;
}

export const EnhancedStyleSelector: React.FC<EnhancedStyleSelectorProps> = ({ 
  selectedStyle, 
  onStyleSelect,
  originalImage 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'classic' | 'modern' | 'fantasy' | 'premium'>('all');
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wheelRef = useRef<HTMLDivElement>(null);

  const filteredStyles = enhancedStyles.filter(style => {
    const matchesFilter = filter === 'all' || style.category === filter;
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         style.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const nextStyle = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredStyles.length);
  };

  const prevStyle = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredStyles.length) % filteredStyles.length);
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      
      // Voice command logic
      if (command.includes('monet') || command.includes('impressionist')) {
        const style = enhancedStyles.find(s => s.id === 'monet-impressionist');
        if (style) onStyleSelect(style);
      } else if (command.includes('cyberpunk') || command.includes('neon')) {
        const style = enhancedStyles.find(s => s.id === 'cyberpunk-neon');
        if (style) onStyleSelect(style);
      } else if (command.includes('next')) {
        nextStyle();
      } else if (command.includes('previous') || command.includes('back')) {
        prevStyle();
      }
      
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const getVisibleStyles = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + filteredStyles.length) % filteredStyles.length;
      const style = filteredStyles[index];
      if (style) {
        visible.push({ ...style, offset: i });
      }
    }
    return visible;
  };

  const categoryColors = {
    all: 'from-gray-500 to-gray-700',
    classic: 'from-amber-500 to-orange-600',
    modern: 'from-cyan-500 to-purple-600',
    fantasy: 'from-pink-500 to-purple-600',
    premium: 'from-yellow-400 to-red-500'
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevStyle();
      if (e.key === 'ArrowRight') nextStyle();
      if (e.key === ' ') {
        e.preventDefault();
        if (filteredStyles[currentIndex]) {
          onStyleSelect(filteredStyles[currentIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex, filteredStyles]);

  return (
    <div className="relative py-8">
      {/* Header with Voice Control */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Artistic Style
          </h3>
          <button
            onClick={handleVoiceCommand}
            className={`p-3 rounded-full transition-all ${
              isListening 
                ? 'bg-red-500/20 border-2 border-red-400 animate-pulse' 
                : 'bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
            title="Voice commands: 'monet', 'cyberpunk', 'next', 'previous'"
          >
            <Mic className={`w-5 h-5 ${isListening ? 'text-red-400' : 'text-white'}`} />
          </button>
        </div>
        
        <p className="text-white/70 mb-6">
          {isListening ? '🎤 Listening... Say "cyberpunk", "monet", "next", or "previous"' : 'Use keyboard arrows, voice commands, or gestures to navigate'}
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search styles... (e.g., 'monet', 'cyberpunk')"
            className="w-full bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {(['all', 'classic', 'modern', 'fantasy', 'premium'] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setFilter(category);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                filter === category
                  ? `bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg`
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {category === 'all' ? 'All Styles' : category.charAt(0).toUpperCase() + category.slice(1)}
              {category === 'premium' && <Crown className="w-4 h-4 inline ml-1" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Style Wheel */}
      <div className="relative h-40 overflow-hidden mb-8" ref={wheelRef}>
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={prevStyle}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative flex items-center justify-center space-x-6">
            {getVisibleStyles().map((style, index) => {
              const isCenter = style.offset === 0;
              const isAdjacent = Math.abs(style.offset) === 1;
              const scale = isCenter ? 'scale-125' : isAdjacent ? 'scale-100' : 'scale-75';
              const opacity = Math.abs(style.offset) > 1 ? 'opacity-40' : 'opacity-100';
              const zIndex = isCenter ? 'z-30' : isAdjacent ? 'z-20' : 'z-10';
              
              return (
                <div
                  key={`${style.id}-${index}`}
                  className={`relative transition-all duration-500 cursor-pointer ${scale} ${opacity} ${zIndex}`}
                  onClick={() => onStyleSelect(style)}
                  style={{
                    transform: `translateY(${style.offset * 5}px) rotateY(${style.offset * 15}deg)`
                  }}
                >
                  <div className={`relative w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br ${style.gradient} p-1 shadow-2xl`}>
                    {/* Popularity Badge */}
                    {isCenter && style.popularity >= 90 && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                        🔥 {style.popularity}%
                      </div>
                    )}
                    
                    {/* Premium Badge */}
                    {style.category === 'premium' && (
                      <div className="absolute -top-1 -left-1">
                        <Crown className="w-5 h-5 text-yellow-400" />
                      </div>
                    )}

                    <div className="w-full h-full bg-black/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                      <div className="text-white">
                        {style.icon}
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {isCenter && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-sm font-bold text-white mb-1">{style.name}</p>
                      <p className="text-xs text-white/60">{style.processingTime}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <button
            onClick={nextStyle}
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Current Style Details */}
      {filteredStyles[currentIndex] && (
        <div className="max-w-2xl mx-auto text-center mb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h4 className="text-xl font-bold text-white mb-2">
              {filteredStyles[currentIndex].name}
            </h4>
            <p className="text-white/70 mb-4">
              {filteredStyles[currentIndex].description}
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>{filteredStyles[currentIndex].processingTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{filteredStyles[currentIndex].popularity}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span className="capitalize">{filteredStyles[currentIndex].category}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Styles Grid */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-lg font-semibold text-white mb-4 text-center">✨ Featured Selections</h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {enhancedStyles.filter(s => s.featured).map((style) => (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style)}
              className={`relative aspect-square rounded-xl overflow-hidden group transition-all hover:scale-105 ${
                selectedStyle?.id === style.id ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${style.gradient} p-2`}>
                <div className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <div className="text-white text-sm">
                    {style.icon}
                  </div>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-white text-xs font-medium truncate">{style.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="text-center mt-8">
        <p className="text-white/40 text-sm">
          💡 Use ← → arrow keys to navigate • Space to select • Voice commands supported
        </p>
      </div>
    </div>
  );
};