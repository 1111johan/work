import React from 'react';
import { Camera, Sparkles, Crown } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Camera className="w-8 h-8 text-cyan-400" />
            <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            AIrtify
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-white/80 hover:text-cyan-400 transition-colors">Gallery</a>
          <a href="#" className="text-white/80 hover:text-cyan-400 transition-colors">Styles</a>
          <a href="#" className="text-white/80 hover:text-cyan-400 transition-colors">Community</a>
        </nav>
        
        <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-full text-white font-medium hover:scale-105 transition-transform">
          <Crown className="w-4 h-4" />
          <span>Pro</span>
        </button>
      </div>
    </header>
  );
};