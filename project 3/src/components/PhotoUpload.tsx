import React, { useState, useRef } from 'react';
import { Upload, Camera, Image, Sparkles, Zap } from 'lucide-react';

interface PhotoUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onImageUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setIsProcessing(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setTimeout(() => {
          onImageUpload(e.target?.result as string);
          setIsProcessing(false);
        }, 1000);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  const sampleImages = [
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300'
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Transform Reality
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-4">
            Turn ordinary photos into extraordinary AI masterpieces
          </p>
          <div className="flex items-center justify-center space-x-4 text-white/60">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>2s Generation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>20+ Styles</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image className="w-5 h-5 text-purple-400" />
              <span>8K Quality</span>
            </div>
          </div>
        </div>

        {/* Upload Area */}
        <div className="mb-12">
          <div
            className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ${
              dragActive 
                ? 'border-cyan-400 bg-cyan-400/10 scale-105' 
                : 'border-white/30 hover:border-white/50'
            } ${isProcessing ? 'animate-pulse' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            
            {isProcessing ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <p className="text-white text-lg">Processing your image...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Upload className="w-12 h-12 text-cyan-400" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Drop your photo here
                  </h3>
                  <p className="text-white/60 mb-6">
                    Or click to browse your files
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={openFileSelector}
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Choose File
                  </button>
                  
                  <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full text-white font-semibold hover:bg-white/20 transition-colors">
                    <Camera className="w-5 h-5" />
                    <span>Take Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sample Images */}
        <div>
          <h4 className="text-lg font-medium text-white mb-6">Or try with sample images</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sampleImages.map((image, index) => (
              <button
                key={index}
                onClick={() => onImageUpload(image)}
                className="group relative aspect-square rounded-xl overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <img 
                  src={image} 
                  alt={`Sample ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-white text-sm font-medium">Try this</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-lg font-semibold text-white mb-2">AI Art Styles</h5>
            <p className="text-white/60 text-sm">Transform with Monet, Cyberpunk, Anime, and 17+ premium styles</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-lg font-semibold text-white mb-2">Lightning Fast</h5>
            <p className="text-white/60 text-sm">Generate stunning results in under 2 seconds with our AI</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <h5 className="text-lg font-semibold text-white mb-2">8K Quality</h5>
            <p className="text-white/60 text-sm">Professional-grade output ready for print and social sharing</p>
          </div>
        </div>
      </div>
    </div>
  );
};