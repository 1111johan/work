import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Zap, Palette, Globe, Cpu } from 'lucide-react';

export interface Style {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  preview: string;
}

const styles: Style[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-soaked futuristic aesthetic',
    icon: <Cpu className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-purple-600',
    preview: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'oil-painting',
    name: 'Oil Painting',
    description: 'Classic artistic brushstroke style',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-amber-500 to-red-600',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style',
    icon: <Globe className="w-6 h-6" />,
    gradient: 'from-pink-500 to-blue-500',
    preview: 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft, flowing artistic medium',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-teal-400 to-green-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Retro aesthetic with film grain',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-yellow-600 to-orange-600',
    preview: 'https://images.pexels.com/photos/1139317/pexels-photo-1139317.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'ink-wash',
    name: 'Ink Wash',
    description: 'Traditional Chinese painting style',
    icon: <Globe className="w-6 h-6" />,
    gradient: 'from-gray-700 to-gray-900',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'pop-art',
    name: 'Pop Art',
    description: 'Bold colors and comic book style',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-red-500 to-yellow-500',
    preview: 'https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'impressionist',
    name: 'Impressionist',
    description: 'Monet-inspired brushwork',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-blue-400 to-purple-500',
    preview: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

interface StyleSelectorProps {
  selectedStyle: Style | null;
  onStyleSelect: (style: Style) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStyle = () => {
    setCurrentIndex((prev) => (prev + 1) % styles.length);
  };

  const prevStyle = () => {
    setCurrentIndex((prev) => (prev - 1 + styles.length) % styles.length);
  };

  const getVisibleStyles = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + styles.length) % styles.length;
      visible.push({ ...styles[index], offset: i });
    }
    return visible;
  };

  return (
    <div className="relative py-8">
      <h3 className="text-xl font-semibold text-white mb-6 text-center">Choose Your Style</h3>
      
      <div className="relative h-32 overflow-hidden">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevStyle}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="relative flex items-center justify-center space-x-4">
            {getVisibleStyles().map((style, index) => {
              const isCenter = style.offset === 0;
              const scale = isCenter ? 'scale-110' : 'scale-90';
              const opacity = Math.abs(style.offset) > 1 ? 'opacity-30' : 'opacity-100';
              
              return (
                <div
                  key={`${style.id}-${index}`}
                  className={`relative transition-all duration-300 cursor-pointer ${scale} ${opacity}`}
                  onClick={() => onStyleSelect(style)}
                >
                  <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${style.gradient} p-1`}>
                    <div className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                      <div className="text-white">
                        {style.icon}
                      </div>
                    </div>
                  </div>
                  {isCenter && (
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <p className="text-sm font-medium text-white">{style.name}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <button
            onClick={nextStyle}
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      
      {selectedStyle && (
        <div className="mt-8 text-center">
          <p className="text-white/80">{selectedStyle.description}</p>
        </div>
      )}
    </div>
  );
};