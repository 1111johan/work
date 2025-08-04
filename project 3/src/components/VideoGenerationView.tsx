import React, { useState } from 'react';
import { Play, Pause, Download, Share2, ArrowLeft, Video, Sparkles } from 'lucide-react';
import { EnhancedStyle } from './EnhancedStyleSelector';

interface VideoGenerationViewProps {
  originalImage: string;
  style: EnhancedStyle;
  onBack: () => void;
}

export const VideoGenerationView: React.FC<VideoGenerationViewProps> = ({
  originalImage,
  style,
  onBack
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    // 模拟视频生成
    setTimeout(() => {
      setGeneratedVideoUrl('https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800');
    }, 3000);
  };

  const handleDownload = () => {
    if (generatedVideoUrl) {
      const link = document.createElement('a');
      link.href = generatedVideoUrl;
      link.download = `airtify-video-${Date.now()}.mp4`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-cyan-900 relative overflow-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <h1 className="text-3xl font-bold text-white">
              AI Video Generation
            </h1>
            
            <div className="w-20"></div>
          </div>

          <div className="text-center space-y-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                Create AI Video Magic ✨
              </h2>
              <p className="text-white/70 text-lg">Transform your photo into a dynamic video</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Original Photo</h3>
                <div className="relative rounded-2xl overflow-hidden border-4 border-cyan-400/50">
                  <img src={originalImage} alt="Original" className="w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium">Source: {style.name} Style</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Video Preview</h3>
                <div className="relative rounded-2xl overflow-hidden border-4 border-purple-400/50 bg-black">
                  {generatedVideoUrl ? (
                    <div className="aspect-video relative">
                      <img 
                        src={generatedVideoUrl} 
                        alt="Generated Video" 
                        className="w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group-hover:scale-110"
                        >
                          {isPlaying ? (
                            <Pause className="w-10 h-10 text-white" />
                          ) : (
                            <Play className="w-10 h-10 text-white ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <Video className="w-16 h-16 text-white/50 mx-auto mb-4" />
                        <p className="text-white/50">Video will appear here after generation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {!generatedVideoUrl ? (
                <button
                  onClick={handleGenerate}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 rounded-2xl text-white font-bold text-xl hover:scale-105 transition-all duration-300 shadow-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <Video className="w-6 h-6" />
                    <span>Generate Video</span>
                    <Sparkles className="w-6 h-6" />
                  </div>
                </button>
              ) : (
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold hover:scale-105 transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download Video</span>
                    </div>
                  </button>
                  
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:scale-105 transition-all">
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 